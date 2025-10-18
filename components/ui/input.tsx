import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'glass-surface h-10 w-full min-w-0 rounded-xl border border-white/25 bg-white/75 px-3.5 py-2 text-sm text-foreground/90 placeholder:text-foreground/40 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.55)] backdrop-blur-xl transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background selection:bg-primary/25 selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 file:inline-flex file:h-8 file:items-center file:justify-center file:rounded-lg file:border-0 file:bg-white/20 file:px-3 file:text-xs file:font-medium file:text-foreground/80 dark:border-white/12 dark:bg-slate-950/55 dark:text-foreground dark:placeholder:text-foreground/35 dark:focus-visible:ring-white/25',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
