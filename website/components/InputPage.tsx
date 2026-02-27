'use client'

import { useState } from 'react'
import {
  Search, User, Mail, Eye, EyeOff, X, AlertCircle,
  Lock, Phone, DollarSign, Check, Copy, AtSign,
} from 'lucide-react'
import { TokenTable } from './TokenTable'

// ─────────────────────────────────────────────
// Shared helpers
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
          <div className={`bg-white min-h-[100px] p-8 ${center ? 'flex flex-wrap items-center justify-center gap-6' : 'flex flex-col gap-5 items-start'}`}>
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
// Input primitive — mirrors Figma component tokens
// ─────────────────────────────────────────────
type InputSize = 'sm' | 'md'
type InputState = 'default' | 'error' | 'disabled'

function Field({
  label, helperText, errorMessage, leadingIcon: LeadingIcon, trailingIcon,
  size = 'md', disabled = false, placeholder, type = 'text', defaultValue = '',
  fullWidth = false,
}: {
  label?: string
  helperText?: string
  errorMessage?: string
  leadingIcon?: React.ElementType
  trailingIcon?: 'clear' | 'eye' | 'none' | React.ElementType
  size?: InputSize
  disabled?: boolean
  placeholder?: string
  type?: string
  defaultValue?: string
  fullWidth?: boolean
}) {
  const [value, setValue] = useState(defaultValue)
  const [showPw, setShowPw] = useState(false)

  const isError = !!errorMessage
  const inputType = type === 'password' ? (showPw ? 'text' : 'password') : type

  // Size tokens: sm=h-8 px-3, md=h-10 px-3.5
  const sizeH = size === 'sm' ? 'h-8 text-sm' : 'h-10 text-sm'
  const padL  = LeadingIcon ? (size === 'sm' ? 'pl-8' : 'pl-10') : (size === 'sm' ? 'pl-3' : 'pl-3.5')
  const padR  = trailingIcon && trailingIcon !== 'none'
    ? (size === 'sm' ? 'pr-8' : 'pr-10')
    : (size === 'sm' ? 'pr-3' : 'pr-3.5')

  const iconSz = size === 'sm' ? 'w-4 h-4' : 'w-4 h-4'
  const iconOffset = size === 'sm' ? 'left-2.5' : 'left-3'
  const trailOffset = size === 'sm' ? 'right-2.5' : 'right-3'

  // border/state tokens
  const borderCls = disabled
    ? 'border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed'
    : isError
    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
    : 'border-zinc-300 hover:border-zinc-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-300'

  const TrailingEl = () => {
    if (!trailingIcon || trailingIcon === 'none') return null
    if (trailingIcon === 'eye') {
      return (
        <button
          type="button"
          onClick={() => setShowPw(s => !s)}
          tabIndex={-1}
          className={`absolute ${trailOffset} top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600`}
        >
          {showPw ? <EyeOff className={iconSz} /> : <Eye className={iconSz} />}
        </button>
      )
    }
    if (trailingIcon === 'clear') {
      return value ? (
        <button
          type="button"
          onClick={() => setValue('')}
          tabIndex={-1}
          className={`absolute ${trailOffset} top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600`}
        >
          <X className={iconSz} />
        </button>
      ) : null
    }
    const Icon = trailingIcon as React.ElementType
    return <Icon className={`absolute ${trailOffset} top-1/2 -translate-y-1/2 ${iconSz} text-zinc-400 pointer-events-none`} />
  }

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : 'w-72'}`}>
      {label && (
        <label className="text-sm font-medium text-zinc-700">{label}</label>
      )}
      <div className="relative">
        {LeadingIcon && (
          <LeadingIcon className={`absolute ${iconOffset} top-1/2 -translate-y-1/2 ${iconSz} text-zinc-400 pointer-events-none`} />
        )}
        <input
          type={inputType}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={[
            'w-full rounded outline-none transition-all duration-150',
            'bg-white text-zinc-900 placeholder:text-zinc-400',
            'ring-offset-white',
            sizeH, padL, padR, borderCls,
            'border',
          ].join(' ')}
        />
        <TrailingEl />
        {isError && !trailingIcon && (
          <AlertCircle className={`absolute ${trailOffset} top-1/2 -translate-y-1/2 ${iconSz} text-red-500 pointer-events-none`} />
        )}
      </div>
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
// Main page
// ─────────────────────────────────────────────
export function InputPage() {
  return (
    <div>

      <Section
        id="examples"
        title="Examples"
        lead="Interactive previews with copy-ready code. All inputs include keyboard focus rings, hover borders, and accessible error states."
      />

      {/* Default */}
      <Example
        title="Default input"
        description="A plain text field with a label and placeholder."
        code={`<Input label="Full name" placeholder="Jane Smith" />`}
      >
        <Field label="Full name" placeholder="Jane Smith" />
      </Example>

      {/* Sizes */}
      <Example
        title="Sizes"
        description="sm (32px) suits compact UIs like table filters; md (40px) is the default for standard forms."
        code={`<Input label="Small" size="sm" placeholder="Search…" />
