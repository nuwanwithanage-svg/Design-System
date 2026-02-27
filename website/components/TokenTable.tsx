'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface TokenRow {
  name: string
  value: string
  description?: string
  preview?: boolean
}

interface TokenTableProps {
  tokens: TokenRow[]
  showPreview?: boolean
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      className="ml-1 opacity-0 group-hover/row:opacity-100 p-0.5 rounded hover:bg-zinc-700 transition-all"
      aria-label={`Copy ${text}`}
    >
      {copied ? <Check size={11} className="text-brand-400" /> : <Copy size={11} className="text-zinc-500" />}
    </button>
  )
}

function isColor(value: string) {
  return value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')
}

export function TokenTable({ tokens = [], showPreview = true }: TokenTableProps) {
  if (!tokens || !Array.isArray(tokens)) {
    return <div className="text-zinc-500 text-sm my-4">No tokens provided.</div>
  }
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-900 border-b border-zinc-800">
            <th className="text-left px-4 py-3 font-medium text-zinc-400 w-1/3">Token</th>
            <th className="text-left px-4 py-3 font-medium text-zinc-400">Value</th>
            <th className="text-left px-4 py-3 font-medium text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {tokens.map(tok => (
            <tr key={tok.name} className="group/row hover:bg-zinc-900/40 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <code className="text-brand-300 font-mono text-xs">{tok.name}</code>
                  <CopyButton text={tok.name} />
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {showPreview && isColor(tok.value) && (
                    <span
                      className="w-4 h-4 rounded border border-zinc-700 flex-shrink-0"
                      style={{ backgroundColor: tok.value }}
                    />
                  )}
                  <code className="text-zinc-300 font-mono text-xs">{tok.value}</code>
                </div>
              </td>
              <td className="px-4 py-3 text-zinc-500 text-xs">{tok.description ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
