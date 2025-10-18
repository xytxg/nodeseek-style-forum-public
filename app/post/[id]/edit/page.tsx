"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ForumHeader } from "@/components/forum-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye, MessageSquare, Sparkles, Lock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AnimatedDivider } from "@/components/animated-divider"
import { usePostsStore } from "@/lib/posts"
import { useAuthStore } from "@/lib/auth"
import { Icons } from "@/components/icons"

const topics = [
  { value: "daily", label: "日常" },
  { value: "tech", label: "技术" },
  { value: "info", label: "信息" },
  { value: "review", label: "测评" },
  { value: "trade", label: "交易" },
  { value: "carpool", label: "拼车" },
  { value: "promotion", label: "推广" },
]

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { getPostById, updatePost } = usePostsStore()
  const { user } = useAuthStore()

  const postId = params.id as string
  const post = getPostById(postId)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [topic, setTopic] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setTopic(post.topic)
    }
  }, [post])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !topic) {
      toast({
        title: "请填写完整信息",
        description: "标题、内容和分类都是必填项",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      updatePost(postId, {
        title: title.trim(),
        content: content.trim(),
        topic,
      })

      toast({
        title: "更新成功",
        description: "您的话题已成功更新",
      })

      router.push(`/post/${postId}`)
    } catch (error) {
      toast({
        title: "更新失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!post) {
    return (
      <ProtectedRoute>
        <div className="relative min-h-screen overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
            <div className="absolute left-[-15%] top-[20%] h-[320px] w-[320px] rounded-full bg-sky-200/30 blur-3xl" />
            <div className="absolute bottom-[-25%] right-[-10%] h-[360px] w-[360px] rounded-full bg-purple-200/25 blur-[140px]" />
          </div>
          <ForumHeader />
          <div className="container relative mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center">
            <div className="rounded-[32px] border border-white/60 bg-white/80 p-12 shadow-2xl backdrop-blur-xl">
              <Icons.Edit className="mx-auto h-10 w-10 text-primary" />
              <h1 className="mt-4 text-2xl font-semibold text-foreground">话题不存在</h1>
              <p className="mt-2 text-sm text-muted-foreground">您尝试编辑的话题可能已被删除或不存在。</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (user?.id !== post.author.id) {
    return (
      <ProtectedRoute>
        <div className="relative min-h-screen overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
            <div className="absolute left-[-15%] top-[20%] h-[320px] w-[320px] rounded-full bg-sky-200/30 blur-3xl" />
            <div className="absolute bottom-[-25%] right-[-10%] h-[360px] w-[360px] rounded-full bg-purple-200/25 blur-[140px]" />
          </div>
          <ForumHeader />
          <div className="container relative mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center">
            <div className="rounded-[32px] border border-white/60 bg-white/80 p-12 shadow-2xl backdrop-blur-xl">
              <Lock className="mx-auto h-10 w-10 text-primary" />
              <h1 className="mt-4 text-2xl font-semibold text-foreground">无权限编辑</h1>
              <p className="mt-2 text-sm text-muted-foreground">您只能编辑自己发布的话题。</p>
              <Link href={`/post/${postId}`} className="mt-6 inline-flex">
                <Button className="rounded-full px-6">返回话题</Button>
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

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
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href={`/post/${postId}`}>
              <Button
                variant="outline"
                size="sm"
                className="group rounded-full border-primary/20 bg-white/80 px-4 text-primary shadow-sm backdrop-blur-lg transition hover:border-primary/40 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                <span className="ml-2 font-medium">返回话题</span>
              </Button>
            </Link>
            <Badge className="w-fit rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-medium text-primary">
              正在编辑
            </Badge>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/85 shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sky-100/40" />
                <div className="absolute right-[-15%] top-[10%] h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
              </div>
              <div className="relative space-y-8 px-6 py-8 sm:px-10 sm:py-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-4 border-white/70 shadow-md">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
                      <AvatarFallback className="text-lg font-semibold">{user?.username?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h1 className="text-2xl font-semibold text-foreground">编辑话题</h1>
                      <p className="text-sm text-muted-foreground">完善内容与格式，为读者提供最佳体验。</p>
                    </div>
                  </div>
                  <div className="rounded-full border border-primary/20 bg-white/70 px-4 py-1 text-sm text-primary/80 backdrop-blur">
                    <span className="font-medium">最近更新：</span>
                    <span className="ml-1">{post.updatedAt}</span>
                  </div>
                </div>

                <AnimatedDivider />

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="title" className="text-sm font-medium text-foreground">
                        标题
                      </Label>
                      <span className="text-xs text-muted-foreground">{title.length}/100</span>
                    </div>
                    <Input
                      id="title"
                      placeholder="输入话题标题..."
                      className="rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-lg font-medium text-foreground shadow-inner backdrop-blur focus-visible:border-primary/40"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                    />
                    <p className="text-xs text-muted-foreground">标题应简洁明了，准确传达核心信息。</p>
                  </div>

                  <AnimatedDivider />

                  <div className="space-y-3">
                    <Label htmlFor="topic" className="text-sm font-medium text-foreground">
                      分类
                    </Label>
                    <Select value={topic} onValueChange={setTopic}>
                      <SelectTrigger className="w-full rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40">
                        <SelectValue placeholder="选择话题分类" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border border-white/70 bg-white/90 backdrop-blur">
                        {topics.map((topicItem) => (
                          <SelectItem key={topicItem.value} value={topicItem.value}>
                            {topicItem.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">为话题选择合适的分类，让更多人找到它。</p>
                  </div>

                  <AnimatedDivider />

                  <div className="space-y-3">
                    <Label htmlFor="content" className="text-sm font-medium text-foreground">
                      内容
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="分享您的想法..."
                      className="min-h-[320px] resize-none rounded-2xl border-white/60 bg-white/80 px-4 py-4 text-base leading-7 text-foreground shadow-inner backdrop-blur focus-visible:border-primary/40"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      maxLength={5000}
                    />
                    <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground">
                      <span>支持 Markdown 基础语法</span>
                      <span>{content.length}/5000</span>
                    </div>
                  </div>

                  <AnimatedDivider />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-muted-foreground">
                      <span className="mr-1 font-medium text-primary">提示：</span>
                      多次保存可以确保内容不会丢失。
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="rounded-full px-6 py-2">
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "保存中..." : "保存更改"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h3 className="text-base font-semibold text-foreground">话题概览</h3>
                <AnimatedDivider className="my-5" />
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-foreground shadow-inner backdrop-blur">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Eye className="h-4 w-4 text-primary" /> 浏览量
                    </span>
                    <span className="text-base font-semibold text-foreground">{post.viewCount}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-foreground shadow-inner backdrop-blur">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <MessageSquare className="h-4 w-4 text-primary" /> 讨论数
                    </span>
                    <span className="text-base font-semibold text-foreground">{post.replyCount}</span>
                  </div>
                  <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-xs text-primary/80 shadow-inner backdrop-blur">
                    <p>最近更新于 {post.updatedAt}</p>
                    <p className="mt-1">保持内容新鲜度，及时补充最新信息。</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h3 className="text-base font-semibold text-foreground">编辑建议</h3>
                <AnimatedDivider className="my-5" />
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                    <span>从读者角度审视内容，确保逻辑清晰、重点突出。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                    <span>使用分段和列表提升可读性，重要信息可加粗标注。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                    <span>更新时说明关键变化，帮助读者快速了解最新版本。</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[28px] border border-dashed border-primary/30 bg-primary/5 p-6 shadow-inner backdrop-blur">
                <h3 className="text-sm font-semibold text-primary">快速操作</h3>
                <p className="mt-2 text-xs text-primary/80">需要灵感？切换到新建页面或调用 AI 助手获取建议。</p>
                <Link href="/new-post" className="mt-4 inline-flex">
                  <Button variant="outline" size="sm" className="rounded-full border-primary/20 bg-white/80 px-4 text-primary">
                    <Sparkles className="mr-2 h-4 w-4" />
                    新建话题
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
