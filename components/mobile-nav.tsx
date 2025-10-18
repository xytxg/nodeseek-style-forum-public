"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import Link from "next/link"

const navigationItems = [
  { name: "首页", href: "/", icon: Icons.Home },
  { name: "日常", href: "/t/daily", icon: Icons.Home },
  { name: "技术", href: "/t/tech", icon: Icons.Code },
  { name: "信息", href: "/t/info", icon: Icons.Info },
  { name: "测评", href: "/t/review", icon: Icons.TestTube },
  { name: "交易", href: "/t/trade", icon: Icons.ShoppingCart },
  { name: "拼车", href: "/t/carpool", icon: Icons.Car },
  { name: "推广", href: "/t/promotion", icon: Icons.Megaphone },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-foreground/70 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground dark:border-white/10 dark:bg-white/5 md:hidden"
        >
          <Icons.Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="glass-panel w-[min(90vw,320px)] gap-0 border-white/25 px-0 py-0 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)] backdrop-blur-xl"
      >
        <div className="relative flex h-full flex-col gap-6 overflow-y-auto px-6 pb-12 pt-14">
          <span className="pointer-events-none absolute -left-12 top-24 h-40 w-40 rounded-full bg-primary/15 blur-3xl dark:bg-primary/25" />
          <span className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-fuchsia-400/15 blur-[90px] dark:bg-fuchsia-500/20" />

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/85 to-primary/60 text-primary-foreground shadow-[0_20px_60px_-32px_rgba(37,99,235,0.6)]">
              <Icons.Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">NotSeek</p>
              <p className="text-xl font-semibold text-foreground">TechForum</p>
            </div>
          </div>

          <nav className="space-y-2 pt-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:text-foreground dark:border-white/10 dark:bg-white/5"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-primary group-hover:scale-105 group-hover:text-primary/90 dark:bg-white/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    {item.name}
                  </span>
                  <Icons.ArrowRight className="h-4 w-4 text-muted-foreground/70 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </Link>
              )
            })}
          </nav>

          <div className="glass-card relative mt-2 space-y-3 rounded-2xl border border-white/20 bg-white/70 px-4 py-5 shadow-inner dark:border-white/10 dark:bg-white/10">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Icons.Zap className="h-4 w-4 text-primary" />
              快捷功能
            </div>
            <div className="grid gap-2">
              <Button
                type="button"
                variant="ghost"
                className="h-11 justify-start gap-3 rounded-2xl border border-white/10 bg-white/20 px-4 text-sm font-medium text-foreground/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30 hover:text-foreground dark:border-white/10 dark:bg-white/10"
              >
                <Icons.Plus className="h-4 w-4 text-primary" />
                发布新话题
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-11 justify-start gap-3 rounded-2xl border border-white/10 bg-white/20 px-4 text-sm font-medium text-foreground/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30 hover:text-foreground dark:border-white/10 dark:bg-white/10"
              >
                <Icons.Heart className="h-4 w-4 text-rose-500" />
                我的收藏
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-11 justify-start gap-3 rounded-2xl border border-white/10 bg-white/20 px-4 text-sm font-medium text-foreground/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30 hover:text-foreground dark:border-white/10 dark:bg-white/10"
              >
                <Icons.Bell className="h-4 w-4 text-amber-500" />
                消息通知
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
