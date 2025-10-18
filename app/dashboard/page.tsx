"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ForumHeader } from "@/components/forum-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AnimatedDivider } from "@/components/animated-divider"
import { useAuth } from "@/lib/auth"
import { usePostsStore } from "@/lib/posts"
import { useCommentsStore } from "@/lib/comments"
import { calculateUserLevel } from "@/lib/user-level"
import {
  Activity,
  Plus,
  BookOpen,
  MessageSquare,
  Eye,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const { posts } = usePostsStore()
  const { comments } = useCommentsStore()
  const [activeTab, setActiveTab] = useState("overview")

  if (!user) return null

  const levelInfo = calculateUserLevel(user.drumsticks ?? 120)

  const userPosts = useMemo(() => posts.filter((post) => post.author.id === user.id), [posts, user.id])
  const userComments = useMemo(() => comments.filter((comment) => comment.author.id === user.id), [comments, user.id])
  const recentPosts = userPosts.slice(0, 4)
  const recentComments = userComments.slice(0, 5)

  const totalViews = userPosts.reduce((sum, post) => sum + post.viewCount, 0)
  const totalDiscussions = userPosts.reduce((sum, post) => sum + post.replyCount, 0)
  const avgViewsPerPost = userPosts.length > 0 ? Math.round(totalViews / userPosts.length) : 0
  const engagementScore = totalDiscussions * 4 + userComments.length * 3 + totalViews

  const weeklyActivity = [
    { day: "周一", posts: 2, comments: 5 },
    { day: "周二", posts: 1, comments: 6 },
    { day: "周三", posts: 3, comments: 4 },
    { day: "周四", posts: 0, comments: 7 },
    { day: "周五", posts: 2, comments: 8 },
    { day: "周六", posts: 1, comments: 3 },
    { day: "周日", posts: 2, comments: 9 },
  ]

  const achievements = [
    {
      id: 1,
      title: "开帖先锋",
      description: "发布第一个话题",
      icon: "🚀",
      progress: Math.min(userPosts.length / 1, 1),
      target: 1,
      current: userPosts.length,
    },
    {
      id: 2,
      title: "讨论引擎",
      description: "累计 200 条讨论互动",
      icon: "💬",
      progress: Math.min(totalDiscussions / 200, 1),
      target: 200,
      current: totalDiscussions,
    },
    {
      id: 3,
      title: "社区活跃者",
      description: "发表 80 条评论",
      icon: "🔥",
      progress: Math.min(userComments.length / 80, 1),
      target: 80,
      current: userComments.length,
    },
    {
      id: 4,
      title: "影响力达人",
      description: "互动指数达到 300",
      icon: "🌟",
      progress: Math.min(engagementScore / 300, 1),
      target: 300,
      current: engagementScore,
    },
  ]

  const quickStats = [
    {
      label: "已发布话题",
      value: userPosts.length,
      change: "+3 本周",
      icon: BookOpen,
    },
    {
      label: "评论互动",
      value: userComments.length,
      change: `共 ${totalDiscussions} 讨论`,
      icon: MessageSquare,
    },
    {
      label: "累计浏览",
      value: totalViews,
      change: avgViewsPerPost ? `平均 ${avgViewsPerPost}/帖` : "暂无数据",
      icon: Eye,
    },
    {
      label: "互动指数",
      value: engagementScore,
      change: engagementScore > 0 ? "持续增长" : "等待激活",
      icon: TrendingUp,
    },
  ]

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
          <div className="absolute left-[-15%] top-[18%] h-[360px] w-[360px] rounded-full bg-sky-200/30 blur-3xl" />
          <div className="absolute right-[-20%] bottom-[-20%] h-[420px] w-[420px] rounded-full bg-purple-200/30 blur-[150px]" />
        </div>
        <ForumHeader />

        <div className="container relative mx-auto max-w-6xl px-4 pb-16 pt-10 lg:pb-24">
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white/85 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-sky-100/40" />
                <div className="absolute right-[-10%] top-[-10%] h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              </div>
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <Avatar className="h-20 w-20 border-4 border-white/70 shadow-xl">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                    <AvatarFallback className="text-2xl font-semibold">{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-3xl font-semibold text-foreground">你好，{user.username}</h1>
                      <Badge className="rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-semibold text-primary">
                        等级 Lv{levelInfo.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      探索数据、了解成长轨迹，并用新的话题点燃社区讨论。
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Activity className="h-4 w-4 text-primary" /> 最近动态：{weeklyActivity[6].posts} 帖 / {weeklyActivity[6].comments} 评
                      </span>
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-primary" /> 互动指数 {engagementScore}
                      </span>
                    </div>
                  </div>
                </div>
                <Link href="/new-post" className="shrink-0">
                  <Button className="rounded-full px-6">
                    <Plus className="mr-2 h-4 w-4" />
                    发布新话题
                  </Button>
                </Link>
              </div>
              <AnimatedDivider className="my-8" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {quickStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="group rounded-3xl border border-white/60 bg-white/80 p-5 shadow-inner backdrop-blur transition hover:-translate-y-1 hover:border-primary/40"
                    >
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{stat.label}</span>
                        <Icon className="h-4 w-4 text-primary/70 transition group-hover:text-primary" />
                      </div>
                      <div className="mt-3 text-2xl font-semibold text-foreground">{stat.value}</div>
                      <p className="mt-1 text-xs text-primary/80">{stat.change}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 gap-2 rounded-full border border-white/60 bg-white/70 p-1 backdrop-blur md:grid-cols-4">
                {[
                  { value: "overview", label: "概览" },
                  { value: "activity", label: "活动" },
                  { value: "achievements", label: "成就" },
                  { value: "analytics", label: "数据洞察" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-full border border-transparent text-sm font-medium text-muted-foreground transition data-[state=active]:border-primary/40 data-[state=active]:bg-white data-[state=active]:text-primary"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-lg font-semibold text-foreground">最近话题</h2>
                      <Link href="/new-post" className="text-xs text-primary hover:underline">
                        创作更多 <ArrowRight className="ml-1 inline-flex h-3 w-3" />
                      </Link>
                    </div>
                    <AnimatedDivider className="my-5" />
                    {recentPosts.length > 0 ? (
                      <div className="space-y-4">
                        {recentPosts.map((post) => (
                          <div key={post.id} className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-inner backdrop-blur">
                            <Link href={`/post/${post.id}`} className="text-sm font-semibold text-foreground hover:text-primary">
                              {post.title}
                            </Link>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" /> {post.viewCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" /> {post.replyCount}
                              </span>
                              <span>{post.createdAt}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center text-sm text-muted-foreground">
                        还没有发布话题，点击右上角开始创作。
                      </div>
                    )}
                  </div>

                  <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                    <h2 className="text-lg font-semibold text-foreground">最近评论</h2>
                    <AnimatedDivider className="my-5" />
                    {recentComments.length > 0 ? (
                      <div className="space-y-4">
                        {recentComments.map((comment) => (
                          <div key={comment.id} className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-inner backdrop-blur">
                            <p className="text-sm leading-7 text-muted-foreground">{comment.content}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <span>{comment.createdAt}</span>
                              <Badge variant="outline" className="rounded-full border-primary/20 bg-white/80 px-2 py-0 text-[10px] text-primary">
                                评论
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center text-sm text-muted-foreground">
                        还没有发表评论，参与讨论让你更受关注。
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-foreground">本周活动统计</h2>
                    <p className="text-xs text-muted-foreground">从周一到周日的发帖与评论趋势</p>
                  </div>
                  <AnimatedDivider className="my-5" />
                  <div className="grid gap-4 md:grid-cols-7">
                    {weeklyActivity.map((item) => (
                      <div
                        key={item.day}
                        className="flex flex-col items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-4 text-center shadow-inner backdrop-blur"
                      >
                        <span className="text-xs text-muted-foreground">{item.day}</span>
                        <div className="flex h-32 w-16 flex-col justify-end gap-1">
                          <div
                            className="rounded-full bg-primary/30"
                            style={{ height: `${item.posts * 12 + 4}px` }}
                          />
                          <div
                            className="rounded-full bg-primary"
                            style={{ height: `${item.comments * 8 + 6}px` }}
                          />
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          <span className="font-semibold text-primary">{item.posts}</span> 帖 · {item.comments} 评
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-foreground">成就进度</h2>
                    <p className="text-xs text-muted-foreground">保持活跃即可解锁更多徽章</p>
                  </div>
                  <AnimatedDivider className="my-5" />
                  <div className="grid gap-4 md:grid-cols-2">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex flex-col gap-3 rounded-3xl border ${
                          achievement.progress >= 1 ? "border-primary/40 bg-primary/10" : "border-white/60 bg-white/70"
                        } p-5 shadow-inner backdrop-blur`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{achievement.icon}</span>
                            <div>
                              <h3 className="text-sm font-semibold text-foreground">{achievement.title}</h3>
                              <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                          {achievement.progress >= 1 && (
                            <Badge className="rounded-full border border-primary/30 bg-primary/90 px-3 py-1 text-xs text-primary-foreground">
                              已达成
                            </Badge>
                          )}
                        </div>
                        <Progress value={achievement.progress * 100} className="h-2" />
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>当前 {achievement.current}</span>
                          <span>目标 {achievement.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                    <h3 className="text-base font-semibold text-foreground">内容结构</h3>
                    <AnimatedDivider className="my-5" />
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>话题总数</span>
                        <span className="font-semibold text-foreground">{userPosts.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>累计讨论</span>
                        <span className="font-semibold text-foreground">{totalDiscussions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>平均字数</span>
                        <span className="font-semibold text-foreground">
                          {userPosts.length > 0
                            ? Math.round(
                                userPosts.reduce((sum, post) => sum + post.content.length, 0) / userPosts.length,
                              )
                            : 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                    <h3 className="text-base font-semibold text-foreground">互动表现</h3>
                    <AnimatedDivider className="my-5" />
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>累计浏览</span>
                        <span className="font-semibold text-foreground">{totalViews}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>互动指数</span>
                        <span className="font-semibold text-foreground">{engagementScore}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>平均互动 / 帖</span>
                        <span className="font-semibold text-foreground">
                          {userPosts.length > 0 ? Math.round((engagementScore / userPosts.length) * 10) / 10 : 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                    <h3 className="text-base font-semibold text-foreground">成长建议</h3>
                    <AnimatedDivider className="my-5" />
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                        <span>尝试多元主题，提升不同分类的影响力。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                        <span>发布后的 24 小时内及时回复评论，保持热度。</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                        <span>将高互动的内容整理成系列帖，持续提升关注。</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
