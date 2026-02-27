'use client'
import { useState } from 'react'
import { SidebarNav } from './SidebarNav'
import { OnThisPage } from './OnThisPage'
import { AppHeader } from './AppHeader'
import { MobileSidebar } from './MobileSidebar'
import type { DocGroup } from '@/lib/docs'
import type { TocEntry } from '@/lib/toc'

interface DocLayoutProps {
  groups: DocGroup[]
  toc: TocEntry[]
  children: React.ReactNode
  frontmatter?: { title: string; description?: string; status?: string }
  breadcrumbs?: { label: string; href?: string }[]
  editPath?: string
  prevPage?: { title: string; href: string }
  nextPage?: { title: string; href: string }
}

export function DocLayout({
  groups, toc, children, frontmatter, breadcrumbs, editPath, prevPage, nextPage
}: DocLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-950">
      <AppHeader onMobileMenuToggle={() => setMobileOpen(o => !o)} mobileMenuOpen={mobileOpen} />
      <MobileSidebar groups={groups} open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block fixed top-14 left-0 bottom-0 w-64 border-r border-zinc-800 bg-zinc-950 overflow-y-auto z-40">
          <SidebarNav groups={groups} />
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64 min-w-0">
          <div className="flex">
            {/* Content area */}
            <article className="flex-1 min-w-0 px-6 md:px-10 py-10 max-w-3xl mx-auto xl:mx-0">
              {/* Breadcrumbs */}
              {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6" aria-label="Breadcrumb">
                  {breadcrumbs.map((crumb, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      {i > 0 && <span>/</span>}
                      {crumb.href
                        ? <a href={crumb.href} className="hover:text-zinc-300 transition-colors">{crumb.label}</a>
                        : <span className="text-zinc-400">{crumb.label}</span>
                      }
                    </span>
                  ))}
                </nav>
              )}

              {/* Page header */}
              {frontmatter && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-zinc-50">{frontmatter.title}</h1>
                    {frontmatter.status && frontmatter.status !== 'stable' && (
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${
                        frontmatter.status === 'beta'
                          ? 'bg-brand-900/30 text-brand-400 border-brand-800'
                          : 'bg-red-900/30 text-red-400 border-red-800/50'
                      }`}>
                        {frontmatter.status}
                      </span>
                    )}
                  </div>
                  {frontmatter.description && (
                    <p className="text-lg text-zinc-400 leading-relaxed">{frontmatter.description}</p>
                  )}
                </div>
              )}

              {/* MDX content */}
              <div className="prose-content">
                {children}
              </div>

              {/* Bottom nav */}
              {(prevPage || nextPage) && (
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
                  {prevPage ? (
                    <a href={prevPage.href} className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors">
                      <span className="text-lg">←</span>
                      <span>
                        <div className="text-xs text-zinc-600 group-hover:text-zinc-500 transition-colors">Previous</div>
                        <div className="text-sm font-medium">{prevPage.title}</div>
                      </span>
                    </a>
                  ) : <div />}
                  {nextPage ? (
                    <a href={nextPage.href} className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-right">
                      <span>
                        <div className="text-xs text-zinc-600 group-hover:text-zinc-500 transition-colors">Next</div>
                        <div className="text-sm font-medium">{nextPage.title}</div>
                      </span>
                      <span className="text-lg">→</span>
                    </a>
                  ) : <div />}
                </div>
              )}

              {/* Edit on GitHub */}
              {editPath && (
                <div className="mt-6 text-right">
                  <a
                    href={`https://github.com/nuwanwithanage-svg/Design-System/edit/main/website/${editPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors inline-flex items-center gap-1"
                  >
                    Edit this page on GitHub ↗
                  </a>
                </div>
              )}
            </article>

            {/* Right TOC */}
            {toc.length > 0 && (
              <aside className="hidden xl:block w-56 flex-shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto pt-10 pr-6 pl-4">
                <OnThisPage toc={toc} />
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
