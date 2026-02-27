export function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
        <div>
          <span className="font-semibold text-zinc-400">Design System</span> — Built with Next.js + Tailwind
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/nuwanwithanage-svg/Design-System" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">GitHub</a>
          <a href="/docs/getting-started/introduction" className="hover:text-zinc-400 transition-colors">Docs</a>
        </div>
      </div>
    </footer>
  )
}
