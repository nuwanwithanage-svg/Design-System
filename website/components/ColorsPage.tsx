'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────

type CategoryFilter = 'all' | 'background' | 'text' | 'border' | 'icon'
type TokenGroup = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info'
type TokenCategory = 'background' | 'text' | 'border' | 'icon'

interface SemanticToken {
  name: string
  hex: string
  alias: string
  usage: string
  group: TokenGroup
  category: TokenCategory
}

// ─── Semantic token data ───────────────────────────────────────────────────────

const TOKENS: SemanticToken[] = [
  // Background — Neutral
  { name: 'background/neutral/primary',         hex: '#ffffff', alias: 'White',          usage: 'Page surfaces, cards, modals',          group: 'neutral',  category: 'background' },
  { name: 'background/neutral/secondary',       hex: '#f5f5f5', alias: 'Greyscale/10',   usage: 'Subtle row alternation, tinted page bg', group: 'neutral',  category: 'background' },
  { name: 'background/neutral/tertiary',        hex: '#e1e1e1', alias: 'Greyscale/20',   usage: 'Hover states on neutral surfaces',       group: 'neutral',  category: 'background' },
  { name: 'background/neutral/disabled',        hex: '#8f8f8f', alias: 'Greyscale/60',   usage: 'Disabled component backgrounds',         group: 'neutral',  category: 'background' },
  // Background — Brand
  { name: 'background/brand/primary',           hex: '#318272', alias: 'Green/80',       usage: 'Primary CTA buttons',                   group: 'brand',    category: 'background' },
  { name: 'background/brand/secondary',         hex: '#429f8d', alias: 'Green/70',       usage: 'CTA hover state',                       group: 'brand',    category: 'background' },
  { name: 'background/brand/tertiary',          hex: '#6cd9c4', alias: 'Green/50',       usage: 'Tinted brand surfaces, highlights',      group: 'brand',    category: 'background' },
  // Background — Success
  { name: 'background/semantic/success/subtle', hex: '#f3fffc', alias: 'Green/10',       usage: 'Success alert background',              group: 'success',  category: 'background' },
  { name: 'background/semantic/success/bold',   hex: '#56bca8', alias: 'Green/60',       usage: 'Success badge background',              group: 'success',  category: 'background' },
  // Background — Warning
  { name: 'background/semantic/warning/subtle', hex: '#fff6ee', alias: 'Orange/10',      usage: 'Warning alert background',              group: 'warning',  category: 'background' },
  { name: 'background/semantic/warning/bold',   hex: '#dd8a46', alias: 'Orange/60',      usage: 'Warning badge background',              group: 'warning',  category: 'background' },
  // Background — Error
  { name: 'background/semantic/error/subtle',   hex: '#ffeae7', alias: 'Red/10',         usage: 'Error alert background',                group: 'error',    category: 'background' },
  { name: 'background/semantic/error/bold',     hex: '#bc1700', alias: 'Red/80',         usage: 'Destructive buttons',                   group: 'error',    category: 'background' },
  // Background — Info
  { name: 'background/semantic/info/subtle',    hex: '#ecf7ff', alias: 'Blue/10',        usage: 'Info alert background',                 group: 'info',     category: 'background' },
  { name: 'background/semantic/info/bold',      hex: '#0070c6', alias: 'Blue/70',        usage: 'Info badge background',                 group: 'info',     category: 'background' },

  // Text — Neutral
  { name: 'text/neutral/primary',               hex: '#000000', alias: 'Black',          usage: 'Body text, headings',                   group: 'neutral',  category: 'text' },
  { name: 'text/neutral/secondary',             hex: '#3b3b3d', alias: 'Greyscale/100',  usage: 'Secondary labels, captions',            group: 'neutral',  category: 'text' },
  { name: 'text/neutral/tertiary',              hex: '#656566', alias: 'Greyscale/80',   usage: 'Hints, placeholders',                   group: 'neutral',  category: 'text' },
  { name: 'text/neutral/disabled',              hex: '#f5f5f5', alias: 'Greyscale/10',   usage: 'Disabled text',                         group: 'neutral',  category: 'text' },
  // Text — Brand
  { name: 'text/brand/primary',                 hex: '#15483e', alias: 'Green/100',      usage: 'Brand text on light backgrounds',       group: 'brand',    category: 'text' },
  { name: 'text/brand/secondary',               hex: '#f3fffc', alias: 'Green/10',       usage: 'Brand text on dark backgrounds',        group: 'brand',    category: 'text' },
  // Text — Success
  { name: 'text/semantic/success/subtle',       hex: '#226558', alias: 'Green/90',       usage: 'Success text on subtle background',     group: 'success',  category: 'text' },
  { name: 'text/semantic/success/bold',         hex: '#f3fffc', alias: 'Green/10',       usage: 'Success text on bold background',       group: 'success',  category: 'text' },
  // Text — Warning
  { name: 'text/semantic/warning/subtle',       hex: '#995824', alias: 'Orange/80',      usage: 'Warning text on subtle background',     group: 'warning',  category: 'text' },
  { name: 'text/semantic/warning/bold',         hex: '#fff6ee', alias: 'Orange/10',      usage: 'Warning text on bold background',       group: 'warning',  category: 'text' },
  // Text — Error
  { name: 'text/semantic/error/subtle',         hex: '#931200', alias: 'Red/90',         usage: 'Error text on subtle background',       group: 'error',    category: 'text' },
  { name: 'text/semantic/error/bold',           hex: '#ffeae7', alias: 'Red/10',         usage: 'Error text on bold background',         group: 'error',    category: 'text' },
  // Text — Info
  { name: 'text/semantic/info/subtle',          hex: '#004275', alias: 'Blue/90',        usage: 'Info text on subtle background',        group: 'info',     category: 'text' },
  { name: 'text/semantic/info/bold',            hex: '#ecf7ff', alias: 'Blue/10',        usage: 'Info text on bold background',          group: 'info',     category: 'text' },

  // Border — Neutral
  { name: 'border/neutral/primary',             hex: '#e1e1e1', alias: 'Greyscale/20',   usage: 'Default borders for inputs and cards',  group: 'neutral',  category: 'border' },
  { name: 'border/neutral/inverse',             hex: '#a3a3a3', alias: 'Greyscale/50',   usage: 'Stronger emphasis borders',             group: 'neutral',  category: 'border' },
  // Border — Brand
  { name: 'border/brand/primary',               hex: '#318272', alias: 'Green/80',       usage: 'Focused inputs, brand emphasis',        group: 'brand',    category: 'border' },
  { name: 'border/brand/inverse',               hex: '#d0fff6', alias: 'Green/20',       usage: 'Brand border on dark backgrounds',      group: 'brand',    category: 'border' },
  // Border — Semantic
  { name: 'border/semantic/success/primary',    hex: '#318272', alias: 'Green/80',       usage: 'Success state borders',                 group: 'success',  category: 'border' },
  { name: 'border/semantic/success/inverse',    hex: '#d0fff6', alias: 'Green/20',       usage: 'Success border on dark background',     group: 'success',  category: 'border' },
  { name: 'border/semantic/warning/primary',    hex: '#995824', alias: 'Orange/80',      usage: 'Warning state borders',                 group: 'warning',  category: 'border' },
  { name: 'border/semantic/warning/inverse',    hex: '#ffe2ca', alias: 'Orange/20',      usage: 'Warning border on dark background',     group: 'warning',  category: 'border' },
  { name: 'border/semantic/error/primary',      hex: '#bc1700', alias: 'Red/80',         usage: 'Error state borders',                   group: 'error',    category: 'border' },
  { name: 'border/semantic/error/inverse',      hex: '#ffc5bd', alias: 'Red/20',         usage: 'Error border on dark background',       group: 'error',    category: 'border' },
  { name: 'border/semantic/info/primary',       hex: '#00599d', alias: 'Blue/80',        usage: 'Info state borders',                    group: 'info',     category: 'border' },
  { name: 'border/semantic/info/inverse',       hex: '#b7e0ff', alias: 'Blue/20',        usage: 'Info border on dark background',        group: 'info',     category: 'border' },

  // Icon — Neutral
  { name: 'icon/neutral/primary',               hex: '#000000', alias: 'Black',          usage: 'Primary icons',                         group: 'neutral',  category: 'icon' },
  { name: 'icon/neutral/secondary',             hex: '#3b3b3d', alias: 'Greyscale/100',  usage: 'Secondary icons',                       group: 'neutral',  category: 'icon' },
  { name: 'icon/neutral/tertiary',              hex: '#4f5052', alias: 'Greyscale/90',   usage: 'Subtle / tertiary icons',               group: 'neutral',  category: 'icon' },
  { name: 'icon/neutral/disabled',              hex: '#f5f5f5', alias: 'Greyscale/10',   usage: 'Disabled icons',                        group: 'neutral',  category: 'icon' },
  // Icon — Brand
  { name: 'icon/brand/primary',                 hex: '#15483e', alias: 'Green/100',      usage: 'Brand icons on light backgrounds',      group: 'brand',    category: 'icon' },
  { name: 'icon/brand/secondary',               hex: '#f3fffc', alias: 'Green/10',       usage: 'Brand icons on dark backgrounds',       group: 'brand',    category: 'icon' },
  // Icon — Semantic
  { name: 'icon/semantic/success/subtle',       hex: '#226558', alias: 'Green/90',       usage: 'Success icons on subtle background',    group: 'success',  category: 'icon' },
  { name: 'icon/semantic/success/bold',         hex: '#f3fffc', alias: 'Green/10',       usage: 'Success icons on bold background',      group: 'success',  category: 'icon' },
  { name: 'icon/semantic/warning/subtle',       hex: '#995824', alias: 'Orange/80',      usage: 'Warning icons on subtle background',    group: 'warning',  category: 'icon' },
  { name: 'icon/semantic/warning/bold',         hex: '#fff6ee', alias: 'Orange/10',      usage: 'Warning icons on bold background',      group: 'warning',  category: 'icon' },
  { name: 'icon/semantic/error/subtle',         hex: '#931200', alias: 'Red/90',         usage: 'Error icons on subtle background',      group: 'error',    category: 'icon' },
  { name: 'icon/semantic/error/bold',           hex: '#ffeae7', alias: 'Red/10',         usage: 'Error icons on bold background',        group: 'error',    category: 'icon' },
  { name: 'icon/semantic/info/subtle',          hex: '#004275', alias: 'Blue/90',        usage: 'Info icons on subtle background',       group: 'info',     category: 'icon' },
  { name: 'icon/semantic/info/bold',            hex: '#ecf7ff', alias: 'Blue/10',        usage: 'Info icons on bold background',         group: 'info',     category: 'icon' },
]

