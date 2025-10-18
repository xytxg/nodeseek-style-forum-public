"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ForumHeader } from "@/components/forum-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CommentForm } from "@/components/comment-form"
import { CommentItem } from "@/components/comment-item"
import { Icons } from "@/components/icons"
import { UserLevelBadge } from "@/components/user-level-badge"
import { DEMO_USER_LEVELS, calculateUserLevel } from "@/lib/user-level"
import { usePostsStore } from "@/lib/posts"
import { useCommentsStore } from "@/lib/comments"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { AnimatedDivider } from "@/components/animated-divider"

const topicLabels: Record<string, string> = {
  daily: "日常",
  tech: "技术",
  info: "信息",
  review: "测评",
  trade: "交易",
  carpool: "拼车",
  promotion: "推广",
}

export default function PostPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { getPostById, incrementViewCount, deletePost } = usePostsStore()
  const { getCommentsByPostId } = useCommentsStore()
  const { user } = useAuth()

  const [backNavigation, setBackNavigation] = useState<{ text: string; path: string }>(
    {
      text: "返回首页",
      path: "/",
    },
  )

  const postId = params.id as string
  const post = getPostById(postId)
  const comments = getCommentsByPostId(postId)

  useEffect(() => {
    if (postId) {
      incrementViewCount(postId)
    }
  }, [postId, incrementViewCount])

  useEffect(() => {
    const referrer = document.referrer
    const currentOrigin = window.location.origin

    if (referrer && referrer.startsWith(currentOrigin)) {
      const referrerPath = referrer.replace(currentOrigin, "")

      if (referrerPath.startsWith("/t/")) {
        setBackNavigation({
          text: "返回上级",
          path: referrerPath,
        })
      } else if (referrerPath === "/" || referrerPath === "") {
        setBackNavigation({
          text: "返回首页",
          path: "/",
        })
      } else {
        setBackNavigation({
          text: "返回首页",
          path: "/",
        })
      }
    } else {
      setBackNavigation({
        text: "返回首页",
        path: "/",
      })
    }
  }, [])

  const handleDelete = () => {
    if (confirm("确定要删除这个话题吗？此操作无法撤销。")) {
      deletePost(postId)
      toast({
        title: "删除成功",
        description: "话题已被删除",
      })
      router.push("/")
    }
  }

  const handleBackNavigation = () => {
    router.push(backNavigation.path)
  }

  if (!post) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
          <div className="absolute left-[-15%] top-[20%] h-[320px] w-[320px] rounded-full bg-sky-200/30 blur-3xl" />
          <div className="absolute bottom-[-25%] right-[-10%] h-[360px] w-[360px] rounded-full bg-purple-200/25 blur-[140px]" />
        </div>
        <ForumHeader />
        <div className="container relative mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center">
          <Card className="w-full max-w-xl border-white/60 bg-white/80 px-0 shadow-2xl backdrop-blur-xl">
            <CardContent className="space-y-6 px-8 py-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
                404
              </div>
              <h1 className="text-2xl font-semibold text-foreground md:text-3xl">话题不存在</h1>
              <p className="text-sm text-muted-foreground md:text-base">
                您访问的话题可能已被删除或不存在，试着回到首页探索其他精彩内容。
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/">
                  <Button className="rounded-full px-6">返回首页</Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="rounded-full border-primary/30 bg-white/70 px-6 text-primary backdrop-blur"
                >
                  返回上一页
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const isAuthor = user?.id === post.author.id
  const authorLevel = DEMO_USER_LEVELS[post.author.id] || calculateUserLevel(90)
  const liveCommentCount = comments.length

  const statCards = [
    {
      label: "实时评论",
      value: liveCommentCount,
      icon: Icons.MessageCircle,
    },
    {
      label: "历史讨论",
      value: post.replyCount,
      icon: Icons.MessageSquare,
    },
    {
      label: "浏览热度",
      value: post.viewCount,
      icon: Icons.Eye,
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
        <div className="absolute left-[-15%] top-[18%] h-[360px] w-[360px] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute right-[-20%] bottom-[-20%] h-[420px] w-[420px] rounded-full bg-purple-200/30 blur-[150px]" />
      </div>
      <ForumHeader />

      <div className="container relative mx-auto max-w-5xl px-4 pb-16 pt-10 lg:pb-24">
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackNavigation}
            className="group rounded-full border-primary/20 bg-white/80 px-4 text-primary shadow-sm backdrop-blur-lg transition hover:border-primary/40 hover:text-primary"
          >
            <Icons.ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            <span className="ml-2 font-medium">{backNavigation.text}</span>
          </Button>
        </div>

        <div className="space-y-10">
          <Card className="relative overflow-hidden rounded-[32px] border-white/60 bg-white/80 shadow-2xl backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sky-100/40" />
              <div className="absolute left-1/2 top-[-20%] h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>
            <CardContent className="relative space-y-8 px-6 py-8 sm:px-10 sm:py-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                      {post.isSticky && (
                        <Badge className="rounded-full bg-primary/10 px-3 text-xs font-medium text-primary">置顶</Badge>
                      )}
                      <Badge variant="secondary" className="rounded-full border border-primary/20 bg-white/70 px-3 text-xs">
                        {topicLabels[post.topic] || post.topic}
                      </Badge>
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                      {post.title}
                    </h1>

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-4 border-white/70 shadow-md">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                          <AvatarFallback className="text-xl font-semibold">
                            {post.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-lg font-semibold text-foreground">{post.author.name}</span>
                            <UserLevelBadge userLevel={authorLevel} showDrumsticks size="md" />
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Icons.Clock className="h-4 w-4 text-primary/70" />
                              {post.createdAt}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Icons.Grid3X3 className="h-4 w-4 text-primary/70" />
                              {topicLabels[post.topic] || post.topic}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isAuthor && (
                        <div className="flex gap-2 rounded-full border border-primary/20 bg-white/80 p-1 shadow-sm backdrop-blur">
                          <Link href={`/post/${post.id}/edit`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-full px-4 text-sm font-medium text-primary hover:bg-primary/10"
                            >
                              <Icons.Edit className="h-4 w-4" />
                              <span className="ml-1">编辑</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDelete}
                            className="rounded-full px-4 text-sm font-medium text-destructive hover:bg-destructive/10"
                          >
                            <Icons.Trash2 className="h-4 w-4" />
                            <span className="ml-1">删除</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {statCards.map((card, index) => {
                    const Icon = card.icon
                    return (
                      <div
                        key={card.label}
                        className="group rounded-2xl border border-white/70 bg-white/70 p-4 shadow-inner backdrop-blur transition hover:-translate-y-1 hover:border-primary/40"
                      >
                        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                          <span>{card.label}</span>
                          <Icon className="h-4 w-4 text-primary/70 transition group-hover:text-primary" />
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-foreground">{card.value}</div>
                      </div>
                    )
                  })}
                </div>

                <AnimatedDivider />

                <div className="rounded-3xl border border-primary/10 bg-white/70 p-6 shadow-inner backdrop-blur">
                  <div className="whitespace-pre-wrap break-words text-base leading-7 text-muted-foreground">
                    {post.content}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">讨论区</h2>
                  <p className="text-sm text-muted-foreground">分享你的想法，与社区成员一起交流碰撞。</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1 text-sm text-primary/80 backdrop-blur">
                  <Icons.MessageCircle className="h-4 w-4" />
                  <span>
                    当前活跃讨论 <span className="font-semibold text-primary">{liveCommentCount}</span>
                  </span>
                </div>
              </div>

              <AnimatedDivider className="my-6" />

              <CommentForm postId={postId} />

              {comments.length > 0 ? (
                <div className="mt-8 space-y-5">
                  {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                </div>
              ) : (
                <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 text-center text-sm text-muted-foreground">
                  <Icons.MessageSquare className="h-6 w-6 text-primary" />
                  <p>还没有评论，率先分享你的见解吧！</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
