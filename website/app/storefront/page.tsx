'use client'

import { useState } from 'react'
import {
  Search, ShoppingCart, User, Heart, ChevronRight, ChevronLeft,
  Star, Truck, Shield, HeadphonesIcon, RotateCcw, Menu, X,
  Zap, Thermometer, Activity, Droplets, Settings, ArrowRight,
  Check, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube,
} from 'lucide-react'

// ── Design-system token mappings (Tailwind classes)
// bg-brand-700  = background/brand/primary   (#0f766e ≈ dark-cyan/80)
// bg-brand-800  = background/brand/hover     (#115e59 ≈ dark-cyan/90)
// ring-brand-300 = focus/Ring               (#5eead4 ≈ dark-cyan/30)
// text-zinc-900  = text/primary
// text-zinc-600  = text/secondary
// text-zinc-400  = text/tertiary
// border-zinc-200 = border/Default
// shadow-sm      = elevation/sm
// shadow-md      = elevation/md
// shadow-xl      = elevation/lg

// ── Primitive button primitive (mirrors Figma Button component)
function Btn({
  children, variant = 'primary', size = 'md', className = '', disabled = false, onClick, htmlType = 'button',
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  onClick?: () => void
  htmlType?: 'button' | 'submit' | 'reset'
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 ' +
    'focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizes = {
    sm: 'h-8  px-3  text-sm',
    md: 'h-10 px-4  text-sm',
    lg: 'h-12 px-5  text-base',
  }

  const variants = {
    primary:     'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 shadow-sm',
    secondary:   'border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 active:bg-zinc-100 shadow-sm',
    ghost:       'text-zinc-600 hover:bg-zinc-100 active:bg-zinc-200',
    destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
  }

  return (
    <button
      type={htmlType}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

// ── Input component (mirrors Figma Input component)
function Input({
  label, placeholder, type = 'text', error, id,
}: {
  label?: string; placeholder?: string; type?: string; error?: string; id?: string
}) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')

  const borderClass = error
    ? 'border-red-500 focus:ring-red-300'
    : focused
    ? 'border-brand-600'
    : 'border-zinc-300'

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={
          `h-10 w-full rounded-lg border bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 ` +
          `transition-all duration-150 outline-none ` +
          `focus:ring-2 focus:ring-brand-300 focus:ring-offset-0 ` +
          `disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed ` +
          borderClass
        }
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

// ── Rating stars
function Stars({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            size={12}
            className={i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-300 fill-zinc-200'}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-zinc-500">({count})</span>
      )}
    </div>
  )
}

// ── Product card (uses elevation/sm shadow, border/Default, text tokens)
function ProductCard({
  name, category, price, originalPrice, rating, reviewCount, badge, icon: Icon,
}: {
  name: string; category: string; price: number; originalPrice?: number
  rating: number; reviewCount: number; badge?: string; icon: React.ElementType
}) {
  const [saved, setSaved] = useState(false)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {badge && (
        <span className="absolute top-3 left-3 z-10 text-[11px] font-semibold uppercase tracking-wide bg-brand-700 text-white px-2 py-0.5 rounded-md">
          {badge}
        </span>
      )}

      {/* Save button */}
      <button
        onClick={() => setSaved(s => !s)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-1 transition-colors"
        aria-label={saved ? 'Remove from saved' : 'Save item'}
      >
        <Heart size={14} className={saved ? 'fill-red-500 text-red-500' : ''} />
      </button>

      {/* Product image */}
      <div className="flex items-center justify-center h-44 bg-zinc-50 border-b border-zinc-100">
        <Icon size={64} className="text-zinc-300" strokeWidth={1} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <p className="text-xs font-medium text-brand-600 uppercase tracking-wide mb-1">{category}</p>
          <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2">{name}</h3>
        </div>

        <Stars rating={rating} count={reviewCount} />

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-zinc-900">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-zinc-400 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        <Btn
          variant={added ? 'ghost' : 'primary'}
          size="sm"
          className="w-full mt-auto"
          onClick={handleAdd}
        >
          {added ? (
            <><Check size={14} /> Added to cart</>
          ) : (
            <><ShoppingCart size={14} /> Add to Cart</>
          )}
        </Btn>
      </div>
    </div>
  )
}

// ── Category card
function CategoryCard({ name, description, icon: Icon, count, color }: {
  name: string; description: string; icon: React.ElementType; count: number; color: string
}) {
  return (
    <div className={`group relative flex flex-col justify-between rounded-xl p-6 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${color}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/20" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Icon size={32} className="text-white/80" strokeWidth={1.5} />
          <span className="text-xs font-medium text-white/60 bg-white/10 px-2 py-1 rounded-full">
            {count} items
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
      <div className="relative z-10 mt-6 flex items-center gap-1 text-sm font-medium text-white group-hover:gap-2 transition-all">
        Shop now <ArrowRight size={14} />
      </div>
    </div>
  )
}

// ── Trust badge
function TrustBadge({ icon: Icon, title, subtitle }: {
  icon: React.ElementType; title: string; subtitle: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
        <Icon size={18} className="text-brand-700" />
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-900">{title}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  )
}

// ── Data
const PRODUCTS = [
  { name: 'High-Performance Engine Block Assembly', category: 'Engine Components', price: 1249.99, originalPrice: 1499.00, rating: 4.5, reviewCount: 128, badge: 'Sale', icon: Settings },
  { name: 'Industrial-Grade Alternator 120A', category: 'Electrical Systems', price: 289.50, originalPrice: undefined, rating: 4.0, reviewCount: 64, badge: undefined, icon: Zap },
  { name: 'Heavy-Duty Radiator Cooling System', category: 'Thermal Management', price: 549.00, originalPrice: 649.00, rating: 5.0, reviewCount: 247, badge: 'Best Seller', icon: Thermometer },
  { name: 'Digital Pressure Sensor Module', category: 'Sensors & Gauges', price: 89.95, originalPrice: undefined, rating: 4.0, reviewCount: 33, badge: undefined, icon: Activity },
]

const TOP_SELLERS = [
  { name: 'Hydraulic Pump Assembly 3000 PSI', category: 'Power Systems', price: 879.00, originalPrice: 1050.00, rating: 4.5, reviewCount: 92, badge: 'Top Seller', icon: Droplets },
  { name: 'Industrial Fan Clutch Heavy-Duty', category: 'Thermal Management', price: 134.99, originalPrice: undefined, rating: 4.0, reviewCount: 44, badge: undefined, icon: Settings },
  { name: 'Electronic Control Module ECM', category: 'Electrical Systems', price: 399.00, originalPrice: 450.00, rating: 5.0, reviewCount: 188, badge: 'Sale', icon: Zap },
  { name: 'Coolant Temperature Sensor OEM', category: 'Sensors & Gauges', price: 34.95, originalPrice: undefined, rating: 4.0, reviewCount: 71, badge: undefined, icon: Activity },
]

const CATEGORIES = [
  { name: 'Sensors & Gauges', description: 'Precision monitoring equipment for diagnostics', icon: Activity, count: 184, color: 'bg-zinc-800' },
  { name: 'Thermal Management', description: 'Cooling & heating systems for peak performance', icon: Thermometer, count: 97, color: 'bg-brand-800' },
  { name: 'Power Systems', description: 'Alternators, starters and charging solutions', icon: Zap, count: 213, color: 'bg-zinc-700' },
  { name: 'Pumps & Hydraulics', description: 'High-pressure fluid management systems', icon: Droplets, count: 151, color: 'bg-brand-700' },
]

const FOOTER_LINKS = {
  'Products': ['Engine Components', 'Electrical Systems', 'Thermal Management', 'Sensors & Gauges', 'Pumps & Hydraulics', 'Drive Systems'],
  'Company': ['About Us', 'Careers', 'Press', 'Partners', 'Sustainability'],
  'Support': ['Help Center', 'Track Order', 'Returns Policy', 'Warranty Claims', 'Technical Docs'],
  'Legal': ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'],
}

// ── Page
export default function StorefrontPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount] = useState(3)
  const [heroSlide, setHeroSlide] = useState(0)

  const heroSlides = [
    {
      eyebrow: 'New Arrivals 2026',
      title: 'Components & Accessories',
      subtitle: 'Essential Parts',
      body: 'Built for professionals who demand precision. Genuine OEM and aftermarket parts with full warranty coverage and same-day shipping on in-stock items.',
      cta: 'Shop Components',
      ctaSecondary: 'View Catalogue',
      bg: 'from-zinc-900 via-zinc-800 to-zinc-900',
      accent: 'text-brand-400',
    },
    {
      eyebrow: 'Thermal Management',
      title: 'Air Conditioning',
      subtitle: 'Climate Control Systems',
      body: 'Complete HVAC solutions for heavy equipment. OEM-matched compressors, condensers, and evaporators with guaranteed fitment.',
      cta: 'Shop HVAC',
      ctaSecondary: 'Find My Part',
      bg: 'from-brand-950 via-brand-900 to-zinc-900',
      accent: 'text-brand-300',
    },
  ]

  const slide = heroSlides[heroSlide]

  return (
    <>
      {/* ── Design System Banner ─────────────────────────────────── */}
      <div className="bg-brand-700 text-white text-xs text-center py-2 px-4 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-pulse" />
        Design System Demo — components, tokens, and effects from the design system applied to this storefront
      </div>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-brand-700 flex items-center justify-center">
                <Settings size={16} className="text-white" />
              </div>
              <span className="font-bold text-zinc-900 text-lg tracking-tight">
                Parts<span className="text-brand-600">Co</span>
              </span>
            </div>

            {/* Nav — desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {['Products', 'Categories', 'Brands', 'Deals', 'About'].map(item => (
                <button
                  key={item}
                  className="px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-300"
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Search bar */}
            <div className="hidden sm:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search parts, categories, brands…"
                  className="w-full h-9 pl-9 pr-3 text-sm rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-300 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand-300 transition-colors sm:hidden">
                <Search size={18} />
              </button>
              <button className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand-300 transition-colors">
                <User size={18} />
              </button>
              <button className="relative p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand-300 transition-colors">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-700 text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="ml-1 p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 md:hidden focus:outline-none focus:ring-2 focus:ring-brand-300"
                onClick={() => setMobileMenuOpen(o => !o)}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-100 bg-white px-4 py-3 space-y-1">
            {['Products', 'Categories', 'Brands', 'Deals', 'About'].map(item => (
              <button key={item} className="w-full text-left px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 rounded-lg">
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Trust bar ───────────────────────────────────────────── */}
      <div className="bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-3">
            <TrustBadge icon={Truck}          title="Free Shipping"         subtitle="On orders over $500" />
            <TrustBadge icon={Shield}         title="Genuine Parts"         subtitle="OEM & aftermarket" />
            <TrustBadge icon={RotateCcw}      title="30-Day Returns"        subtitle="Hassle-free policy" />
            <TrustBadge icon={HeadphonesIcon} title="Expert Support"        subtitle="Mon–Fri 8am–6pm" />
          </div>
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden bg-gradient-to-r ${slide.bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-20 lg:py-28 min-h-[420px]">
            <div className="max-w-xl">
              <p className={`text-xs font-semibold uppercase tracking-widest ${slide.accent} mb-3`}>
                {slide.eyebrow}
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-1">
                {slide.title}
              </h1>
              <p className={`text-2xl lg:text-3xl font-light mb-5 ${slide.accent}`}>
                {slide.subtitle}
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-8 max-w-md">
                {slide.body}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Btn size="lg" variant="primary">
                  {slide.cta} <ArrowRight size={16} />
                </Btn>
                <button className="h-12 px-5 text-base font-medium text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-300">
                  {slide.ctaSecondary}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setHeroSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-brand-300 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroSlide(i)}
                className={`h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand-300 ${i === heroSlide ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/30'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setHeroSlide(s => (s + 1) % heroSlides.length)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-brand-300 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">Handpicked for you</p>
            <h2 className="text-2xl font-bold text-zinc-900">Featured Products</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Trusted by professionals across industries — delivered to your door.
            </p>
          </div>
          <Btn variant="secondary" size="sm" className="hidden sm:inline-flex">
            View all <ChevronRight size={14} />
          </Btn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map(p => <ProductCard key={p.name} {...p} />)}
        </div>
      </section>

      {/* ── Featured Categories ──────────────────────────────────── */}
      <section className="py-16 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">Browse by type</p>
            <h2 className="text-2xl font-bold text-zinc-900">Featured Categories</h2>
            <p className="text-sm text-zinc-500 mt-1 max-w-lg mx-auto">
              Find the exact part you need. Each category is stocked with genuine and aftermarket options.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(c => <CategoryCard key={c.name} {...c} />)}
          </div>
        </div>
      </section>

      {/* ── Top Sellers ──────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">Most popular</p>
            <h2 className="text-2xl font-bold text-zinc-900">Top Sellers</h2>
            <p className="text-sm text-zinc-500 mt-1">
              The parts other professionals keep coming back for.
            </p>
          </div>
          <Btn variant="secondary" size="sm" className="hidden sm:inline-flex">
            See all <ChevronRight size={14} />
          </Btn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOP_SELLERS.map(p => <ProductCard key={p.name} {...p} />)}
        </div>
      </section>

      {/* ── Value proposition ────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-brand-950 to-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">Why PartsCo</p>
          <h2 className="text-3xl font-bold text-white mb-4">Your Operations Are Our Priority</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto mb-12">
            We understand that downtime is costly. Every part in our catalogue is quality-verified, every
            delivery is tracked, and every support request is answered by someone who knows the product —
            not a chatbot. Built for professionals who can't afford to compromise.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            {[
              { icon: Shield, title: '5-Year Warranty', body: 'All OEM and certified aftermarket parts carry a minimum 5-year manufacturer warranty, registered automatically at purchase.' },
              { icon: Truck,  title: 'Same-Day Shipping', body: 'Orders placed before 2 PM ship the same day. Most destinations receive parts within 2–3 business days.' },
              { icon: HeadphonesIcon, title: 'Expert Technicians', body: 'Our support team holds industry certifications. Get accurate part numbers and fitment guidance on every call.' },
            ].map(item => (
              <div key={item.title} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-800 flex items-center justify-center">
                  <item.icon size={18} className="text-brand-300" />
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">Stay in the loop</p>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Sign up to our Newsletter</h2>
          <p className="text-sm text-zinc-500 mb-8">
            Get notified about new stock, exclusive deals, and technical guides. No spam — unsubscribe anytime.
          </p>

          <NewsletterForm />
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-zinc-900 text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

          {/* Top: brand + links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-md bg-brand-700 flex items-center justify-center">
                  <Settings size={14} className="text-white" />
                </div>
                <span className="font-bold text-white text-base">Parts<span className="text-brand-400">Co</span></span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500 mb-4">
                Industrial-grade components and accessories for machinery, vehicles, and heavy equipment.
              </p>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 focus:ring-offset-zinc-900 transition-colors"
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map(link => (
                    <li key={link}>
                      <button className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none focus:underline">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-800 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-zinc-600">© 2026 PartsCo. All rights reserved.</p>

              {/* Contact quick */}
              <div className="flex items-center gap-4 text-xs text-zinc-600">
                <span className="flex items-center gap-1"><Phone size={11} /> +1 800 PARTS CO</span>
                <span className="flex items-center gap-1"><Mail size={11} /> support@partsco.com</span>
                <span className="flex items-center gap-1"><MapPin size={11} /> Melbourne, AU</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

// ── Newsletter form (separate client component for state isolation)
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [focused, setFocused] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center">
          <Check size={22} className="text-brand-600" />
        </div>
        <p className="text-sm font-semibold text-zinc-900">You&apos;re subscribed!</p>
        <p className="text-xs text-zinc-500">We&apos;ll send updates to <strong>{email}</strong></p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full" noValidate>
      <div className="flex-1 flex flex-col gap-1">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setError('') }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="your@email.com"
          className={
            `h-10 w-full rounded-lg border bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 ` +
            `outline-none transition-all duration-150 ` +
            `focus:ring-2 focus:ring-brand-300 focus:ring-offset-0 ` +
            (error
              ? 'border-red-400 focus:border-red-500'
              : focused
              ? 'border-brand-500'
              : 'border-zinc-300')
          }
          aria-label="Email address"
          aria-describedby={error ? 'newsletter-error' : undefined}
        />
        {error && (
          <p id="newsletter-error" className="text-left text-xs text-red-600">{error}</p>
        )}
      </div>
      <Btn htmlType="submit" variant="primary" size="md" className="flex-shrink-0 sm:self-start">
        Subscribe
      </Btn>
    </form>
  )
}
