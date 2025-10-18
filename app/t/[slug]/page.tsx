"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

import { AuthDialog } from "@/components/auth/auth-dialog"
import { ForumHeader } from "@/components/forum-header"
import { ForumSidebar } from "@/components/forum-sidebar"
import { PostCard } from "@/components/post-card"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { useCategoriesStore } from "@/lib/categories"
import { usePostsStore } from "@/lib/posts"

export default function TopicPage() {
  const params = useParams()
  const { getCategory } = useCategoriesStore()
  const { getPostsByTopic } = usePostsStore()
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  const slug = params.slug as string
  const category = getCategory(slug)
  const allPosts = getPostsByTopic(slug)

  const totalPages = Math.ceil(allPosts.length / postsPerPage) || 1
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = allPosts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!category) {
    return (
      <div className="relative min-h-screen bg-background">
        <ForumHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl rounded-[32px] border border-dashed border-primary/30 bg-white/80 px-8 py-16 text-center shadow-[0_35px_120px_-65px_rgba(37,99,235,0.45)] backdrop-blur-xl dark:border-primary/40 dark:bg-slate-950/70">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
              <Icons.Search className="h-6 w-6" />
            </div>
            <h1 className="mt-6 text-2xl font-semibold text-foreground">分类不存在或已被移除</h1>
            <p className="mt-3 text-sm text-muted-foreground">您访问的分类可能不存在或已被删除，请返回分类列表浏览其他内容。</p>
            <div className="mt-6 flex justify-center">
              <Link href="/categories">
                <Button className="rounded-full px-6 py-2">
                  浏览所有分类
                  <Icons.ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
              <Link href="/" className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1 transition-colors hover:border-primary/30 hover:text-primary">
                首页
              </Link>
              <span>/</span>
              <Link href="/categories" className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1 transition-colors hover:border-primary/30 hover:text-primary">
                分类
              </Link>
              <span>/</span>
              <span className="rounded-full border border-white/40 bg-white/70 px-3 py-1 text-foreground shadow-sm dark:border-white/10 dark:bg-slate-950/60">
                {category.name}
              </span>
            </div>

            <section className="relative overflow-hidden rounded-[40px] border border-white/35 bg-white/80 px-7 py-8 shadow-[0_35px_120px_-65px_rgba(15,23,42,0.6)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 sm:px-10 sm:py-10">
              <span className="absolute -left-16 top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30" />
              <span className="absolute right-12 top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl dark:bg-emerald-400/25" />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-1 flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-3xl text-3xl text-white shadow-inner ${category.color}`}>
                      {category.icon}
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{category.name}</h1>
                        {category.isActive && (
                          <Badge className="rounded-full border-white/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary/80 dark:border-white/10 dark:bg-primary/20">
                            活跃
                          </Badge>
                        )}
                      </div>
                      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-white/45 bg-white/75 px-5 py-4 text-sm shadow-inner backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-primary/70">话题</p>
                      <p className="mt-2 text-2xl font-semibold text-foreground">{category.postCount}</p>
                    </div>
                    <div className="rounded-2xl border border-white/45 bg-white/75 px-5 py-4 text-sm shadow-inner backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-primary/70">成员</p>
                      <p className="mt-2 text-2xl font-semibold text-foreground">{category.memberCount}</p>
                    </div>
                    <div className="rounded-2xl border border-white/45 bg-white/75 px-5 py-4 text-sm shadow-inner backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-primary/70">今日新增</p>
                      <p className="mt-2 text-2xl font-semibold text-foreground">{category.todayPostCount}</p>
                    </div>
                    <div className="rounded-2xl border border-white/45 bg-white/75 px-5 py-4 text-sm shadow-inner backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-primary/70">版主</p>
                      <p className="mt-2 text-2xl font-semibold text-foreground">{category.moderators.length}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                    <span className="rounded-full bg-white/70 px-3 py-1 font-medium text-muted-foreground shadow-sm dark:bg-slate-900/70">
                      版主: {category.moderators.join(", ")}
                    </span>
                    <Link
                      href="/categories"
                      className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-900/60"
                    >
                      <Icons.ArrowLeft className="h-3.5 w-3.5" /> 返回分类
                    </Link>
                  </div>
                </div>

                <div className="w-full rounded-[28px] border border-white/30 bg-white/75 px-6 py-5 shadow-inner backdrop-blur dark:border-white/10 dark:bg-slate-900/70 lg:max-w-sm">
                  <h2 className="text-base font-semibold text-foreground">分类规则</h2>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {category.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary/80 dark:bg-primary/20">
                          {index + 1}
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col gap-4 rounded-[32px] border border-white/30 bg-white/80 px-6 py-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-950/70 sm:px-8 sm:py-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">最新话题</h2>
                    <Badge className="rounded-full border-white/50 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary/80 dark:border-white/10 dark:bg-primary/20">
                      <Icons.TrendingUp className="mr-1 h-3.5 w-3.5" />
                      热门精选
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">来自 {category.name} 板块的即时讨论。</p>
                </div>

                {user ? (
                  <Link href={`/new-post?category=${slug}`}>
                    <Button size="sm" className="rounded-full px-4 py-2 shadow-md">
                      <Icons.Plus className="h-4 w-4" />
                      <span className="ml-2">发布话题</span>
                    </Button>
                  </Link>
                ) : (
                  <AuthDialog defaultMode="login">
                    <Button size="sm" className="rounded-full px-4 py-2 shadow-md">
                      <Icons.Plus className="h-4 w-4" />
                      <span className="ml-2">发布话题</span>
                    </Button>
                  </AuthDialog>
                )}
              </div>

              {posts.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-2 xl:gap-6">
                  {posts.map((post) => (
                    <div key={post.id} className="h-full">
                      <PostCard {...post} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[32px] border border-dashed border-primary/30 bg-white/80 px-6 py-16 text-center shadow-xl backdrop-blur dark:border-primary/40 dark:bg-slate-950/70">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <Icons.MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">这个分类还没有话题</h3>
                    <p className="text-sm text-muted-foreground">开启第一篇内容，让更多人参与讨论。</p>
                  </div>
                  {user ? (
                    <Link href={`/new-post?category=${slug}`}>
                      <Button className="rounded-full px-5 py-2">
                        <Icons.Plus className="h-4 w-4" />
                        <span className="ml-2">发布第一个话题</span>
                      </Button>
                    </Link>
                  ) : (
                    <AuthDialog defaultMode="login">
                      <Button className="rounded-full px-5 py-2">登录后发布话题</Button>
                    </AuthDialog>
                  )}
                </div>
              )}

              {totalPages > 1 && (
                <nav className="flex items-center justify-center">
                  <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/70 p-2 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="h-9 w-9 rounded-full text-muted-foreground transition motion-safe:hover:-translate-y-0.5 disabled:motion-safe:hover:translate-y-0"
                    >
                      <Icons.ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1
                        const isActive = page === currentPage
                        return (
                          <Button
                            key={page}
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={`h-9 w-9 rounded-full ${
                              isActive
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground transition motion-safe:hover:-translate-y-0.5"
                            }`}
                          >
                            {page}
                          </Button>
                        )
                      })}
                      {totalPages > 5 && (
                        <>
                          <span className="px-1 text-sm text-muted-foreground">...</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePageChange(totalPages)}
                            className="h-9 w-9 rounded-full text-muted-foreground transition motion-safe:hover:-translate-y-0.5"
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="h-9 w-9 rounded-full text-muted-foreground transition motion-safe:hover:-translate-y-0.5 disabled:motion-safe:hover:translate-y-0"
                    >
                      <Icons.ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </nav>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
