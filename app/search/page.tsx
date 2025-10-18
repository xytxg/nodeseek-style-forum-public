"use client"

import type React from "react"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { ForumHeader } from "@/components/forum-header"
import { ForumSidebar } from "@/components/forum-sidebar"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserLevelBadge } from "@/components/user-level-badge"
import { DEMO_USER_LEVELS, calculateUserLevel } from "@/lib/user-level"
import { usePosts } from "@/lib/posts"

const topicLabels: Record<string, string> = {
  daily: "日常",
  tech: "技术",
  info: "信息",
  review: "测评",
  trade: "交易",
  carpool: "拼车",
  promotion: "推广",
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const { searchPosts } = usePosts()

  useEffect(() => {
    setSearchTerm(initialQuery)
    if (initialQuery) {
      performSearch(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const results = searchPosts(query)
      setSearchResults(results)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchTerm)
    const url = new URL(window.location.href)
    if (searchTerm.trim()) {
      url.searchParams.set("q", searchTerm)
    } else {
      url.searchParams.delete("q")
    }
    window.history.replaceState({}, "", url.toString())
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
            <section className="relative overflow-hidden rounded-[40px] border border-white/35 bg-white/80 px-7 py-9 shadow-[0_35px_120px_-65px_rgba(15,23,42,0.6)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 sm:px-10 sm:py-12">
              <span className="absolute -left-16 top-14 h-44 w-44 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30" />
              <span className="absolute right-12 top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl dark:bg-emerald-400/25" />

              <div className="relative space-y-8">
                <div className="space-y-4">
                  <Badge className="w-fit rounded-full border-white/40 bg-white/75 px-3 py-1 text-[11px] font-semibold tracking-[0.25em] text-primary/80 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                    智能搜索
                  </Badge>
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                    快速定位你关心的讨论与洞察
                  </h1>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    输入关键词，我们将为你检索整个社区的帖子、置顶主题与最新回复，助你第一时间掌握重点话题。
                  </p>
                </div>

                <form onSubmit={handleSearch} className="relative">
                  <Icons.Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="输入关键词搜索帖子..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 rounded-full border-white/40 bg-white/75 pl-12 pr-32 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40 focus-visible:ring-primary/20 dark:border-white/10 dark:bg-slate-900/70"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-2 top-1/2 w-auto -translate-y-1/2 rounded-full px-6 py-2 text-sm shadow-md"
                    disabled={isSearching}
                  >
                    {isSearching ? "搜索中..." : "搜索"}
                  </Button>
                </form>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3 py-1 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
                    <Icons.Sparkles className="h-3.5 w-3.5 text-primary/80" /> 支持标题与正文模糊搜索
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3 py-1 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
                    <Icons.BarChart3 className="h-3.5 w-3.5 text-primary/80" /> 根据社群热度排序
                  </span>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              {searchTerm && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-white/30 bg-white/70 px-6 py-4 text-sm text-muted-foreground shadow-inner backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
                  <p>
                    搜索结果 “<span className="font-semibold text-foreground">{searchTerm}</span>” 共 {searchResults.length} 个结果
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setSearchResults([])
                      const url = new URL(window.location.href)
                      url.searchParams.delete("q")
                      window.history.replaceState({}, "", url.toString())
                    }}
                    className="rounded-full border border-transparent bg-white/60 px-4 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-primary/30 hover:text-primary dark:bg-slate-950/60"
                  >
                    清除
                  </Button>
                </div>
              )}

              {isSearching && (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[32px] border border-dashed border-primary/30 bg-white/75 px-6 py-16 text-center shadow-xl backdrop-blur dark:border-primary/40 dark:bg-slate-950/70">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <Icons.Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                  <p className="text-sm text-muted-foreground">搜索中，请稍候...</p>
                </div>
              )}

              {!isSearching && searchTerm && searchResults.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[32px] border border-dashed border-primary/30 bg-white/75 px-6 py-16 text-center shadow-xl backdrop-blur dark:border-primary/40 dark:bg-slate-950/70">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <Icons.EyeOff className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">没有找到相关帖子</h3>
                    <p className="text-sm text-muted-foreground">尝试调整关键词，或浏览热门分类与最新讨论。</p>
                  </div>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="grid gap-4 xl:grid-cols-2 xl:gap-6">
                  {searchResults.map((post) => {
                    const authorLevel = DEMO_USER_LEVELS[post.author.id] || calculateUserLevel(90)
                    return (
                      <article
                        key={post.id}
                        className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/35 bg-white/80 px-6 py-6 shadow-[0_30px_90px_-65px_rgba(15,23,42,0.65)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/70 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-2xl"
                      >
                        <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100" />
                        <div className="flex flex-1 flex-col gap-4">
                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/70">
                            <Badge className="rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-[10px] font-semibold text-primary/70 dark:border-white/10 dark:bg-slate-900/70">
                              {topicLabels[post.topic] || post.topic}
                            </Badge>
                            {post.isSticky && (
                              <Badge className="rounded-full border-transparent bg-amber-400/20 px-3 py-1 text-[10px] font-semibold text-amber-700 dark:bg-amber-400/30 dark:text-amber-200">
                                置顶
                              </Badge>
                            )}
                          </div>

                          <Link
                            href={`/post/${post.id}`}
                            className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 hover:text-primary"
                          >
                            {post.title}
                          </Link>

                          <p className="text-sm leading-7 text-muted-foreground line-clamp-3">{post.content}</p>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/40 pt-4 text-xs text-muted-foreground dark:border-white/10 sm:text-sm">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Icons.User className="h-3.5 w-3.5" />
                              <span className="font-medium text-foreground">{post.author.name}</span>
                            </div>
                            <UserLevelBadge userLevel={authorLevel} />
                          </div>
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Icons.MessageCircle className="h-3.5 w-3.5" />
                              {post.replyCount} 回复
                            </span>
                            <span className="flex items-center gap-1">
                              <Icons.Eye className="h-3.5 w-3.5" />
                              {post.viewCount} 浏览
                            </span>
                            <span className="flex items-center gap-1">
                              <Icons.Calendar className="h-3.5 w-3.5" />
                              {post.createdAt}
                            </span>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}

              {!searchTerm && !isSearching && (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[32px] border border-dashed border-primary/30 bg-white/75 px-6 py-16 text-center shadow-xl backdrop-blur dark:border-primary/40 dark:bg-slate-950/70">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <Icons.Search className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">输入关键词开始搜索</h3>
                    <p className="text-sm text-muted-foreground">例如 “AI 编程助手” 或 “社区活动”</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full border border-white/40 bg-white/70 px-3 py-1 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
                      支持中文与英文搜索
                    </span>
                    <span className="rounded-full border border-white/40 bg-white/70 px-3 py-1 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
                      结果包含标题与正文
                    </span>
                  </div>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
