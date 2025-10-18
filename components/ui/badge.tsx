import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-foreground/70 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>svg]:size-3 [&>svg]:shrink-0 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default:
          'border-white/20 bg-white/18 text-foreground/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45',
        secondary:
          'border-white/15 bg-white/12 text-foreground/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/40',
        destructive:
          'border-transparent bg-destructive/80 text-destructive-foreground shadow-[0_16px_40px_-28px_rgba(239,68,68,0.55)] focus-visible:ring-destructive/40 dark:bg-destructive/70',
        outline:
          'border-white/30 bg-transparent text-foreground/75 backdrop-blur-xl dark:border-white/15',
        glass:
          'border-white/30 bg-white/25 text-foreground/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55',
        ghost:
          'border-transparent bg-transparent text-foreground/60 hover:bg-white/15 hover:text-foreground focus-visible:ring-white/25 dark:hover:bg-slate-950/55',
      },
      tone: {
        neutral: '',
        success: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
        info: 'bg-blue-500/20 text-blue-700 dark:text-blue-300',
        warning: 'bg-amber-400/25 text-amber-700 dark:text-amber-200',
      },
    },
    compoundVariants: [
      {
        variant: 'ghost',
        tone: 'neutral',
        className: 'hover:-translate-y-[1px]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      tone: 'neutral',
    },
  },
)

function Badge({
  className,
  variant,
  tone,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, tone }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
