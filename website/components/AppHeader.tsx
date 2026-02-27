'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Github, Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SearchModal } from './SearchModal'

interface AppHeaderProps {
  onMobileMenuToggle?: () => void
  mobileMenuOpen?: boolean
}

export function AppHeader({ onMobileMenuToggle, mobileMenuOpen }: AppHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
        <div className="flex h-14 items-center gap-4 px-4 md:px-6">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            onClick={onMobileMenuToggle}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-100 hover:text-brand-400 transition-colors">
            <div className="w-6 h-6 rounded bg-brand-400 flex items-center justify-center">
              <span className="text-zinc-950 text-xs font-bold">DS</span>
            </div>
            <span className="hidden sm:block">Design System</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {[
              { href: '/docs/getting-started/introduction', label: 'Docs' },
              { href: '/docs/foundations/colors', label: 'Foundations' },
              { href: '/docs/components/overview', label: 'Components' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 hover:text-zinc-300 transition-all w-48 md:w-64"
            aria-label="Search docs"
          >
            <Search size={14} />
            <span className="flex-1 text-left">Search docs...</span>
            <kbd className="hidden md:flex items-center gap-0.5 text-xs text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">
              <span>⌘</span><span>K</span>
            </kbd>
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* GitHub */}
          <a
            href="https://github.com/nuwanwithanage-svg/Design-System"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="View on GitHub"
          >
            <Github size={16} />
          </a>
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
