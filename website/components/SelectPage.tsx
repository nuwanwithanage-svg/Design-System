'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, AlertCircle, Check, Copy, Globe, Tag, Layers, MapPin } from 'lucide-react'
import { TokenTable } from './TokenTable'

// ─────────────────────────────────────────────
// Shared helpers (same pattern as ButtonPage / InputPage)
// ─────────────────────────────────────────────

function Section({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div id={id} className="mb-6 mt-12 scroll-mt-20">
      <h2 className="text-xl font-semibold text-zinc-100 pb-2 border-b border-zinc-800">{title}</h2>
      {lead && <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{lead}</p>}
    </div>
  )
}

function Example({
  title, description, children, code, center = false,
}: {
  title: string; description?: string; children: React.ReactNode; code: string; center?: boolean
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-10">
      <h3 className="text-base font-semibold text-zinc-100 mb-1">{title}</h3>
      {description && <p className="text-sm text-zinc-400 mb-3 leading-relaxed">{description}</p>}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3">
          <div className="flex">
            {(['preview', 'code'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={[
                  'flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors capitalize',
                  tab === t ? 'border-brand-400 text-brand-400' : 'border-transparent text-zinc-500 hover:text-zinc-300',
                ].join(' ')}
              >{t}</button>
            ))}
          </div>
          {tab === 'code' && (
            <button onClick={copy} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              {copied ? <Check size={12} className="text-brand-400" /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
        {tab === 'preview' ? (
          <div className={`bg-white min-h-[120px] p-8 ${center ? 'flex flex-wrap items-start justify-center gap-6' : 'flex flex-col gap-5 items-start'}`}>
            {children}
          </div>
        ) : (
          <pre className="bg-zinc-950 p-5 text-xs overflow-x-auto leading-relaxed">
            <code className="text-zinc-300 font-mono">{code.trim()}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

function PropRow({ name, type, defaultVal, description }: {
  name: string; type: string; defaultVal?: string; description: string
}) {
  return (
    <tr className="hover:bg-zinc-900/50 transition-colors">
      <td className="px-4 py-3"><code className="text-brand-300 font-mono text-xs">{name}</code></td>
      <td className="px-4 py-3"><code className="text-zinc-400 font-mono text-xs">{type}</code></td>
      <td className="px-4 py-3">{defaultVal ? <code className="text-zinc-500 font-mono text-xs">{defaultVal}</code> : <span className="text-zinc-600 text-xs">—</span>}</td>
      <td className="px-4 py-3 text-zinc-400 text-xs">{description}</td>
    </tr>
  )
}

// ─────────────────────────────────────────────
// Select primitive — mirrors Figma component tokens
// ─────────────────────────────────────────────
type SelectSize = 'sm' | 'md'

interface SelectOption { value: string; label: string }

function SelectField({
  label, options, placeholder = 'Select an option', leadingIcon: LeadingIcon,
  size = 'md', disabled = false, errorMessage, helperText, fullWidth = false,
  defaultValue = '',
}: {
  label?: string
  options: SelectOption[]
  placeholder?: string
  leadingIcon?: React.ElementType
  size?: SelectSize
  disabled?: boolean
  errorMessage?: string
  helperText?: string
  fullWidth?: boolean
  defaultValue?: string
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(defaultValue)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isError = !!errorMessage
  const selectedLabel = options.find(o => o.value === selected)?.label

  // Size tokens: sm=h-8 px-3, md=h-10 px-3.5
  const sizeH = size === 'sm' ? 'h-8 text-sm' : 'h-10 text-sm'
  const padL  = LeadingIcon ? (size === 'sm' ? 'pl-8' : 'pl-10') : (size === 'sm' ? 'pl-3' : 'pl-3.5')
  const iconOffset = size === 'sm' ? 'left-2.5' : 'left-3'

  // Border/state tokens
  const borderCls = disabled
    ? 'border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed'
    : isError
    ? 'border-red-500'
    : open
    ? 'border-brand-600 ring-2 ring-brand-300'
    : 'border-zinc-300 hover:border-zinc-400'

  return (
    <div className={`flex flex-col gap-1.5 relative ${fullWidth ? 'w-full' : 'w-72'}`} ref={ref}>
      {label && <label className="text-sm font-medium text-zinc-700">{label}</label>}

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        className={[
          'relative flex items-center justify-between w-full rounded border bg-white',
          'outline-none transition-all duration-150 ring-offset-white',
          sizeH, padL, 'pr-3',
          borderCls,
          isError && !disabled ? 'ring-2 ring-red-200' : '',
        ].join(' ')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 min-w-0">
          {LeadingIcon && (
            <LeadingIcon className={`absolute ${iconOffset} top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none`} />
          )}
          <span className={`truncate ${selectedLabel ? 'text-zinc-900' : 'text-zinc-400'}`}>
            {selectedLabel ?? placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden py-1"
        >
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={selected === opt.value}
              onClick={() => { setSelected(opt.value); setOpen(false) }}
              className={[
                'flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors',
                selected === opt.value
                  ? 'bg-brand-50 text-brand-700 font-medium'
                  : 'text-zinc-700 hover:bg-zinc-50',
              ].join(' ')}
            >
              {opt.label}
              {selected === opt.value && <Check size={14} className="text-brand-600" />}
            </li>
          ))}
        </ul>
      )}

      {errorMessage && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle size={11} /> {errorMessage}
        </p>
      )}
      {helperText && !errorMessage && (
        <p className="text-xs text-zinc-500">{helperText}</p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Sample option sets
// ─────────────────────────────────────────────
const REGIONS = [
  { value: 'au', label: 'Australia' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'sg', label: 'Singapore' },
  { value: 'nz', label: 'New Zealand' },
]

const CATEGORIES = [
  { value: 'engines',   label: 'Engine Components' },
  { value: 'electrical', label: 'Electrical Systems' },
  { value: 'thermal',   label: 'Thermal Management' },
  { value: 'sensors',   label: 'Sensors & Gauges' },
  { value: 'hydraulic', label: 'Pumps & Hydraulics' },
]

const SIZES_OPTS = [
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
]

const PRIORITIES = [
  { value: 'low',    label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high',   label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export function SelectPage() {
  return (
    <div>

      <Section
        id="examples"
        title="Examples"
        lead="Interactive dropdowns with keyboard navigation, option highlighting, and accessible error states."
      />

      {/* Default */}
      <Example
        title="Default select"
        description="A labelled dropdown with a list of options. Clicking an option closes the menu and updates the trigger label."
        code={`<Select
  label="Region"
  placeholder="Select a region"
  options={[
    { value: 'au', label: 'Australia' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>`}
      >
        <SelectField label="Region" options={REGIONS} placeholder="Select a region" />
      </Example>

      {/* Sizes */}
      <Example
        title="Sizes"
        description="sm (32px) for compact contexts like filter bars; md (40px) for standard forms."
        code={`<Select label="Small"  size="sm" options={CATEGORIES} />
<Select label="Medium" size="md" options={CATEGORIES} />`}
        center
      >
        <SelectField label="Small"  size="sm" options={CATEGORIES} placeholder="Select category" />
        <SelectField label="Medium" size="md" options={CATEGORIES} placeholder="Select category" />
      </Example>

      {/* Leading icon */}
      <Example
        title="With leading icon"
        description="Icons provide visual context about the type of selection being made."
        code={`<Select label="Region"   leadingIcon={Globe} options={REGIONS} />
<Select label="Category" leadingIcon={Tag}   options={CATEGORIES} />
<Select label="Priority" leadingIcon={Layers} options={PRIORITIES} />`}
      >
        <SelectField label="Region"   leadingIcon={Globe}  options={REGIONS}     placeholder="Select region" />
        <SelectField label="Category" leadingIcon={Tag}    options={CATEGORIES}  placeholder="Select category" />
        <SelectField label="Priority" leadingIcon={Layers} options={PRIORITIES}  placeholder="Select priority" />
      </Example>

      {/* With helper text */}
      <Example
        title="With helper text"
        description="Persistent guidance for when the user needs context before selecting."
        code={`<Select
  label="Shipping region"
  leadingIcon={MapPin}
  options={REGIONS}
  placeholder="Choose your region"
  helperText="Shipping rates and availability vary by region."
/>`}
      >
        <SelectField
          label="Shipping region"
          leadingIcon={MapPin}
          options={REGIONS}
          placeholder="Choose your region"
          helperText="Shipping rates and availability vary by region."
        />
      </Example>

      {/* Pre-selected */}
      <Example
        title="With a default value"
        description="Pass a defaultValue matching one of the option values to pre-select an option."
        code={`<Select
  label="Category"
  options={CATEGORIES}
  defaultValue="thermal"
/>`}
      >
        <SelectField label="Category" options={CATEGORIES} defaultValue="thermal" />
      </Example>

      {/* Error */}
      <Example
        title="Error state"
        description="Red border, red focus ring, and an inline message. Trigger after validation, not on first render."
        code={`<Select
  label="Region"
  options={REGIONS}
  placeholder="Select a region"
  errorMessage="Please select a shipping region to continue."
/>`}
      >
        <SelectField
          label="Region"
          options={REGIONS}
          placeholder="Select a region"
          errorMessage="Please select a shipping region to continue."
        />
      </Example>

      {/* Disabled */}
      <Example
        title="Disabled state"
        description="Muted background and greyed text — use when the field is unavailable in the current context."
        code={`<Select
  label="Account currency"
  options={[{ value: 'aud', label: 'Australian Dollar (AUD)' }]}
  defaultValue="aud"
  disabled
  helperText="Currency is set at the organisation level."
/>`}
      >
        <SelectField
          label="Account currency"
          options={[{ value: 'aud', label: 'Australian Dollar (AUD)' }]}
          defaultValue="aud"
          disabled
          helperText="Currency is set at the organisation level."
        />
      </Example>

      {/* Form example */}
      <Example
        title="Form example"
        description="Selects alongside inputs — full-width in a typical form layout."
        code={`<form className="flex flex-col gap-4 w-full max-w-sm">
  <Input  label="Product name" placeholder="e.g. Engine Mount" fullWidth />
  <Select label="Category" leadingIcon={Tag}
    options={CATEGORIES} fullWidth />
  <Select label="Size" options={SIZES_OPTS}
    defaultValue="md" fullWidth />
  <Button variant="primary" fullWidth>Add product</Button>
</form>`}
      >
        <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={e => e.preventDefault()}>
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-zinc-700">Product name</label>
            <input
              className="h-10 w-full rounded border border-zinc-300 px-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-300 transition-all"
              placeholder="e.g. Engine Mount"
            />
          </div>
          <SelectField label="Category" leadingIcon={Tag}   options={CATEGORIES} placeholder="Select category" fullWidth />
          <SelectField label="Size"                         options={SIZES_OPTS}  defaultValue="md" fullWidth />
          <button className="h-10 w-full rounded bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 transition-colors">
            Add product
          </button>
        </form>
      </Example>

      {/* ── States reference ────────────────────────── */}
      <Section id="states" title="States" />
      <div className="mb-10 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="bg-white p-8 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6">
          {[
            { label: 'Default',  border: 'border-zinc-300',  bg: 'bg-white',    text: 'text-zinc-400', ring: '' },
            { label: 'Hover',    border: 'border-zinc-400',  bg: 'bg-white',    text: 'text-zinc-400', ring: '' },
            { label: 'Focus',    border: 'border-brand-600', bg: 'bg-white',    text: 'text-zinc-900', ring: 'ring-2 ring-brand-300' },
            { label: 'Filled',   border: 'border-zinc-300',  bg: 'bg-white',    text: 'text-zinc-900', ring: '' },
            { label: 'Error',    border: 'border-red-500',   bg: 'bg-white',    text: 'text-zinc-400', ring: 'ring-2 ring-red-200' },
            { label: 'Disabled', border: 'border-zinc-200',  bg: 'bg-zinc-100', text: 'text-zinc-400', ring: '' },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500">{s.label}</label>
              <div className={`h-10 w-full rounded border flex items-center justify-between px-3.5 ${s.border} ${s.bg} ${s.ring} ${s.label === 'Disabled' ? 'cursor-not-allowed' : ''}`}>
                <span className={`text-sm ${s.text}`}>
                  {s.label === 'Filled' ? 'Australia' : 'Select an option'}
                </span>
                <ChevronDown size={14} className="text-zinc-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Anatomy ─────────────────────────────────── */}
      <Section id="anatomy" title="Anatomy" />
      <div className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
        <div className="bg-white p-10 flex justify-center">
          <div className="relative w-72">
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">① Label</label>
            {/* Trigger */}
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <div className="h-10 w-full rounded border border-zinc-300 flex items-center justify-between pl-10 pr-3">
                <span className="text-sm text-zinc-400">③ Placeholder</span>
                <ChevronDown size={14} className="text-zinc-400" />
              </div>
            </div>
            {/* Dropdown */}
            <div className="mt-1 border border-zinc-200 rounded-lg shadow-lg overflow-hidden">
              {['Option A', 'Option B'].map((o, i) => (
                <div key={o} className={`flex items-center justify-between px-3 py-2 text-sm ${i === 0 ? 'bg-brand-50 text-brand-700 font-medium' : 'text-zinc-700'}`}>
                  {o}{i === 0 && <Check size={14} className="text-brand-600" />}
                </div>
              ))}
            </div>
            <span className="absolute -top-6 left-0 text-[10px] text-zinc-500 font-medium">① Label</span>
            <span className="absolute top-8 -left-20 text-[10px] text-zinc-500 font-medium whitespace-nowrap">② Leading icon</span>
            <span className="absolute top-8 -right-16 text-[10px] text-zinc-500 font-medium whitespace-nowrap">④ Chevron</span>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-zinc-400">
          {[
            ['① Label', 'Visible label — required for accessibility'],
            ['② Leading icon', 'Optional 16×16px contextual icon'],
            ['③ Trigger', 'Shows selected value or placeholder'],
            ['④ Chevron', 'Rotates 180° when open'],
          ].map(([l, d]) => (
            <div key={l}>
              <p className="font-semibold text-zinc-200 mb-0.5">{l}</p>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tokens ──────────────────────────────────── */}
      <Section id="tokens" title="Design tokens" />
      <TokenTable tokens={[
        { name: 'input/background/default',  value: '#ffffff', description: 'Trigger background' },
        { name: 'input/background/disabled', value: '#e1e1e1', description: 'Disabled background' },
        { name: 'input/border/Default',      value: '#cccccc', description: 'Default border' },
        { name: 'input/border/hover',        value: '#a3a3a3', description: 'Hover border' },
        { name: 'input/border/focus',        value: '#318272', description: 'Open/focus border' },
        { name: 'input/border/error',        value: '#bc1700', description: 'Error border' },
        { name: 'input/border/disabled',     value: '#e1e1e1', description: 'Disabled border' },
        { name: 'input/text/placeholder',    value: '#8f8f8f', description: 'Placeholder colour' },
        { name: 'input/text/value',          value: '#3b3b3d', description: 'Selected value colour' },
        { name: 'focus/Ring',                value: '#acffef', description: 'Focus ring shadow colour' },
        { name: 'background/brand/subtle',   value: '#f3fffc', description: 'Selected option highlight' },
        { name: 'Radius/sm',                 value: '4px',     description: 'Trigger corner radius' },
        { name: 'Radius/md',                 value: '8px',     description: 'Dropdown corner radius' },
      ]} />

      {/* ── Props ───────────────────────────────────── */}
      <Section id="props" title="Props" />
      <div className="mb-10 rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-900 border-b border-zinc-800">
              <th className="text-left px-4 py-3 font-medium text-zinc-400 w-1/5">Prop</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-400 w-1/4">Type</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-400 w-1/6">Default</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-400">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <PropRow name="options"       type="{ value: string; label: string }[]" defaultVal={undefined}       description="Array of selectable options." />
            <PropRow name="label"         type="string"                              defaultVal={undefined}       description="Visible label above the trigger." />
            <PropRow name="placeholder"   type="string"                              defaultVal='"Select…"'       description="Text shown when no option is selected." />
            <PropRow name="defaultValue"  type="string"                              defaultVal={undefined}       description="Pre-selected option value on first render." />
            <PropRow name="size"          type='"sm" | "md"'                         defaultVal='"md"'            description="sm=32px · md=40px trigger height." />
            <PropRow name="disabled"      type="boolean"                             defaultVal="false"           description="Prevents opening the dropdown." />
            <PropRow name="leadingIcon"   type="React.ElementType"                   defaultVal={undefined}       description="Icon inside the trigger, before the label." />
            <PropRow name="errorMessage"  type="string"                              defaultVal={undefined}       description="Activates error state and shows this message." />
            <PropRow name="helperText"    type="string"                              defaultVal={undefined}       description="Persistent helper text — hidden when errorMessage is set." />
            <PropRow name="fullWidth"     type="boolean"                             defaultVal="false"           description="Stretches to fill parent container." />
            <PropRow name="onChange"      type="(value: string) => void"             defaultVal={undefined}       description="Callback when the selected value changes." />
          </tbody>
        </table>
      </div>

      {/* ── Guidelines ──────────────────────────────── */}
      <Section id="guidelines" title="Content guidelines" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-xl border border-green-900 bg-green-950/30 p-5">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">Do</p>
          <ul className="space-y-2 text-sm text-zinc-300">
            {[
              'Use a meaningful placeholder like "Select a category"',
              'Sort options logically (alphabetical, most-used first)',
              'Pre-select a sensible default when one exists',
              'Use for 4+ options — use radio buttons for 2–3',
              'Keep option labels short and scannable',
            ].map(t => (
              <li key={t} className="flex gap-2">
                <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-red-900 bg-red-950/30 p-5">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">Don't</p>
          <ul className="space-y-2 text-sm text-zinc-300">
            {[
              'Use "Choose one…" as a placeholder for required fields',
              'Use a select for fewer than 4 options',
              'Nest options more than one level deep',
              'Disable the select without explaining why',
              'Use for actions — use a menu or button instead',
            ].map(t => (
              <li key={t} className="flex gap-2">
                <span className="text-red-500 mt-0.5 flex-shrink-0 font-bold text-xs">✕</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}