// ─── Group config ──────────────────────────────────────────────────────────────

const GROUP_CONFIG: Record<TokenGroup, { label: string; dot: string }> = {
  neutral: { label: 'Neutral',  dot: '#a1a1aa' },
  brand:   { label: 'Brand',    dot: '#318272' },
  success: { label: 'Success',  dot: '#56bca8' },
  warning: { label: 'Warning',  dot: '#dd8a46' },
  error:   { label: 'Error',    dot: '#bc1700' },
  info:    { label: 'Info',     dot: '#0070c6' },
}

// ─── States in practice ────────────────────────────────────────────────────────

const STATE_EXAMPLES = [
  {
    name: 'Success',
    bg: '#f3fffc', textColor: '#226558', borderColor: '#318272',
    bgToken: 'background/semantic/success/subtle',
    textToken: 'text/semantic/success/subtle',
    borderToken: 'border/semantic/success/primary',
    title: 'Payment confirmed',
    desc: 'Your transaction has been processed successfully.',
    symbol: '✓',
  },
  {
    name: 'Warning',
    bg: '#fff6ee', textColor: '#995824', borderColor: '#995824',
    bgToken: 'background/semantic/warning/subtle',
    textToken: 'text/semantic/warning/subtle',
    borderToken: 'border/semantic/warning/primary',
    title: 'Subscription expiring',
    desc: 'Your plan expires in 3 days. Review your options.',
    symbol: '⚠',
  },
  {
    name: 'Error',
    bg: '#ffeae7', textColor: '#931200', borderColor: '#bc1700',
    bgToken: 'background/semantic/error/subtle',
    textToken: 'text/semantic/error/subtle',
    borderToken: 'border/semantic/error/primary',
    title: 'Action failed',
    desc: 'Unable to save changes. Check your connection and try again.',
    symbol: '✕',
  },
  {
    name: 'Info',
    bg: '#ecf7ff', textColor: '#004275', borderColor: '#00599d',
    bgToken: 'background/semantic/info/subtle',
    textToken: 'text/semantic/info/subtle',
    borderToken: 'border/semantic/info/primary',
    title: 'Maintenance scheduled',
    desc: 'System will be unavailable Sunday, 2–4 AM UTC.',
    symbol: 'ℹ',
  },
]

