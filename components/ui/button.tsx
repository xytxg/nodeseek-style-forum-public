import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent px-4 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 transform-gpu hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] shadow-none [@media(prefers-reduced-motion:reduce)]:transform-none [@media(prefers-reduced-motion:reduce)]:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.05rem]",
  {
    variants: {
      variant: {
        default:
          'bg-primary/95 text-primary-foreground shadow-[0_18px_50px_-26px_rgba(15,23,42,0.58)] hover:bg-primary focus-visible:ring-primary/40',
        destructive:
          'bg-destructive/90 text-destructive-foreground shadow-[0_18px_46px_-24px_rgba(239,68,68,0.62)] hover:bg-destructive focus-visible:ring-destructive/40 dark:bg-destructive/75 dark:focus-visible:ring-destructive/50',
        secondary:
          'bg-white/85 text-foreground/90 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.48)] hover:bg-white/90 focus-visible:ring-ring/40 dark:bg-slate-950/70 dark:text-foreground dark:hover:bg-slate-950/60',
        outline:
          'border-white/30 bg-transparent text-foreground/85 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.46)] backdrop-blur-xl hover:border-white/45 hover:bg-white/20 focus-visible:ring-white/35 dark:border-white/15 dark:text-foreground/90 dark:hover:bg-slate-950/50 dark:focus-visible:ring-white/25',
        ghost:
          'border-transparent bg-transparent text-foreground/75 shadow-none hover:bg-white/15 hover:text-foreground hover:shadow-[0_12px_36px_-28px_rgba(15,23,42,0.4)] focus-visible:ring-ring/40 dark:hover:bg-slate-950/45',
        link: 'border-none bg-transparent p-0 text-primary underline-offset-4 shadow-none hover:-translate-y-0 hover:translate-y-0 hover:underline focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent active:scale-100',
        soft:
          'bg-primary/12 text-primary shadow-[0_18px_46px_-28px_rgba(59,130,246,0.55)] hover:bg-primary/16 focus-visible:ring-primary/35',
        glass:
          'glass-surface border-white/30 text-foreground/90 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.55)] hover:border-white/45 hover:bg-white/85 focus-visible:ring-white/35 dark:border-white/12 dark:text-foreground dark:hover:bg-slate-950/60 dark:focus-visible:ring-white/25',
        glassGhost:
          'glass-surface border-transparent bg-transparent text-foreground/80 shadow-none hover:border-white/30 hover:bg-white/22 hover:shadow-[0_14px_40px_-28px_rgba(15,23,42,0.4)] focus-visible:ring-white/25 dark:hover:bg-slate-950/52',
      },
      size: {
        default: 'h-10 min-w-[2.5rem] has-[>svg]:px-3',
        sm: 'h-8 rounded-md px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-12 rounded-xl px-6 text-base has-[>svg]:px-4',
        icon: 'size-10 rounded-lg p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