<Input label="Medium" size="md" placeholder="Search…" />`}
        center
      >
        <Field label="Small"  size="sm" placeholder="Search…" />
        <Field label="Medium" size="md" placeholder="Search…" />
      </Example>

      {/* Leading icon */}
      <Example
        title="With leading icon"
        description="Leading icons provide visual context for the expected input type."
        code={`<Input label="Search" leadingIcon={Search} placeholder="Search products…" />
<Input label="Email" leadingIcon={Mail} placeholder="you@example.com" type="email" />
<Input label="Username" leadingIcon={AtSign} placeholder="username" />`}
      >
        <Field label="Search"   leadingIcon={Search} placeholder="Search products…" />
        <Field label="Email"    leadingIcon={Mail}   placeholder="you@example.com" type="email" />
        <Field label="Username" leadingIcon={AtSign} placeholder="username" />
      </Example>

      {/* Trailing icon — password */}
      <Example
        title="Password with visibility toggle"
        description="The eye icon toggles between masked and visible text. It is the most common trailing-icon pattern."
        code={`<Input
  label="Password"
  type="password"
  trailingIcon="eye"
  placeholder="Enter password"
  helperText="Minimum 8 characters"
/>`}
      >
        <Field
          label="Password"
          type="password"
          trailingIcon="eye"
          placeholder="Enter password"
          helperText="Minimum 8 characters"
        />
      </Example>

      {/* Trailing icon — clear */}
      <Example
        title="Clearable input"
        description="The × button appears when the field has a value and clears it on click."
        code={`<Input
  label="Search"
  leadingIcon={Search}
  trailingIcon="clear"
  placeholder="Search…"
  defaultValue="engine block"
/>`}
      >
        <Field
          label="Search"
          leadingIcon={Search}
          trailingIcon="clear"
          placeholder="Search…"
          defaultValue="engine block"
        />
      </Example>

      {/* Helper text */}
      <Example
        title="With helper text"
        description="Persistent guidance below the field — don't replace it with the error message."
        code={`<Input
  label="Email address"
  leadingIcon={Mail}
  type="email"
  placeholder="you@example.com"
  helperText="We'll send a confirmation link to this address."
/>`}
      >
        <Field
          label="Email address"
          leadingIcon={Mail}
          type="email"
          placeholder="you@example.com"
          helperText="We'll send a confirmation link to this address."
        />
      </Example>

      {/* Error */}
      <Example
        title="Error state"
        description="The border turns red, a caution icon appears, and an error message is shown below. Never rely on colour alone."
        code={`<Input
  label="Email address"
  leadingIcon={Mail}
  type="email"
  defaultValue="notanemail"
  errorMessage="Enter a valid email address."
/>`}
      >
        <Field
          label="Email address"
          leadingIcon={Mail}
          type="email"
          defaultValue="notanemail"
          errorMessage="Enter a valid email address."
        />
      </Example>

      {/* Disabled */}
      <Example
        title="Disabled state"
        description="Muted background and border signal the field is unavailable. Pair with a tooltip explaining why."
        code={`<Input
  label="Account email"
  defaultValue="jane@company.com"
  disabled
  helperText="Contact your admin to change this."
/>`}
      >
        <Field
          label="Account email"
          defaultValue="jane@company.com"
          disabled
          helperText="Contact your admin to change this."
        />
      </Example>

      {/* Full width form */}
      <Example
        title="Form example"
        description="Full-width inputs inside a form container — the most common real-world usage."
        code={`<form className="flex flex-col gap-4 w-full max-w-sm">
  <Input label="First name" placeholder="Jane" fullWidth />
  <Input label="Last name"  placeholder="Smith" fullWidth />
  <Input label="Email" leadingIcon={Mail}
    type="email" placeholder="you@example.com" fullWidth />
  <Input label="Password" type="password"
    trailingIcon="eye" placeholder="Min. 8 characters"
    helperText="Must include a number and a symbol." fullWidth />
  <Button variant="primary" fullWidth>Create account</Button>
