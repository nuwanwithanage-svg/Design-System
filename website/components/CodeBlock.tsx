'use client'
import { useState, useRef } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  children: React.ReactNode
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const copy = async () => {
    try {
      const text = preRef.current?.textContent ?? ''
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative group my-6 rounded-lg border border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <><Check size={12} className="text-brand-400" /> Copied</>
          ) : (
            <><Copy size={12} /> Copy</>
          )}
        </button>
      </div>
      <pre ref={preRef} className="bg-zinc-950 p-4 text-sm overflow-x-auto">
        {children}
      </pre>
    </div>
  )
}