// ─── Primitive palettes ────────────────────────────────────────────────────────

const PALETTES = [
  {
    name: 'Green',
    label: 'Brand',
    swatches: [
      { step: '10', hex: '#f3fffc' }, { step: '20', hex: '#d0fff6' }, { step: '30', hex: '#acffef' },
      { step: '40', hex: '#85f6e0' }, { step: '50', hex: '#6cd9c4' }, { step: '60', hex: '#56bca8' },
      { step: '70', hex: '#429f8d' }, { step: '80', hex: '#318272' }, { step: '90', hex: '#226558' },
      { step: '100', hex: '#15483e' },
    ],
  },
  {
    name: 'Greyscale',
    label: 'Neutral',
    swatches: [
      { step: '10', hex: '#f5f5f5' }, { step: '20', hex: '#e1e1e1' }, { step: '30', hex: '#cccccc' },
      { step: '40', hex: '#b8b8b8' }, { step: '50', hex: '#a3a3a3' }, { step: '60', hex: '#8f8f8f' },
      { step: '70', hex: '#7b7b7b' }, { step: '80', hex: '#656566' }, { step: '90', hex: '#4f5052' },
      { step: '100', hex: '#3b3b3d' },
    ],
  },
  {
    name: 'Red',
    label: 'Error',
    swatches: [
      { step: '10', hex: '#ffeae7' }, { step: '20', hex: '#ffc5bd' }, { step: '30', hex: '#ffa193' },
      { step: '40', hex: '#ff7c69' }, { step: '50', hex: '#ff573f' }, { step: '60', hex: '#ff3215' },
      { step: '70', hex: '#e51c00' }, { step: '80', hex: '#bc1700' }, { step: '90', hex: '#931200' },
      { step: '100', hex: '#6b0d00' },
    ],
  },
  {
    name: 'Orange',
    label: 'Warning',
    swatches: [
      { step: '10', hex: '#fff6ee' }, { step: '20', hex: '#ffe2ca' }, { step: '30', hex: '#ffcda5' },
      { step: '40', hex: '#ffb981' }, { step: '50', hex: '#ffa55c' }, { step: '60', hex: '#dd8a46' },
      { step: '70', hex: '#bb7034' }, { step: '80', hex: '#995824' }, { step: '90', hex: '#774217' },
      { step: '100', hex: '#552d0d' },
    ],
  },
  {
    name: 'Yellow',
    label: 'Attention',
    swatches: [
      { step: '10', hex: '#fffbed' }, { step: '20', hex: '#fff3c4' }, { step: '30', hex: '#ffeb9b' },
      { step: '40', hex: '#ffe273' }, { step: '50', hex: '#f2cf46' }, { step: '60', hex: '#d0b032' },
      { step: '70', hex: '#ae9121' }, { step: '80', hex: '#8c7314' }, { step: '90', hex: '#6a560a' },
      { step: '100', hex: '#483a03' },
    ],
  },
  {
    name: 'Blue',
    label: 'Info',
    swatches: [
      { step: '10', hex: '#ecf7ff' }, { step: '20', hex: '#b7e0ff' }, { step: '30', hex: '#8accff' },
      { step: '40', hex: '#5cb8ff' }, { step: '50', hex: '#2ea4ff' }, { step: '60', hex: '#0088ef' },
      { step: '70', hex: '#0070c6' }, { step: '80', hex: '#00599d' }, { step: '90', hex: '#004275' },
      { step: '100', hex: '#002b4c' },
    ],
  },
  {
    name: 'Black & White',
    label: 'Base',
    swatches: [
      { step: 'White', hex: '#ffffff' },
      { step: 'Black', hex: '#000000' },
    ],
  },
]

