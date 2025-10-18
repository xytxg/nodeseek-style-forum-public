import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'glass-surface field-sizing-content min-h-28 w-full rounded-2xl border border-white/25 bg-white/75 px-3.5 py-3 text-sm text-foreground/90 placeholder:text-foreground/40 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.55)] backdrop-blur-xl transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background selection:bg-primary/25 selection:text-primary-foreground aria-[invalid=true]:border-destructive/50 aria-[invalid=true]:bg-destructive/5 aria-[invalid=true]:focus-visible:ring-destructive/35 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/12 dark:bg-slate-950/55 dark:text-foreground dark:placeholder:text-foreground/35 dark:focus-visible:ring-white/25 dark:aria-[invalid=true]:border-destructive/40 dark:aria-[invalid=true]:bg-destructive/10 dark:aria-[invalid=true]:focus-visible:ring-destructive/30',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
