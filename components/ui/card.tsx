import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const cardVariants = cva(
  'group/card glass-card relative flex flex-col gap-3 rounded-2xl border border-white/25 p-6 shadow-[0_28px_120px_-68px_rgba(15,23,42,0.65)] transition-all duration-300 ease-out backdrop-blur-xl dark:border-white/12',
  {
    variants: {
      variant: {
        surface:
          'bg-white/85 text-foreground/90 hover:shadow-[0_30px_120px_-60px_rgba(15,23,42,0.68)] dark:bg-slate-950/65 dark:text-foreground',
        glass:
          'glass-card text-foreground/90 hover:shadow-[0_36px_140px_-70px_rgba(15,23,42,0.7)]',
        elevated:
          'glass-panel text-foreground/90 shadow-[0_32px_120px_-64px_rgba(15,23,42,0.78)] hover:shadow-[0_42px_160px_-72px_rgba(15,23,42,0.82)]',
      },
      interactive: {
        true: 'hover:-translate-y-1 focus-within:-translate-y-1 focus-within:ring-2 focus-within:ring-white/35 focus-within:ring-offset-2 focus-within:ring-offset-transparent',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'glass',
      interactive: false,
    },
  },
)

function Card({
  className,
  variant,
  interactive,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header flex flex-col gap-1 rounded-xl bg-white/14 px-5 py-4 text-left transition-colors duration-300 dark:bg-slate-950/35',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-lg font-semibold tracking-tight text-foreground', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground/90', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('flex flex-col gap-3 px-5 py-4 text-sm text-foreground/90', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex flex-col gap-2 px-5 pb-4 pt-2 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
