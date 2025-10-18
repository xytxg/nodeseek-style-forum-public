"use client"

import Link from "next/link"
import { useState } from "react"

import { ForumHeader } from "@/components/forum-header"
import { ForumSidebar } from "@/components/forum-sidebar"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCategoriesStore } from "@/lib/categories"

export default function CategoriesPage() {
  const { categories } = useCategoriesStore()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPosts = categories.reduce((sum, cat) => sum + cat.postCount, 0)
  const totalMembers = categories.reduce((sum, cat) => sum + cat.memberCount, 0)
  const todayPosts = categories.reduce((sum, cat) => sum + cat.todayPostCount, 0)

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.26),_transparent_60%)]" />

      <ForumHeader />

      <div className="container relative mx-auto px-4 pb-16 pt-8 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <ForumSidebar />
          </aside>

          <main className="space-y-10">
            <section className="relative overflow-hidden rounded-[40px] border border-white/35 bg-white/80 px-7 py-9 shadow-[0_35px_120px_-65px_rgba(15,23,42,0.65)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 sm:px-10 sm:py-12">
              <span className="absolute -left-20 top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30" />
              <span className="absolute right-10 top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl dark:bg-emerald-400/25" />

              <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-6 lg:max-w-xl xl:max-w-2xl">
                  <Badge className="w-fit rounded-full border-white/40 bg-white/75 px-3 py-1 text-[11px] font-semibold tracking-[0.25em] text-primary/80 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                    分类导航
                  </Badge>
                  <div className="space-y-4">
                    <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                      查找你感兴趣的分类，结识志同道合的伙伴
                    </h1>
                    <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                      从日常、技术到专题活动，我们为你准备了丰富的内容板块。使用搜索快速定位，也可以浏览精选统计发现热门去处。
                    </p>
                  </div>

                  <div className="relative mt-6 max-w-xl">
                    <Icons.Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="搜索分类或描述..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12 rounded-full border-white/40 bg-white/70 pl-12 pr-6 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40 focus-visible:ring-primary/20 dark:border-white/10 dark:bg-slate-900/70"
                    />
                  </div>
                </div>

                <div className="grid w-full gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-white/45 bg-white/75 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70 dark:bg-primary/20">
                        总话题数
                      </span>
                      <Icons.MessageSquare className="h-4 w-4 text-primary/70" />
                    </div>
                    <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">{totalPosts.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">覆盖所有板块的讨论数量</p>
                  </div>

                  <div className="rounded-[28px] border border-white/45 bg-white/75 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                        活跃成员
                      </span>
                      <Icons.Users className="h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                    </div>
                    <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">{totalMembers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">组成社区的优质贡献者</p>
                  </div>

                  <div className="rounded-[28px] border border-white/45 bg-white/75 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-600 dark:text-fuchsia-300">
                        今日新增
                      </span>
                      <Icons.TrendingUp className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-300" />
                    </div>
                    <div className="mt-5 flex flex-wrap items-baseline gap-4">
                      <p className="text-3xl font-semibold tracking-tight text-foreground">{todayPosts.toLocaleString()}</p>
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm dark:bg-white/10">
                        24 小时内新增的讨论
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">持续关注热门板块，掌握一手热议方向</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">全部分类</h2>
                  <p className="text-sm text-muted-foreground">根据兴趣发现新话题，加入或关注感兴趣的板块。</p>
                </div>
                <Link href="/">
                  <Button variant="ghost" className="rounded-full border border-transparent bg-white/60 px-5 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-primary/30 hover:text-primary dark:bg-slate-950/60">
                    返回首页
                    <Icons.ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {filteredCategories.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                  {filteredCategories.map((category) => (
                    <article
                      key={category.id}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] border border-white/35 bg-white/80 px-6 py-6 shadow-[0_30px_90px_-65px_rgba(15,23,42,0.65)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/70 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-2xl"
                    >
                      <div className="space-y-5">
                        <div className="flex items-start gap-4">
                          <div
                            className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl text-white shadow-inner ${category.color}`}
                          >
                            {category.icon}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                              {category.isActive && (
                                <Badge className="rounded-full border-white/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary/80 dark:border-white/10 dark:bg-primary/20">
                                  活跃
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground sm:text-sm">
                          <div className="rounded-2xl bg-white/70 px-3 py-2 shadow-inner backdrop-blur dark:bg-slate-900/70">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-primary/70">话题</p>
                            <p className="mt-1 text-base font-semibold text-foreground">{category.postCount}</p>
                          </div>
                          <div className="rounded-2xl bg-white/70 px-3 py-2 shadow-inner backdrop-blur dark:bg-slate-900/70">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-primary/70">成员</p>
                            <p className="mt-1 text-base font-semibold text-foreground">{category.memberCount}</p>
                          </div>
                          <div className="rounded-2xl bg-white/70 px-3 py-2 shadow-inner backdrop-blur dark:bg-slate-900/70">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-primary/70">今日</p>
                            <p className="mt-1 text-base font-semibold text-foreground">{category.todayPostCount}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-4 border-t border-white/40 pt-4 text-xs text-muted-foreground dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm">
                          版主: <span className="text-foreground">{category.moderators.join(", ")}</span>
                        </p>
                        <Link href={`/t/${category.slug}`} className="w-full sm:w-auto">
                          <Button className="w-full rounded-full px-4 py-2 text-sm font-medium shadow-md motion-safe:hover:-translate-y-0.5">
                            进入分类
                            <Icons.ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[32px] border border-dashed border-primary/30 bg-white/75 px-6 py-16 text-center shadow-xl backdrop-blur dark:border-primary/40 dark:bg-slate-950/70">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <Icons.Search className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">没有找到匹配的分类</h3>
                    <p className="text-sm text-muted-foreground">换个关键词试试，或者浏览下方推荐分类。</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm("")}
                    className="rounded-full border-white/50 bg-white/70 px-5 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-900/60"
                  >
                    清除搜索
                  </Button>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
