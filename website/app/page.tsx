import Link from 'next/link'
import { ArrowRight, Palette, Layers, Component, BookOpen, Zap } from 'lucide-react'
import { AppHeader } from '@/components/AppHeader'
import { Footer } from '@/components/Footer'

const sections = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'Introduction, design principles, and how to use tokens in your projects.',
    href: '/docs/getting-started/introduction',
    color: 'text-blue-400',
    bg: 'bg-blue-950/30 border-blue-900/50',
  },
  {
    icon: Palette,
    title: 'Foundations',
    description: 'Colours, typography, spacing, radius, elevation, and motion tokens.',
    href: '/docs/foundations/colors',
    color: 'text-brand-400',
    bg: 'bg-brand-950/20 border-brand-900/30',
  },
  {
    icon: Component,
    title: 'Components',
    description: 'Buttons, inputs, textareas and more — with usage guidance and examples.',
    href: '/docs/components/overview',
    color: 'text-violet-400',
    bg: 'bg-violet-950/30 border-violet-900/50',
  },
  {
    icon: Layers,
    title: 'Patterns',
    description: 'Reusable UI patterns: forms, filtering, empty states, and data tables.',
    href: '/docs/getting-started/introduction',
    color: 'text-orange-400',
    bg: 'bg-orange-950/30 border-orange-900/50',
  },
]

const steps = [
  { step: '01', label: 'Tokens', desc: 'Design decisions captured as named values — colours, spacing, radius, and more.' },
  { step: '02', label: 'Components', desc: 'Reusable UI building blocks built on top of tokens.' },
  { step: '03', label: 'Patterns', desc: 'Compositions of components that solve common UX problems.' },
  { step: '04', label: 'Product', desc: 'Consistent, accessible interfaces built at scale.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <AppHeader />

      {/* Hero */}
      <section className="relative border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/10 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-32">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-xs text-zinc-400 mb-8">
            <Zap size={10} className="text-brand-400" />
            Token-based · Accessible · Production-ready
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-50 leading-tight mb-6">
            Design System<br />
            <span className="text-brand-400">Documentation</span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
            A comprehensive token-based design system with colour scales, typography, spacing, and a growing component library — built for B2B enterprise UI.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/getting-started/introduction"
              className="inline-flex items-center gap-2 bg-brand-400 hover:bg-brand-300 text-zinc-950 font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Get started <ArrowRight size={16} />
            </Link>
            <Link
              href="/docs/components/overview"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium px-5 py-2.5 rounded-lg transition-colors border border-zinc-700"
            >
              Components
            </Link>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Explore the system</h2>
        <p className="text-zinc-500 mb-8">Everything you need to build consistent, accessible UIs.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map(s => {
            const Icon = s.icon
            return (
              <Link
                key={s.title}
                href={s.href}
                className={`group rounded-xl border p-6 transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-black/20 ${s.bg}`}
              >
                <Icon size={20} className={`${s.color} mb-3`} />
                <h3 className="font-semibold text-zinc-100 mb-1 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-sm text-zinc-500">{s.description}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* How we build */}
      <section className="border-t border-zinc-800 max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">How we build</h2>
        <p className="text-zinc-500 mb-10">A layered architecture from raw values to finished product.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-px bg-zinc-800 z-0" />
              )}
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <div className="text-xs font-mono text-brand-400 mb-2">{s.step}</div>
                <div className="font-semibold text-zinc-100 mb-1">{s.label}</div>
                <div className="text-xs text-zinc-500 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's new */}
      <section className="border-t border-zinc-800 max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-zinc-100 mb-8">What&apos;s new</h2>
        <div className="space-y-4">
          {[
            { version: 'v1.2.0', date: 'Feb 2026', label: 'stable', desc: 'Input & Textarea components added with 36 + 12 variants. Full semantic token coverage.' },
            { version: 'v1.1.0', date: 'Jan 2026', label: 'stable', desc: 'Typography token system with 16 bound text styles. Button LG size added.' },
            { version: 'v1.0.0', date: 'Dec 2025', label: 'stable', desc: 'Initial release: colour primitives, semantic tokens, Button component (576 variants).' },
          ].map(item => (
            <div key={item.version} className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
              <div className="flex-shrink-0 text-center">
                <div className="font-mono text-sm font-bold text-zinc-100">{item.version}</div>
                <div className="text-xs text-zinc-600">{item.date}</div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-300">{item.desc}</p>
              </div>
              <span className="flex-shrink-0 text-xs bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 px-2 py-0.5 rounded-full">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
