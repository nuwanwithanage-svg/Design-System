'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { SidebarNav } from './SidebarNav'
import type { DocGroup } from '@/lib/docs'

interface MobileSidebarProps {
  groups: DocGroup[]
  open: boolean
  onClose: () => void
}

export function MobileSidebar({ groups, open, onClose }: MobileSidebarProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-zinc-950 border-r border-zinc-800 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <span className="font-semibold text-zinc-100 text-sm">Design System</span>
          <button onClick={onClose} className="p-1 rounded hover:bg-zinc-800 text-zinc-400">
            <X size={16} />
          </button>
        </div>
        <SidebarNav groups={groups} />
      </div>
    </div>
  )
}