</form>`}
      >
        <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={e => e.preventDefault()}>
          <Field label="First name" placeholder="Jane"              fullWidth />
          <Field label="Last name"  placeholder="Smith"             fullWidth />
          <Field label="Email" leadingIcon={Mail} type="email"
            placeholder="you@example.com"                           fullWidth />
          <Field label="Password" type="password" trailingIcon="eye"
            placeholder="Min. 8 characters"
            helperText="Must include a number and a symbol."        fullWidth />
          <button className="h-10 w-full rounded bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 transition-colors">
            Create account
          </button>
        </form>
      </Example>

      {/* ── States reference ────────────────────────── */}
      <Section id="states" title="States" />
      <div className="mb-10 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="bg-white p-8 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6">
          {[
            { label: 'Default',  cls: 'border-zinc-300 bg-white' },
            { label: 'Hover',    cls: 'border-zinc-400 bg-white' },
            { label: 'Focus',    cls: 'border-brand-600 ring-2 ring-brand-300 bg-white' },
            { label: 'Error',    cls: 'border-red-500 ring-2 ring-red-200 bg-white' },
            { label: 'Disabled', cls: 'border-zinc-200 bg-zinc-100 cursor-not-allowed' },
            { label: 'Filled',   cls: 'border-zinc-300 bg-white' },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500">{s.label}</label>
              <input
                readOnly
                className={`h-10 w-full rounded border px-3.5 text-sm outline-none ${s.cls} ${s.label === 'Disabled' ? 'text-zinc-400' : 'text-zinc-900'}`}
                placeholder={s.label !== 'Filled' ? 'Placeholder text' : undefined}
                value={s.label === 'Filled' ? 'Value text' : ''}
              />
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                readOnly
                className="w-full h-10 rounded border border-zinc-300 pl-10 pr-10 text-sm text-zinc-400 outline-none"
                placeholder="② Placeholder · ③ Value"
              />
              <X className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>
            <p className="text-xs text-zinc-500 mt-1.5">⑤ Helper text</p>
            {/* Callout annotations */}
            <span className="absolute -top-6 left-0 text-[10px] text-zinc-500 font-medium">① Label</span>
            <span className="absolute top-8 -left-24 text-[10px] text-zinc-500 font-medium whitespace-nowrap">② Leading icon</span>
            <span className="absolute top-8 -right-24 text-[10px] text-zinc-500 font-medium whitespace-nowrap">④ Trailing icon</span>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs text-zinc-400">
          {[
            ['① Label', 'Visible label — required for accessibility'],
            ['② Container', 'Rounded border + background'],
            ['③ Placeholder / Value', 'Hint text or entered value'],
            ['④ Icon slots', '16×16 px — leading or trailing'],
            ['⑤ Helper / Error', 'Persistent hint or error message'],
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
        { name: 'input/background/default',  value: '#ffffff', description: 'Default + focus background' },
        { name: 'input/background/disabled', value: '#e1e1e1', description: 'Disabled / readonly background' },
        { name: 'input/border/Default',      value: '#cccccc', description: 'Default border' },
        { name: 'input/border/hover',        value: '#a3a3a3', description: 'Hover border' },
        { name: 'input/border/focus',        value: '#318272', description: 'Focus border (brand)' },
        { name: 'input/border/error',        value: '#bc1700', description: 'Error border' },
        { name: 'input/border/disabled',     value: '#e1e1e1', description: 'Disabled border' },
        { name: 'input/text/value',          value: '#3b3b3d', description: 'Entered value colour' },
        { name: 'input/text/placeholder',    value: '#8f8f8f', description: 'Placeholder colour' },
        { name: 'input/text/disabled',       value: '#8f8f8f', description: 'Disabled text colour' },
        { name: 'focus/Ring',                value: '#acffef', description: 'Focus ring shadow colour' },
        { name: 'Radius/sm',                 value: '4px',     description: 'Corner radius' },
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
            <PropRow name="label"        type="string"                         defaultVal={undefined}  description="Visible label above the input — strongly recommended for accessibility." />
            <PropRow name="placeholder"  type="string"                         defaultVal={undefined}  description="Hint shown when the field is empty." />
            <PropRow name="type"         type="string"                         defaultVal='"text"'     description="HTML input type — text, email, password, number, search, etc." />
            <PropRow name="size"         type='"sm" | "md"'                    defaultVal='"md"'       description="sm=32px · md=40px height." />
            <PropRow name="disabled"     type="boolean"                        defaultVal="false"      description="Muted state — blocks interaction." />
            <PropRow name="errorMessage" type="string"                         defaultVal={undefined}  description="Activates error state and displays this message below the field." />
            <PropRow name="helperText"   type="string"                         defaultVal={undefined}  description="Persistent helper text shown below — hidden when errorMessage is set." />
            <PropRow name="leadingIcon"  type="React.ElementType"              defaultVal={undefined}  description="Icon component rendered on the left inside the field." />
            <PropRow name="trailingIcon" type='"eye" | "clear" | ElementType'  defaultVal={undefined}  description='"eye" = password toggle · "clear" = dismissible · component = static icon.' />
            <PropRow name="fullWidth"    type="boolean"                        defaultVal="false"      description="Stretches to fill parent container." />
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
              'Always pair inputs with a visible label',
              'Use helper text for format hints (e.g. MM/DD/YYYY)',
              'Show error messages that explain how to fix the issue',
              'Use the appropriate input type (email, tel, number)',
              'Mark required fields consistently (e.g. asterisk + legend)',
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
              'Use placeholder text as a substitute for a label',
              'Show error state before the user has interacted',
              'Use generic messages like "Invalid input"',
              'Disable inputs without explaining why',
              'Rely on colour alone to communicate errors',
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
