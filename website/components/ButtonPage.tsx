'use client'

import { useState } from 'react'
import {
  Plus, Trash2, ChevronRight, Download, ArrowRight,
  Settings, Check, Loader2, Copy,
} from 'lucide-react'
import { TokenTable } from './TokenTable'

// ─────────────────────────────────────────────
// Local Button primitive — mirrors Figma component
// token mapping commented inline
// ─────────────────────────────────────────────
type BtnVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
type BtnSize = 'sm' | 'md' | 'lg'

function Btn({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  children,
}: {
  variant?: BtnVariant
  size?: BtnSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  leadingIcon?: React.ElementType
  trailingIcon?: React.ElementType
  children?: React.ReactNode
}) {
  const base = [
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-white',
    'select-none',
    disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    fullWidth ? 'w-full' : '',
  ].join(' ')

  // size tokens: sm=h-8 md=h-10 lg=h-12
  const sizes: Record<BtnSize, string> = {
    sm: 'h-8  px-3  text-sm  [&_svg]:size-4',
    md: 'h-10 px-4  text-sm  [&_svg]:size-4',
    lg: 'h-12 px-5  text-base [&_svg]:size-5',
  }

  // colour tokens per variant
  const variants: Record<BtnVariant, string> = {
    primary:     'bg-brand-700 text-white shadow-sm hover:bg-brand-800 active:bg-brand-900',
    secondary:   'bg-white text-zinc-800 border border-zinc-300 shadow-sm hover:bg-zinc-50 active:bg-zinc-100',
    tertiary:    'text-brand-700 hover:bg-brand-50 active:bg-brand-100',
    destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800',
  }

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]}`} disabled={disabled || loading}>
      {loading ? <Loader2 className="animate-spin" /> : LeadingIcon && <LeadingIcon />}
      {children}
      {!loading && TrailingIcon && <TrailingIcon />}
    </button>
  )
}

// ─────────────────────────────────────────────
// Example block — title + description + preview/code tabs
// ─────────────────────────────────────────────
function Example({
  title,
  description,
  children,
  code,
  previewBg = 'bg-white',
  center = true,
}: {
  title: string
  description?: string
  children: React.ReactNode
  code: string
  previewBg?: string
  center?: boolean
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
        {/* Tab bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3">
          <div className="flex">
            {(['preview', 'code'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={[
                  'flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors capitalize',
                  tab === t
                    ? 'border-brand-400 text-brand-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300',
                ].join(' ')}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === 'code' && (
            <button
              onClick={copy}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {copied ? <Check size={12} className="text-brand-400" /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>

        {/* Content */}
        {tab === 'preview' ? (
          <div
            className={`${previewBg} min-h-[120px] p-10 ${center ? 'flex flex-wrap items-center justify-center gap-3' : ''}`}
          >
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

// ─────────────────────────────────────────────
// Section heading + optional lead text
// ─────────────────────────────────────────────
function Section({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div id={id} className="mb-6 mt-12 scroll-mt-20">
      <h2 className="text-xl font-semibold text-zinc-100 pb-2 border-b border-zinc-800">{title}</h2>
      {lead && <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{lead}</p>}
    </div>
  )
}

// ─────────────────────────────────────────────
// Prop row for the props table
// ─────────────────────────────────────────────
function PropRow({ name, type, defaultVal, description }: {
  name: string; type: string; defaultVal?: string; description: string
}) {
  return (
    <tr className="hover:bg-zinc-900/50 transition-colors">
      <td className="px-4 py-3">
        <code className="text-brand-300 font-mono text-xs">{name}</code>
      </td>
      <td className="px-4 py-3">
        <code className="text-zinc-400 font-mono text-xs">{type}</code>
      </td>
      <td className="px-4 py-3">
        {defaultVal ? <code className="text-zinc-500 font-mono text-xs">{defaultVal}</code> : <span className="text-zinc-600 text-xs">—</span>}
      </td>
      <td className="px-4 py-3 text-zinc-400 text-xs">{description}</td>
    </tr>
  )
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export function ButtonPage() {
  return (
    <div>

      {/* ── Examples ───────────────────────────────────── */}
      <Section
        id="examples"
        title="Examples"
        lead="Interactive previews with copy-ready code snippets. All buttons include keyboard focus rings, hover, active, and disabled states."
      />

      {/* Default */}
      <Example
        title="Default button"
        description="The primary button is used for the single most important action on a screen."
        code={`<Button variant="primary">Save changes</Button>`}
      >
        <Btn variant="primary">Save changes</Btn>
      </Example>

      {/* Types */}
      <Example
        title="Button types"
        description="Four semantic variants covering every hierarchy level — from the main CTA to a ghost-style tertiary action."
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="destructive">Destructive</Button>`}
      >
        <Btn variant="primary">Primary</Btn>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="tertiary">Tertiary</Btn>
        <Btn variant="destructive">Destructive</Btn>
      </Example>

      {/* Sizes */}
      <Example
        title="Sizes"
        description="Three sizes — sm (32px), md (40px, default), lg (48px). Use sm inside compact UI like table rows; lg for hero or standalone CTAs."
        code={`<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>`}
      >
        <Btn variant="primary" size="sm">Small</Btn>
        <Btn variant="primary" size="md">Medium</Btn>
        <Btn variant="primary" size="lg">Large</Btn>
      </Example>

      {/* Leading icon */}
      <Example
        title="With leading icon"
        description="A leading icon reinforces the action. Always pair with a visible label — use icon-only for space-constrained contexts."
        code={`<Button variant="primary" leadingIcon={Plus}>Create project</Button>
<Button variant="secondary" leadingIcon={Download}>Export</Button>
<Button variant="destructive" leadingIcon={Trash2}>Delete</Button>`}
      >
        <Btn variant="primary"     leadingIcon={Plus}     >Create project</Btn>
        <Btn variant="secondary"   leadingIcon={Download}  >Export</Btn>
        <Btn variant="destructive" leadingIcon={Trash2}    >Delete</Btn>
      </Example>

      {/* Trailing icon */}
      <Example
        title="With trailing icon"
        description="Trailing icons are best for navigation actions — arrows and chevrons signal that the button leads somewhere."
        code={`<Button variant="primary" trailingIcon={ArrowRight}>Get started</Button>
<Button variant="secondary" trailingIcon={ChevronRight}>See all</Button>`}
      >
        <Btn variant="primary"   trailingIcon={ArrowRight}  >Get started</Btn>
        <Btn variant="secondary" trailingIcon={ChevronRight} >See all</Btn>
      </Example>

      {/* Icon only */}
      <Example
        title="Icon only"
        description="When space is tight. Always provide an aria-label so screen readers announce the action."
        code={`<Button variant="primary"   aria-label="Settings"><Settings /></Button>
<Button variant="secondary" aria-label="Download"><Download /></Button>
<Button variant="destructive" aria-label="Delete"><Trash2 /></Button>`}
      >
        <Btn variant="primary"    ><Settings  /></Btn>
        <Btn variant="secondary"  ><Download  /></Btn>
        <Btn variant="destructive"><Trash2    /></Btn>
      </Example>

      {/* Full width */}
      <Example
        title="Full width"
        description="Stretches to fill its container. Useful in forms, modals, and mobile layouts."
        code={`<Button variant="primary" fullWidth>Create account</Button>
<Button variant="secondary" fullWidth>Cancel</Button>`}
        center={false}
        previewBg="bg-white"
      >
        <div className="w-full max-w-sm flex flex-col gap-3">
          <Btn variant="primary"   fullWidth>Create account</Btn>
          <Btn variant="secondary" fullWidth>Cancel</Btn>
        </div>
      </Example>

      {/* Disabled */}
      <Example
        title="Disabled state"
        description="Reduces opacity to 50% and blocks pointer events. Where possible, explain why the button is disabled."
        code={`<Button variant="primary"     disabled>Primary</Button>
<Button variant="secondary"   disabled>Secondary</Button>
<Button variant="tertiary"    disabled>Tertiary</Button>
<Button variant="destructive" disabled>Destructive</Button>`}
      >
        <Btn variant="primary"     disabled>Primary</Btn>
        <Btn variant="secondary"   disabled>Secondary</Btn>
        <Btn variant="tertiary"    disabled>Tertiary</Btn>
        <Btn variant="destructive" disabled>Destructive</Btn>
      </Example>

      {/* Loading */}
      <Example
        title="Loading state"
        description="Replaces the leading icon with a spinner and locks interaction. Apply after a user triggers an async action."
        code={`<Button variant="primary" loading>Saving…</Button>
<Button variant="secondary" loading>Exporting…</Button>`}
      >
        <Btn variant="primary"   loading>Saving…</Btn>
        <Btn variant="secondary" loading>Exporting…</Btn>
      </Example>

      {/* ── Anatomy ───────────────────────────────────── */}
      <Section
        id="anatomy"
        title="Anatomy"
      />
      <div className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
        <div className="bg-white p-10 flex items-center justify-center">
          <div className="relative inline-flex items-center gap-2">
            <Btn variant="primary" leadingIcon={Plus} trailingIcon={ChevronRight}>
              Create project
            </Btn>
            {/* Callout labels */}
            <span className="absolute -top-8 left-3 text-[11px] text-zinc-500 font-medium whitespace-nowrap">① Container</span>
            <span className="absolute -bottom-7 left-3 text-[11px] text-zinc-500 font-medium whitespace-nowrap">② Leading icon</span>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[11px] text-zinc-500 font-medium whitespace-nowrap">③ Label</span>
            <span className="absolute -bottom-7 right-3 text-[11px] text-zinc-500 font-medium whitespace-nowrap">④ Trailing icon</span>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-zinc-400">
          {[
            ['① Container', 'Rounded frame — background, border, shadow'],
            ['② Leading icon', 'Optional — 16×16px (sm/md) or 20×20px (lg)'],
            ['③ Label', 'Required — 1–3 words, sentence case'],
            ['④ Trailing icon', 'Optional — best for navigation cues'],
          ].map(([label, desc]) => (
            <div key={label}>
              <p className="font-semibold text-zinc-200 mb-0.5">{label}</p>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── States ────────────────────────────────────── */}
      <Section id="states" title="States" />
      <div className="mb-10 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="bg-white p-8 flex flex-wrap gap-6 items-end justify-center">
          {/* We show primary variant across all states visually */}
          {[
            { label: 'Default',  cls: 'bg-brand-700 text-white shadow-sm' },
            { label: 'Hover',    cls: 'bg-brand-800 text-white shadow-sm' },
            { label: 'Pressed',  cls: 'bg-brand-900 text-white shadow-sm' },
            { label: 'Focus',    cls: 'bg-brand-700 text-white shadow-sm ring-2 ring-brand-300 ring-offset-2 ring-offset-white' },
            { label: 'Disabled', cls: 'bg-brand-700 text-white shadow-sm opacity-50 cursor-not-allowed' },
            { label: 'Loading',  cls: 'bg-brand-700 text-white shadow-sm opacity-50 cursor-not-allowed', loading: true },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <button className={`h-10 px-4 text-sm font-medium rounded-lg inline-flex items-center gap-2 ${s.cls}`}>
                {s.loading && <Loader2 size={16} className="animate-spin" />}
                {s.label}
              </button>
              <span className="text-[11px] text-zinc-500 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tokens ────────────────────────────────────── */}
      <Section id="tokens" title="Design tokens" />
      <TokenTable tokens={[
        { name: 'background/brand/primary', value: '#318272', description: 'Primary button fill' },
        { name: 'background/brand/hover',   value: '#226558', description: 'Primary hover state' },
        { name: 'background/brand/pressed', value: '#15483e', description: 'Primary pressed state' },
        { name: 'background/muted',         value: '#e1e1e1', description: 'Disabled fill' },
        { name: 'background/state/error/bold', value: '#bc1700', description: 'Destructive fill' },
        { name: 'text/inverse',             value: '#ffffff', description: 'Text on primary/destructive' },
        { name: 'text/disabled',            value: '#8f8f8f', description: 'Disabled text' },
        { name: 'border/Default',           value: '#cccccc', description: 'Secondary border' },
        { name: 'focus/Ring',               value: '#acffef', description: 'Focus shadow colour' },
        { name: 'Radius/md',                value: '8px',    description: 'Corner radius' },
      ]} />

      {/* ── Props ─────────────────────────────────────── */}
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
            <PropRow name="variant"      type='"primary" | "secondary" | "tertiary" | "destructive"' defaultVal='"primary"'   description="Visual style — maps directly to a semantic colour token set." />
            <PropRow name="size"         type='"sm" | "md" | "lg"'                                   defaultVal='"md"'        description="sm=32px · md=40px · lg=48px height." />
            <PropRow name="disabled"     type="boolean"                                               defaultVal="false"       description="Reduces opacity and blocks interaction. Keep focusable where possible." />
            <PropRow name="loading"      type="boolean"                                               defaultVal="false"       description="Replaces leading icon with a spinner and implies disabled." />
            <PropRow name="fullWidth"    type="boolean"                                               defaultVal="false"       description="Stretches to fill the parent container width." />
            <PropRow name="leadingIcon"  type="React.ElementType"                                     defaultVal={undefined}   description="Lucide (or any SVG) icon component rendered before the label." />
            <PropRow name="trailingIcon" type="React.ElementType"                                     defaultVal={undefined}   description="Icon rendered after the label. Best for navigation cues." />
            <PropRow name="onClick"      type="() => void"                                            defaultVal={undefined}   description="Click handler. Not called when disabled or loading." />
          </tbody>
        </table>
      </div>

      {/* ── Guidelines ────────────────────────────────── */}
      <Section id="guidelines" title="Content guidelines" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {/* Do */}
        <div className="rounded-xl border border-green-900 bg-green-950/30 p-5">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">Do</p>
          <ul className="space-y-2 text-sm text-zinc-300">
            {[
              'Use 1–3 words that describe the action: "Save changes", "Create account"',
              'Use sentence case, not ALL CAPS',
              'Use one primary button per screen section',
              'Pair icon-only buttons with aria-label',
              'Explain why a button is disabled via tooltip or helper text',
            ].map(t => (
              <li key={t} className="flex gap-2">
                <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Don't */}
        <div className="rounded-xl border border-red-900 bg-red-950/30 p-5">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">Don't</p>
          <ul className="space-y-2 text-sm text-zinc-300">
            {[
              'Use vague labels: "OK", "Yes", "Click here"',
              'Place two primary buttons side by side',
              'Use a button for page navigation — use a link',
              'Use a destructive button for minor, reversible actions',
              'Skip the label on icon-only buttons without aria-label',
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
