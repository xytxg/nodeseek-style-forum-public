'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-2.5 w-full overflow-hidden rounded-full border border-white/20 bg-white/15 shadow-[inset_0_1px_2px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 translate-x-[-100%] bg-gradient-to-r from-primary/80 via-primary to-primary/60 shadow-[0_12px_40px_-24px_rgba(59,130,246,0.55)] transition-transform duration-300 ease-out will-change-transform dark:from-primary/70 dark:via-primary/80 dark:to-primary/60"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
