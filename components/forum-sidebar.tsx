"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import { useCategoriesStore } from "@/lib/categories"
import { useAuthStore } from "@/lib/auth"

const featuredUsers = [
  { name: "yuzu", avatar: "/user-yuzu.jpg", id: "1" },
  { name: "David", avatar: "/user-david.jpg", id: "2" },
  { name: "toboo913", avatar: "/user-toboo.jpg", id: "3" },
  { name: "Si", avatar: "/user-si.jpg", id: "4" },
]

const iconMap: Record<string, () => JSX.Element> = {
  daily: Icons.Home,
  tech: Icons.Code,
  info: Icons.Info,
  review: Icons.StarHalf,
  trade: Icons.ShoppingCart,
  carpool: Icons.Car,
  promotion: Icons.Megaphone,
  life: Icons.Coffee,
  dev: Icons.Laptop,
}

export function ForumSidebar() {
  const { categories } = useCategoriesStore()
  const { user, updateUser } = useAuthStore()
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  const handleCheckIn = () => {
    if (!user || isCheckedIn) return

    const updatedUser = {
      ...user,
      drumsticks: (user.drumsticks || 0) + 5,
    }

    updateUser(updatedUser)
    setIsCheckedIn(true)
  }

  return (
    <aside className="space-y-5">
      <section className="glass-panel relative overflow-hidden rounded-[32px] border border-white/25 bg-white/75 px-6 py-6 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-950/60">
        <span className="pointer-events-none absolute -left-16 top-12 h-44 w-44 rounded-full bg-primary/15 blur-3xl dark:bg-primary/25" />
        <span className="pointer-events-none absolute -right-20 -bottom-10 h-48 w-48 rounded-full bg-emerald-400/15 blur-[110px] dark:bg-emerald-400/25" />
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/70">探索</p>
            <h2 className="mt-1 text-lg font-semibold text-foreground">分类导航</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/20 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30 hover:text-foreground dark:border-white/10 dark:bg-white/10"
          >
            <Link href="/categories">
              <Icons.Grid3X3 className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="space-y-2">
          {categories.slice(0, 7).map((category) => {
            const IconComponent = iconMap[category.slug] || Icons.Home

            return (
              <Button
                key={category.slug}
                variant="ghost"
                asChild
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-foreground/80 shadow-inner transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <Link href={`/t/${category.slug}`} className="flex w-full items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-primary dark:bg-white/10">
                      <IconComponent className="h-4 w-4" />
                    </span>
                    {category.name}
                  </span>
                  <Badge className="rounded-full border border-white/25 bg-white/25 px-2.5 py-1 text-[11px] font-semibold text-foreground/70 dark:border-white/10 dark:bg-white/15">
                    {category.postCount}
                  </Badge>
                </Link>
              </Button>
            )
          })}
        </div>
        <Button
          variant="ghost"
          asChild
          className="mt-5 w-full justify-center rounded-full border border-white/15 bg-white/15 py-3 text-sm font-semibold text-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/25 hover:text-foreground dark:border-white/10 dark:bg-white/10"
        >
          <Link href="/categories">查看所有分类</Link>
        </Button>
      </section>

      <section className="glass-panel relative overflow-hidden rounded-[32px] border border-white/25 bg-white/75 px-6 py-6 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-950/60">
        <span className="pointer-events-none absolute -left-14 top-0 h-44 w-44 rounded-full bg-fuchsia-400/15 blur-[100px] dark:bg-fuchsia-500/25" />
        <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icons.Zap className="h-4 w-4 text-primary" />
          快捷功能区
        </div>
        <Button
          variant="ghost"
          className={`h-12 w-full justify-center gap-3 rounded-2xl border px-4 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
            isCheckedIn
              ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-700 shadow-[0_22px_80px_-45px_rgba(16,185,129,0.45)] dark:border-emerald-400/40 dark:bg-emerald-500/20 dark:text-emerald-200"
              : "border-white/15 bg-white/15 text-foreground/85 hover:bg-white/25 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
          }`}
          onClick={handleCheckIn}
          disabled={!user || isCheckedIn}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              isCheckedIn
                ? "bg-emerald-500/20 text-emerald-200"
                : "bg-white/25 text-emerald-500 dark:bg-white/10"
            }`}
          >
            <Icons.Star className="h-4 w-4" />
          </span>
          {isCheckedIn ? "签到成功 🍗+5" : "立即签到"}
        </Button>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            className="group h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/20 text-xs font-semibold text-foreground/75 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white/30 hover:text-foreground dark:border-white/10 dark:bg-white/10"
          >
            <Icons.Users className="h-5 w-5 text-sky-500 transition-transform duration-200 group-hover:scale-110" />
            管理记录
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="group h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/20 text-xs font-semibold text-foreground/75 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white/30 hover:text-foreground dark:border-white/10 dark:bg-white/10"
          >
            <Icons.Gift className="h-5 w-5 text-rose-500 transition-transform duration-200 group-hover:scale-110" />
            幸运抽奖
          </Button>
        </div>
      </section>

      <section className="glass-card relative overflow-hidden rounded-[32px] border border-white/25 bg-white/75 px-6 py-6 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-950/60">
        <span className="pointer-events-none absolute -left-16 top-12 h-44 w-44 rounded-full bg-primary/15 blur-3xl dark:bg-primary/30" />
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">社区欢迎</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">欢迎新用户</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {featuredUsers.map((user) => (
            <Link
              key={user.name}
              href={`/user/${user.id}`}
              className="group flex flex-col items-center gap-1 rounded-xl bg-white/10 p-2 text-center transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 dark:bg-white/10"
            >
              <Avatar className="h-12 w-12 border border-white/30 bg-white/30 shadow-inner transition-transform duration-200 group-hover:scale-105 dark:border-white/10 dark:bg-white/10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-xs font-semibold uppercase text-foreground">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate text-xs font-medium text-foreground/80 group-hover:text-foreground">
                {user.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-card relative overflow-hidden rounded-[32px] border border-white/25 bg-white/75 px-6 py-6 text-center shadow-[0_32px_120px_-60px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-950/60">
        <span className="pointer-events-none absolute -right-14 top-0 h-40 w-40 rounded-full bg-primary/15 blur-[100px] dark:bg-primary/30" />
        <div className="flex flex-col items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70 dark:border-white/10 dark:bg-white/10">
            <Icons.Users className="h-3.5 w-3.5 text-primary" />
            今日活跃
          </span>
          <p className="text-3xl font-semibold tracking-tight text-foreground">39031</p>
          <p className="text-xs text-muted-foreground">
            今日论坛共有 <span className="font-semibold text-foreground">39031</span> 位 seeker 正在参与讨论
          </p>
        </div>
      </section>
    </aside>
  )
}