// ─── Copy button ───────────────────────────────────────────────────────────────

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      className={`p-0.5 rounded hover:bg-zinc-700 transition-all ${className}`}
      title={`Copy ${text}`}
    >
      {copied
        ? <Check size={11} className="text-brand-400" />
        : <Copy size={11} className="text-zinc-500 hover:text-zinc-300" />}
    </button>
  )
}

// ─── Token row ─────────────────────────────────────────────────────────────────

function TokenRow({ token }: { token: SemanticToken }) {
  const isLight = parseInt(token.hex.replace('#', ''), 16) > 0xdddddd
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 group/row hover:bg-zinc-900/60 transition-colors">
      {/* Swatch */}
      <div
        className="w-9 h-9 rounded flex-shrink-0 border"
        style={{
          backgroundColor: token.hex,
          borderColor: isLight ? '#3f3f46' : 'transparent',
        }}
      />

      {/* Name + usage */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <code className="text-brand-300 text-xs font-mono truncate">{token.name}</code>
          <span className="opacity-0 group-hover/row:opacity-100 transition-opacity">
            <CopyButton text={token.name} />
          </span>
        </div>
        <p className="text-zinc-500 text-xs mt-0.5 truncate">{token.usage}</p>
      </div>

      {/* Alias badge */}
      <span className="hidden sm:block text-xs text-zinc-500 font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded flex-shrink-0">
        {token.alias}
      </span>

      {/* Hex */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <code className="text-zinc-400 text-xs font-mono w-16 text-right">{token.hex}</code>
        <span className="opacity-0 group-hover/row:opacity-100 transition-opacity">
          <CopyButton text={token.hex} />
        </span>
      </div>
    </div>
  )
}

// ─── Palette swatch ────────────────────────────────────────────────────────────

function PaletteSwatch({ step, hex }: { step: string; hex: string }) {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const isLight = parseInt(hex.replace('#', ''), 16) > 0xbbbbbb

  const copy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className="relative flex-1 h-12 cursor-pointer first:rounded-l-md last:rounded-r-md transition-transform hover:scale-105 hover:z-10"
      style={{ backgroundColor: hex }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={copy}
      title={`${step} — ${hex}`}
    >
      {hovered && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded text-xs font-mono whitespace-nowrap z-20 shadow-lg"
          style={{
            backgroundColor: isLight ? '#18181b' : '#ffffff',
            color: isLight ? '#ffffff' : '#18181b',
          }}
        >
          <div className="font-semibold">{step}</div>
          <div className="opacity-75">{hex}</div>
          {copied && <div className="text-brand-400 font-medium">Copied!</div>}
        </div>
      )}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

const GROUPS: TokenGroup[] = ['neutral', 'brand', 'success', 'warning', 'error', 'info']
const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all',        label: 'All' },
  { id: 'background', label: 'Background' },
  { id: 'text',       label: 'Text' },
  { id: 'border',     label: 'Border' },
  { id: 'icon',       label: 'Icon' },
]

export function ColorsPage() {
  const [filter, setFilter] = useState<CategoryFilter>('all')

  const filtered = TOKENS.filter(t => filter === 'all' || t.category === filter)

  return (
    <div className="space-y-16">

      {/* ── Two-layer concept ─────────────────────────────────────── */}
      <section id="two-layers">
        <h2 className="text-xl font-semibold text-zinc-100 mb-1">Two layers</h2>
        <p className="text-zinc-400 text-sm mb-6">
          The colour system has two layers. Primitives are the raw palette — never use them directly in components.
          Semantic tokens give each colour a purpose and allow the entire theme to shift with a single change.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Primitives card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs font-bold">P</div>
              <span className="text-sm font-semibold text-zinc-200">Primitives</span>
              <span className="ml-auto text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded">Raw values</span>
            </div>
            <p className="text-xs text-zinc-500 mb-4">The raw colour palette — 7 scales with 10 steps each. Use as the source of truth in Figma variables.</p>
            <div className="flex gap-1">
              {['#ffeae7','#ffa55c','#f2cf46','#56bca8','#318272','#0088ef','#a3a3a3'].map(c => (
                <div key={c} className="flex-1 h-6 rounded-sm" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="text-xs text-zinc-600 mt-2 font-mono">Red · Orange · Yellow · Green · Green · Blue · Grey</p>
          </div>

          {/* Semantic card */}
          <div className="rounded-xl border border-brand-800/50 bg-brand-900/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-brand-900/50 border border-brand-700 flex items-center justify-center text-brand-400 text-xs font-bold">S</div>
              <span className="text-sm font-semibold text-zinc-200">Semantic</span>
              <span className="ml-auto text-xs text-brand-400 bg-brand-900/50 px-2 py-0.5 rounded border border-brand-800">Always use in components</span>
            </div>
            <p className="text-xs text-zinc-500 mb-4">Purpose-driven aliases of primitives. Use these in every component — never a raw primitive value.</p>
            <div className="space-y-1.5">
              {[
                { token: 'background/brand/primary', hex: '#318272', alias: '→ Green/80' },
                { token: 'text/semantic/error/subtle', hex: '#931200', alias: '→ Red/90' },
                { token: 'border/semantic/info/primary', hex: '#00599d', alias: '→ Blue/80' },
              ].map(({ token, hex, alias }) => (
                <div key={token} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: hex }} />
                  <code className="text-brand-300 font-mono truncate flex-1">{token}</code>
                  <span className="text-zinc-600 font-mono">{alias}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Semantic tokens ───────────────────────────────────────── */}
      <section id="semantic-tokens">
        <h2 className="text-xl font-semibold text-zinc-100 mb-1">Semantic tokens</h2>
        <p className="text-zinc-400 text-sm mb-5">
          59 tokens across 4 categories. Hover any row to copy the token name or hex value.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const count = c.id === 'all' ? TOKENS.length : TOKENS.filter(t => t.category === c.id).length
            const active = filter === c.id
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  active
                    ? 'bg-brand-900/60 text-brand-300 border border-brand-700 shadow-sm'
                    : 'text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {c.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-brand-800/50 text-brand-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Token groups */}
        <div className="space-y-8">
          {GROUPS.map(group => {
            const groupTokens = filtered.filter(t => t.group === group)
            if (!groupTokens.length) return null
            const cfg = GROUP_CONFIG[group]
            return (
              <div key={group}>
                {/* Group header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.dot }} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{cfg.label}</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-xs text-zinc-600">{groupTokens.length} tokens</span>
                </div>
                {/* Token rows */}
                <div className="rounded-xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800/50 bg-zinc-950/50">
                  {/* Column headers */}
                  <div className="flex items-center gap-3 px-3 py-2 bg-zinc-900/60 border-b border-zinc-800">
                    <div className="w-9 flex-shrink-0" />
                    <div className="flex-1 text-xs text-zinc-600 font-medium">Token name</div>
                    <div className="hidden sm:block text-xs text-zinc-600 font-medium w-24">Primitive</div>
                    <div className="text-xs text-zinc-600 font-medium w-16 text-right">Value</div>
                    <div className="w-4" />
                  </div>
                  {groupTokens.map(token => <TokenRow key={token.name} token={token} />)}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── States in practice ────────────────────────────────────── */}
      <section id="in-practice">
        <h2 className="text-xl font-semibold text-zinc-100 mb-1">Semantic states in practice</h2>
        <p className="text-zinc-400 text-sm mb-6">
          Each semantic state uses a coordinated set of background, text, and border tokens. Always pair the <code className="text-brand-300 font-mono text-xs">subtle</code> background with <code className="text-brand-300 font-mono text-xs">subtle</code> text and <code className="text-brand-300 font-mono text-xs">primary</code> border.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {STATE_EXAMPLES.map(s => (
            <div key={s.name} className="rounded-xl border border-zinc-800 overflow-hidden">
              {/* Live preview */}
              <div
                className="p-4 border-l-4"
                style={{ backgroundColor: s.bg, borderColor: s.borderColor }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: s.borderColor, color: s.bg }}
                  >
                    {s.symbol}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: s.textColor }}>{s.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: s.textColor, opacity: 0.8 }}>{s.desc}</p>
                  </div>
                </div>
              </div>

              {/* Token chips */}
              <div className="bg-zinc-900/80 px-3 py-3 space-y-1.5">
                <p className="text-xs text-zinc-600 font-medium uppercase tracking-wider mb-2">{s.name} tokens used</p>
                {[
                  { label: 'bg', token: s.bgToken },
                  { label: 'text', token: s.textToken },
                  { label: 'border', token: s.borderToken },
                ].map(({ label, token }) => (
                  <div key={token} className="flex items-center gap-2 group/chip">
                    <span className="text-xs text-zinc-600 font-mono w-8">{label}</span>
                    <code className="text-brand-300 text-xs font-mono flex-1 truncate">{token}</code>
                    <span className="opacity-0 group-hover/chip:opacity-100 transition-opacity">
                      <CopyButton text={token} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Primitive palettes ─────────────────────────────────────── */}
      <section id="primitives">
        <h2 className="text-xl font-semibold text-zinc-100 mb-1">Primitive palettes</h2>
        <p className="text-zinc-400 text-sm mb-6">
          7 raw colour scales. These are the source of truth for all semantic tokens.
          Hover any swatch to see the step and hex — click to copy.
          <span className="ml-1 text-zinc-600">Never use primitives directly in components.</span>
        </p>

        <div className="space-y-5">
          {PALETTES.map(palette => (
            <div key={palette.name}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-zinc-200">{palette.name}</span>
                <span className="text-xs text-zinc-600 bg-zinc-800/60 px-1.5 py-0.5 rounded">{palette.label}</span>
              </div>
              <div className="flex rounded-md overflow-hidden">
                {palette.swatches.map(s => (
                  <PaletteSwatch key={s.step} step={s.step} hex={s.hex} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Scale note */}
        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
          <p className="text-xs text-zinc-500">
            <span className="text-zinc-300 font-medium">Scale convention:</span>{' '}
            Step <code className="text-brand-300 font-mono">10</code> is the lightest tint,{' '}
            <code className="text-brand-300 font-mono">100</code> is the darkest shade.
            Each step is perceptually spaced for predictable pairing —
            e.g. <code className="text-brand-300 font-mono">Green/10</code> as a background always pairs with{' '}
            <code className="text-brand-300 font-mono">Green/90</code> as text for accessible contrast.
          </p>
        </div>
      </section>

    </div>
  )
}
