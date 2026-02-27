'use client'
import { useState } from 'react'
import { Monitor, Code } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComponentPreviewProps {
  preview: React.ReactNode
  code: string
  language?: string
}

export function ComponentPreview({ preview, code, language = 'tsx' }: ComponentPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-lg border border-zinc-800 overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3">
        <div className="flex">
          {(['preview', 'code'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors capitalize',
                tab === t
                  ? 'border-brand-400 text-brand-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              )}
            >
              {t === 'preview' ? <Monitor size={12} /> : <Code size={12} />}
              {t}
            </button>
          ))}
        </div>
        {tab === 'code' && (
          <button
            onClick={copy}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {/* Content */}
      {tab === 'preview' ? (
        <div className="p-8 bg-zinc-950 flex items-center justify-center min-h-[120px]">
          {preview}
        </div>
      ) : (
        <pre className="bg-zinc-950 p-4 text-xs overflow-x-auto">
          <code className="text-zinc-300 font-mono">{code}</code>
        </pre>
      )}
    </div>
  )
}
