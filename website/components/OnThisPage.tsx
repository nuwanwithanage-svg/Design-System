'use client'
import { useEffect, useState } from 'react'
import type { TocEntry } from '@/lib/toc'
import { cn } from '@/lib/utils'

export function OnThisPage({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )

    toc.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [toc])

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">On this page</p>
      <ul className="space-y-1.5">
        {toc.map(entry => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                'block text-sm transition-colors',
                entry.level === 3 && 'pl-3',
                activeId === entry.id
                  ? 'text-brand-400 font-medium'
                  : 'text-zinc-500 hover:text-zinc-300'
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
