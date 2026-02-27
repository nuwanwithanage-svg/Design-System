import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'info' | 'warning' | 'success' | 'error'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const variants = {
  info:    { icon: Info,          bg: 'bg-blue-950/40',   border: 'border-blue-800/50',   text: 'text-blue-300',   title: 'text-blue-200' },
  warning: { icon: AlertTriangle, bg: 'bg-yellow-950/40', border: 'border-yellow-800/50', text: 'text-yellow-300', title: 'text-yellow-200' },
  success: { icon: CheckCircle,   bg: 'bg-emerald-950/40',border: 'border-emerald-800/50',text: 'text-emerald-300',title: 'text-emerald-200' },
  error:   { icon: XCircle,       bg: 'bg-red-950/40',    border: 'border-red-800/50',    text: 'text-red-300',    title: 'text-red-200' },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const v = variants[type]
  const Icon = v.icon
  return (
    <div className={cn('my-6 rounded-lg border p-4', v.bg, v.border)}>
      <div className="flex gap-3">
        <Icon size={16} className={cn('flex-shrink-0 mt-0.5', v.text)} />
        <div>
          {title && <p className={cn('font-semibold text-sm mb-1', v.title)}>{title}</p>}
          <div className={cn('text-sm leading-relaxed', v.text)}>{children}</div>
        </div>
      </div>
    </div>
  )
}
