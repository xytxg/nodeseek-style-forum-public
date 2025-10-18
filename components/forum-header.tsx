"use client"

import type React from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { MobileNav } from "@/components/mobile-nav"
import { useAuth } from "@/lib/auth"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

const navigationItems = [
  { name: "日常", href: "/t/daily" },
  { name: "技术", href: "/t/tech" },
  { name: "信息", href: "/t/info" },
  { name: "测评", href: "/t/review" },
  { name: "交易", href: "/t/trade" },
  { name: "拼车", href: "/t/carpool" },
  { name: "推广", href: "/t/promotion" },
]

export function ForumHeader() {
  const { user, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm("")
    }
  }

  return (
    <header className="sticky top-0 z-50 mx-auto w-full px-4 pt-4">
      <div className="container mx-auto">
        <div className="glass-surface relative flex items-center gap-3 rounded-[32px] border px-4 py-3 shadow-[0_22px_80px_-52px_rgba(15,23,42,0.55)] transition-all duration-300 sm:px-6">
          <span className="pointer-events-none absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-primary/25" />
          <span className="pointer-events-none absolute -right-28 top-0 h-60 w-60 rounded-full bg-emerald-400/15 blur-[110px] dark:bg-emerald-400/25" />

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <MobileNav />
            <Link href="/" className="group flex items-center gap-3 rounded-full px-2 py-1 transition-all duration-200 hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary/85 to-primary/60 text-primary-foreground shadow-[0_16px_40px_-20px_rgba(37,99,235,0.6)] transition-transform duration-200 group-hover:scale-110">
                <Icons.Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-foreground/70">
                  NotSeek
                </span>
                <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  TechForum
                </span>
              </div>
            </Link>
            <nav className="hidden items-center gap-1.5 rounded-full bg-white/10 p-1 text-sm dark:bg-white/5 md:flex lg:gap-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-all hover:bg-white/20 hover:text-foreground dark:hover:bg-white/10"
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3 md:gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-foreground/70 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground dark:border-white/10 dark:bg-white/5 sm:hidden"
              onClick={() => router.push("/search")}
              aria-label="打开搜索"
            >
              <Icons.Search className="h-5 w-5" />
            </Button>

            <form
              onSubmit={handleSearch}
              className="group relative hidden min-w-[220px] flex-1 items-center sm:flex md:max-w-sm lg:max-w-md"
            >
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70">
                <Icons.Search className="h-4 w-4" />
              </span>
              <Input
                placeholder="搜索话题、创作者或关键字…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full rounded-full border-white/30 bg-white/60 pl-11 pr-24 text-sm shadow-inner transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-primary/40 focus:bg-white/80 focus:shadow-[0_24px_90px_-55px_rgba(37,99,235,0.45)] dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/60 dark:focus:bg-white/15"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 hidden h-8 rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 group-focus-within:flex lg:flex"
              >
                搜索
              </Button>
            </form>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-foreground/80 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground dark:border-white/10 dark:bg-white/5"
                  aria-label="通知"
                >
                  <Icons.Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 shadow-[0_0_0_2px_rgba(255,255,255,0.8)] dark:shadow-[0_0_0_2px_rgba(15,23,42,0.9)]" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 p-0 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"
                    >
                      <Avatar className="h-9 w-9 border border-white/30 bg-white/30 shadow-inner dark:border-white/10 dark:bg-white/10">
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback className="bg-white/40 text-sm font-semibold uppercase text-foreground dark:bg-white/10">
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    forceMount
                    sideOffset={12}
                    className="glass-popover w-72 rounded-3xl border border-white/25 p-3 shadow-[0_28px_100px_-48px_rgba(15,23,42,0.55)] backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3 dark:bg-white/5">
                      <Avatar className="h-10 w-10 border border-white/30 bg-white/30 shadow-inner dark:border-white/10 dark:bg-white/10">
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback className="bg-white/40 text-sm font-semibold uppercase text-foreground dark:bg-white/10">
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 space-y-0.5">
                        <p className="truncate text-sm font-semibold leading-tight text-foreground">{user.username}</p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="glass-divider my-2" />
                    <DropdownMenuItem
                      asChild
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground dark:hover:bg-white/10"
                    >
                      <Link href="/dashboard">
                        <Icons.BarChart3 className="h-4 w-4" />
                        <span>仪表盘</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground dark:hover:bg-white/10"
                    >
                      <Link href={`/user/${user.id}`}>
                        <Icons.User className="h-4 w-4" />
                        <span>个人资料</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground dark:hover:bg-white/10"
                    >
                      <Link href="/settings">
                        <Icons.Settings className="h-4 w-4" />
                        <span>设置</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="glass-divider my-2" />
                    <DropdownMenuItem
                      variant="destructive"
                      className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-colors hover:bg-destructive/15 focus:bg-destructive/15 dark:hover:bg-destructive/20"
                      onClick={logout}
                    >
                      <Icons.LogOut className="h-4 w-4" />
                      <span>登出</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <AuthDialog defaultMode="login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 rounded-full border border-white/25 bg-white/10 px-5 text-sm font-semibold text-foreground/80 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:text-foreground dark:border-white/10 dark:bg-white/5"
                  >
                    登录
                  </Button>
                </AuthDialog>
                <AuthDialog defaultMode="register">
                  <Button className="h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_20px_70px_-45px_rgba(37,99,235,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90">
                    注册
                  </Button>
                </AuthDialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
