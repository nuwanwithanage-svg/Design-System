'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { DocGroup } from '@/lib/docs'
import { cn } from '@/lib/utils'

interface SidebarNavProps {
  groups: DocGroup[]
}

const statusBadges = {
  beta: <span className="text-xs bg-brand-900/50 text-brand-400 border border-brand-800 px-1.5 py-0.5 rounded-full">Beta</span>,
  deprecated: <span className="text-xs bg-red-900/30 text-red-400 border border-red-800/50 px-1.5 py-0.5 rounded-full">Dep.</span>,
}

export function SidebarNav({ groups }: SidebarNavProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (slug: string) => setCollapsed(c => ({ ...c, [slug]: !c[slug] }))

  return (
    <nav className="py-6 px-2" aria-label="Documentation navigation">
      {groups.map(group => (
        <div key={group.slug} className="mb-4">
          <button
            onClick={() => toggle(group.slug)}
            className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-expanded={!collapsed[group.slug]}
          >
            <span>{group.title}</span>
            {collapsed[group.slug]
              ? <ChevronRight size={12} />
              : <ChevronDown size={12} />
            }
          </button>

          {!collapsed[group.slug] && (
            <ul className="mt-1 space-y-0.5">
              {group.pages.map(page => {
                const isActive = pathname === page.href
                return (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className={cn(
                        'flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
                        isActive
                          ? 'bg-brand-400/10 text-brand-400 font-medium'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && <span className="w-1 h-1 rounded-full bg-brand-400 flex-shrink-0" />}
                        {page.frontmatter.title}
                      </span>
                      {page.frontmatter.status && page.frontmatter.status !== 'stable' && (
                        statusBadges[page.frontmatter.status as keyof typeof statusBadges]
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ))}
    </nav>
  )
}
