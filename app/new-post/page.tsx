"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ForumHeader } from "@/components/forum-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AIAssistant } from "@/components/ai-assistant"
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { usePostsStore } from "@/lib/posts"
import { useAuth } from "@/lib/auth"
import { useCategoriesStore } from "@/lib/categories"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedDivider } from "@/components/animated-divider"

export default function NewPostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [topic, setTopic] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { addPost, saveDraft } = usePostsStore()
  const { user } = useAuth()
  const { categories } = useCategoriesStore()

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam && categories.find((cat) => cat.slug === categoryParam)) {
      setTopic(categoryParam)
    }
  }, [searchParams, categories])

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
      addPost({
        title: title.trim(),
        content: content.trim(),
        topic,
        author: {
          id: user?.id || "1",
          name: user?.username || "匿名用户",
          avatar: user?.avatar || "/placeholder.svg",
        },
      })

      toast({
        title: "发布成功",
        description: "您的话题已成功发布",
      })

      const categoryParam = searchParams.get("category")
      if (categoryParam) {
        router.push(`/t/${categoryParam}`)
      } else {
        router.push("/")
      }
    } catch (error) {
      toast({
        title: "发布失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = () => {
    if (!title.trim() && !content.trim()) {
      toast({
        title: "无内容可保存",
        description: "请先输入标题或内容",
        variant: "destructive",
      })
      return
    }

    saveDraft({
      title: title.trim() || "未命名草稿",
      content: content.trim(),
      topic: topic || "daily",
      author: {
        id: user?.id || "1",
        name: user?.username || "匿名用户",
        avatar: user?.avatar || "/placeholder.svg",
      },
    })

    toast({
      title: "草稿已保存",
      description: "您可以稍后继续编辑",
    })
  }

  const handleAISuggestion = (suggestion: string) => {
    setContent(suggestion)
    toast({
      title: "AI建议已应用",
      description: "您可以继续编辑内容",
    })
  }

  const getBackLink = () => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      return `/t/${categoryParam}`
    }
    return "/"
  }

  const getBackText = () => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      const category = categories.find((cat) => cat.slug === categoryParam)
      return `返回 ${category?.name || "分类"}`
    }
    return "返回首页"
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
            <Link href={getBackLink()}>
              <Button
                variant="outline"
                size="sm"
                className="group rounded-full border-primary/20 bg-white/80 px-4 text-primary shadow-sm backdrop-blur-lg transition hover:border-primary/40 hover:text-primary"
              >
                <Icons.ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                <span className="ml-2 font-medium">{getBackText()}</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1 text-sm text-primary/80 backdrop-blur">
              <Icons.Sparkles className="h-4 w-4" />
              <span>灵感不足？试试 AI 写作助手</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/85 shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sky-100/40" />
                <div className="absolute left-[-20%] top-[15%] h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              </div>
              <div className="relative space-y-8 px-6 py-8 sm:px-10 sm:py-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-4 border-white/70 shadow-md">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username || "匿名用户"} />
                      <AvatarFallback className="text-lg font-semibold">{user?.username?.charAt(0) || "访"}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h1 className="text-2xl font-semibold text-foreground">发布新话题</h1>
                      <p className="text-sm text-muted-foreground">描述你的想法、问题或灵感，与社区一起讨论。</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSaveDraft}
                      className="rounded-full border-primary/20 bg-white/80 px-4 text-primary"
                    >
                      <Icons.Save className="h-4 w-4" />
                      <span className="ml-1">保存草稿</span>
                    </Button>
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
                      placeholder="用一句话概括你的话题..."
                      className="rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-lg font-medium text-foreground shadow-inner backdrop-blur focus-visible:border-primary/40"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                    />
                    <p className="text-xs text-muted-foreground">标题应简洁具体，吸引读者点击。</p>
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
                        {categories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">精准选择分类能让更多人看到你的话题。</p>
                  </div>

                  <AnimatedDivider />

                  <div className="space-y-3">
                    <Label htmlFor="content" className="text-sm font-medium text-foreground">
                      内容
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="详细描述你的问题、观点或故事..."
                      className="min-h-[340px] resize-none rounded-2xl border-white/60 bg-white/80 px-4 py-4 text-base leading-7 text-foreground shadow-inner backdrop-blur focus-visible:border-primary/40"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      maxLength={5000}
                    />
                    <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground">
                      <span>提示：添加图片或代码片段能让内容更易理解</span>
                      <span>{content.length}/5000</span>
                    </div>
                  </div>

                  <AnimatedDivider />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-muted-foreground">
                      <span className="mr-1 font-medium text-primary">社区守则：</span>
                      尊重他人，禁止灌水与广告。
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="rounded-full px-6 py-2">
                      <Icons.Send className="mr-2 h-4 w-4" />
                      <span>{isSubmitting ? "发布中..." : "发布话题"}</span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="space-y-6 lg:sticky lg:top-28">
              <AIAssistant mode="post" postTitle={title} topic={topic} onSuggestionSelect={handleAISuggestion} />

              <div className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h3 className="text-base font-semibold text-foreground">发布指南</h3>
                <AnimatedDivider className="my-5" />
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icons.Star className="mt-0.5 h-4 w-4 text-primary" />
                    <span>开头说明背景或目的，让读者快速进入情境。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.BarChart3 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>使用小标题、列表或引用增强结构和重点。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Users className="mt-0.5 h-4 w-4 text-primary" />
                    <span>提出问题或邀请讨论，激发评论互动。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Gift className="mt-0.5 h-4 w-4 text-primary" />
                    <span>发布前检查错别字与格式，确保阅读体验。</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[28px] border border-dashed border-primary/30 bg-primary/5 p-6 shadow-inner backdrop-blur">
                <h3 className="text-sm font-semibold text-primary">草稿提示</h3>
                <p className="mt-2 text-xs text-primary/80">经常保存草稿，避免长文意外丢失。你可以在仪表盘中再次找到所有草稿。</p>
                <Link href="/dashboard" className="mt-4 inline-flex">
                  <Button variant="outline" size="sm" className="rounded-full border-primary/20 bg-white/80 px-4 text-primary">
                    <Icons.TrendingUp className="mr-2 h-4 w-4" />
                    查看仪表盘
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
