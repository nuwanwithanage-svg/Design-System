import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { TokenTable } from './TokenTable'
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-bold text-zinc-50 mb-4 mt-8 first:mt-0" {...props}>{children}</h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="text-xl font-semibold text-zinc-100 mb-3 mt-10 pb-2 border-b border-zinc-800 scroll-mt-20" {...props}>{children}</h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3 id={id} className="text-lg font-semibold text-zinc-100 mb-2 mt-8 scroll-mt-20" {...props}>{children}</h3>
  ),
  p: ({ children }) => <p className="text-zinc-300 leading-7 mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-zinc-300">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-zinc-300">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  a: ({ children, href }) => <a href={href} className="text-brand-400 hover:text-brand-300 underline underline-offset-4 transition-colors">{children}</a>,
  strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
  code: ({ children, className }) => {
    // If it has a language class, it's inside a pre block - render as-is
    if (className) {
      return <code className={className}>{children}</code>
    }
    return <code className="bg-zinc-800 text-brand-300 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
  },
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand-400 pl-4 my-4 text-zinc-400 italic">{children}</blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-zinc-900 border-b border-zinc-700">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-zinc-800">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-zinc-900/50 transition-colors">{children}</tr>,
  th: ({ children }) => <th className="text-left px-4 py-3 font-medium text-zinc-300">{children}</th>,
  td: ({ children }) => <td className="px-4 py-3 text-zinc-400">{children}</td>,
  hr: () => <hr className="border-zinc-800 my-8" />,
  Callout,
  TokenTable,
}
