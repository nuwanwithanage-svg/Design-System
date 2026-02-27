'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultIndex?: number
}

export function Tabs({ tabs, defaultIndex = 0 }: TabsProps) {
  const [active, setActive] = useState(defaultIndex)

  return (
    <div className="my-6">
      <div className="flex border-b border-zinc-800">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
              active === i
                ? 'border-brand-400 text-brand-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {tabs[active]?.content}
      </div>
    </div>
  )
}
