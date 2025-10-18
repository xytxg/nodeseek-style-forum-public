'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'glass-surface inline-flex w-fit items-center gap-1 overflow-hidden rounded-2xl border border-white/20 bg-white/70 p-1.5 shadow-[0_20px_68px_-44px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/12 dark:bg-slate-950/50',
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex min-w-[4.75rem] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium tracking-tight text-foreground/70 outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=active]:text-foreground data-[state=active]:shadow-[0_22px_70px_-48px_rgba(15,23,42,0.6)] data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:-z-10 data-[state=active]:before:rounded-[0.9rem] data-[state=active]:before:border data-[state=active]:before:border-white/40 data-[state=active]:before:bg-gradient-to-br data-[state=active]:before:from-white/90 data-[state=active]:before:to-white/65 data-[state=active]:before:shadow-[0_18px_60px_-42px_rgba(15,23,42,0.65)] dark:text-foreground/60 dark:data-[state=active]:before:border-white/15 dark:data-[state=active]:before:from-slate-950/75 dark:data-[state=active]:before:to-slate-950/55",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
