export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans antialiased">
      {children}
    </div>
  )
}
