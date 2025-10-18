"use client"

import Link from "next/link"
import { useState } from "react"

import { AuthDialog } from "@/components/auth/auth-dialog"
import { ForumHeader } from "@/components/forum-header"
import { ForumSidebar } from "@/components/forum-sidebar"
import { PostCard } from "@/components/post-card"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { usePostsStore } from "@/lib/posts"

const topicLabels: Record<string, string> = {
  daily: "日常",
  tech: "技术",
  info: "信息",
  review: "测评",
  trade: "交易",
  carpool: "拼车",
  promotion: "推广",
}

export default function HomePage() {
  const { posts } = usePostsStore()
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  const totalPages = Math.ceil(posts.length / postsPerPage) || 1
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  const highlightPost = posts[0]
  const totalReplies = posts.reduce((sum, post) => sum + post.replyCount, 0)
  const totalViews = posts.reduce((sum, post) => sum + post.viewCount, 0)
  const activeCreators = new Set(posts.map((post) => post.author.id)).size
  const highlightTopic = highlightPost ? topicLabels[highlightPost.topic] || highlightPost.topic : null

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.28),_transparent_65%)]" />

      <ForumHeader />

      <div className="container relative mx-auto px-4 pb-16 pt-8 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <ForumSidebar />
          </aside>

          <main className="space-y-10">
            <section className="relative overflow-hidden rounded-[40px] border border-white/40 bg-white/80 px-7 py-9 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.55)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 sm:px-10 sm:py-12">
              <span className="absolute -left-16 top-20 h-40 w-40 rounded-full bg-primary/15 blur-3xl dark:bg-primary/30" />
              <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl dark:bg-emerald-400/25" />

              <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
                <div className="space-y-6 lg:max-w-xl xl:max-w-2xl">
                  <Badge className="w-fit rounded-full border-white/40 bg-white/70 px-3 py-1 text-[11px] font-semibold tracking-[0.25em] text-primary/80 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                    社区焕新
                  </Badge>
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    与全球创作者共建前沿讨论，共享灵感与洞察
                  </h1>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    TechForum 以全新的视觉语言焕新登场，提供更沉浸的内容浏览体验。加入我们，与热爱的技术、产品与生活方式话题保持同频。
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {user ? (
                      <Link href="/new-post" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full rounded-full px-6 py-5 text-base shadow-lg">
                          <Icons.Plus className="h-4 w-4" />
                          <span className="ml-2">发布新话题</span>
                        </Button>
                      </Link>
                    ) : (
                      <AuthDialog defaultMode="login">
                        <Button size="lg" className="w-full rounded-full px-6 py-5 text-base shadow-lg sm:w-auto">
                          <Icons.Sparkles className="h-4 w-4" />
                          <span className="ml-2">登录加入讨论</span>
                        </Button>
                      </AuthDialog>
                    )}
                    <Link href="/categories" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full rounded-full border-white/50 bg-white/70 px-6 py-5 text-base text-foreground shadow-lg backdrop-blur transition-colors hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-900/60 dark:text-white sm:w-auto"
                      >
                        探索分类
                        <Icons.ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid w-full gap-4 sm:grid-cols-2">
                  <div className="col-span-1 flex flex-col justify-between rounded-[32px] border border-white/50 bg-white/70 p-6 shadow-inner backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:col-span-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                      <Icons.TrendingUp className="h-3.5 w-3.5" />
                      实时热议
                    </div>
                    <div className="mt-3 space-y-3">
                      <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground">
                        {highlightPost ? highlightPost.title : "欢迎开启社区的第一篇话题"}
                      </h3>
                      {highlightPost ? (
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{highlightPost.author.name}</span>
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary/80 dark:bg-primary/20">
                              {highlightTopic}
                            </span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Icons.MessageCircle className="h-3.5 w-3.5" />
                            {highlightPost.replyCount} 回复
                          </span>
                          <span className="flex items-center gap-1">
                            <Icons.Eye className="h-3.5 w-3.5" />
                            {highlightPost.viewCount} 浏览
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          现在就发布一篇新话题，让更多人看到你的灵感。
                        </p>
                      )}
                    </div>
                    {highlightPost && (
                      <Link href={`/post/${highlightPost.id}`} className="mt-4 inline-flex w-fit items-center text-sm font-medium text-primary">
                        查看话题
                        <Icons.ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>

                  <div className="rounded-[28px] border border-white/40 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70 dark:bg-primary/20">
                        帖子总数
                      </span>
                      <Icons.BarChart3 className="h-4 w-4 text-primary/80" />
                    </div>
                    <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">{posts.length.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">覆盖社区的所有主要讨论</p>
                  </div>

                  <div className="rounded-[28px] border border-white/40 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                        活跃创作者
                      </span>
                      <Icons.Users className="h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                    </div>
                    <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">{activeCreators.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">本周参与发布与互动的用户</p>
                  </div>

                  <div className="rounded-[28px] border border-white/40 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/70 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-600 dark:text-fuchsia-300">
                        社区互动
                      </span>
                      <Icons.MessageSquare className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-300" />
                    </div>
                    <div className="mt-5 flex items-baseline gap-6">
                      <p className="text-3xl font-semibold tracking-tight text-foreground">{totalReplies.toLocaleString()}</p>
                      <p className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm dark:bg-white/10">
                        {totalViews.toLocaleString()} 浏览量
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">回复与浏览数据实时增长，保持社区热度</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col gap-4 rounded-[32px] border border-white/30 bg-white/75 px-6 py-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-950/60 sm:px-8 sm:py-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">最新话题</h2>
                    <Badge className="rounded-full border-white/50 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary/80 dark:border-white/10 dark:bg-primary/20">
                      <Icons.TrendingUp className="mr-1 h-3.5 w-3.5" />
                      热门动态
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">聚焦技术、产品与生活方式的即时讨论</p>
                </div>

                {user ? (
                  <Link href="/new-post">
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
                  {currentPosts.map((post) => (
                    <div key={post.id} className="h-full">
                      <PostCard {...post} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[32px] border border-dashed border-primary/30 bg-white/75 px-6 py-16 text-center shadow-xl backdrop-blur dark:border-primary/40 dark:bg-slate-950/60">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <Icons.MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">还没有任何话题</h3>
                    <p className="text-sm text-muted-foreground">成为第一个发布话题的人，为社区开启新的讨论。</p>
                  </div>
                  {user ? (
                    <Link href="/new-post">
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
