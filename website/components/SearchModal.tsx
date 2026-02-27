'use client'
import { useEffect, useRef, useState } from 'react'
import { Search, X, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResult {
  title: string
  href: string
  description?: string
  excerpt?: string
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }

    const searchDocs = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results ?? [])
      } catch {
        setResults([])
      }
    }

    const timeout = setTimeout(searchDocs, 150)
    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, results.length - 1))
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0))
      if (e.key === 'Enter' && results[selected]) {
        window.location.href = results[selected].href
        onClose()
      }
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, results, selected, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4" role="dialog" aria-modal>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
          <Search size={16} className="text-zinc-500 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
          />
          <button onClick={onClose} className="text-zinc-600 hover:text-zinc-400 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map((r, i) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-start gap-3 px-4 py-3 transition-colors',
                    selected === i ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
                  )}
                >
                  <FileText size={14} className="text-zinc-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{r.title}</p>
                    {r.description && <p className="text-xs text-zinc-500 mt-0.5">{r.description}</p>}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-zinc-500">
            No results for &ldquo;<span className="text-zinc-300">{query}</span>&rdquo;
          </div>
        )}

        {!query && (
          <div className="px-4 py-4 text-center text-xs text-zinc-600">
            Type to search docs, components, and tokens
          </div>
        )}

        <div className="flex items-center gap-3 px-4 py-2 border-t border-zinc-800 text-xs text-zinc-600">
          <span><kbd className="bg-zinc-800 px-1 rounded">↑↓</kbd> navigate</span>
          <span><kbd className="bg-zinc-800 px-1 rounded">↵</kbd> open</span>
          <span><kbd className="bg-zinc-800 px-1 rounded">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
