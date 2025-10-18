"use client"

import type React from "react"

import { useState } from "react"

import { AuthDialog } from "@/components/auth/auth-dialog"
import { AIAssistant } from "@/components/ai-assistant"
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/auth"
import { useCommentsStore } from "@/lib/comments"
import { usePostsStore } from "@/lib/posts"

interface CommentFormProps {
  postId: string
}

export function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAI, setShowAI] = useState(false)

  const { addComment } = useCommentsStore()
  const { user } = useAuthStore()
  const { getPostById } = usePostsStore()
  const { toast } = useToast()

  const post = getPostById(postId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "请先登录",
        description: "登录后才能发表评论",
        variant: "destructive",
      })
      return
    }

    if (!content.trim()) {
      toast({
        title: "请输入评论内容",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      addComment({
        postId,
        content: content.trim(),
        author: {
          id: user.id,
          name: user.username,
          avatar: user.avatar || "/placeholder.svg",
        },
      })

      setContent("")
      toast({
        title: "评论成功",
      })
    } catch (error) {
      toast({
        title: "评论失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAISuggestion = (suggestion: string) => {
    setContent(suggestion)
    setShowAI(false)
    toast({
      title: "AI建议已应用",
      description: "您可以继续编辑回复",
    })
  }

  if (!user) {
    return (
      <div className="relative overflow-hidden rounded-[30px] border border-dashed border-primary/30 bg-white/75 px-8 py-10 text-center shadow-[0_30px_90px_-60px_rgba(37,99,235,0.45)] backdrop-blur-xl dark:border-primary/40 dark:bg-slate-950/70 sm:px-10">
        <span className="pointer-events-none absolute -left-12 -top-8 h-32 w-32 rounded-full bg-primary/15 blur-3xl dark:bg-primary/30" />
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
          <Icons.User className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">登录后参与讨论</h3>
        <p className="mt-2 text-sm text-muted-foreground">加入社区，分享你的观点并与他人互动。</p>
        <div className="mt-6 flex justify-center">
          <AuthDialog defaultMode="login">
            <Button size="lg" className="rounded-full px-6 py-2 text-base shadow-md">
              立即登录
            </Button>
          </AuthDialog>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white/85 px-6 py-7 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.6)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80 sm:px-8 sm:py-9">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_75%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),_transparent_70%)]" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground sm:text-xl">发表评论</h3>
            <p className="mt-1 text-sm text-muted-foreground">保持友善与尊重，让对话更有温度。</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAI(!showAI)}
            className="rounded-full border border-white/50 bg-white/70 px-4 py-2 text-xs font-semibold text-primary shadow-sm transition-colors hover:border-primary/40 hover:text-primary/90 dark:border-white/10 dark:bg-slate-900/70"
          >
            <Icons.Sparkles className="mr-1.5 h-3.5 w-3.5" />
            AI助手
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="relative mt-6 space-y-5">
          <div className="flex items-start gap-4 sm:gap-5">
            <Avatar className="h-12 w-12 border-2 border-white/70 shadow-lg ring-2 ring-white/50 ring-offset-2 ring-offset-transparent dark:border-white/20 dark:ring-white/10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
              <AvatarFallback className="font-semibold text-primary/80 dark:text-primary/60">{user.username.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="写下您的想法..."
                className="min-h-[160px] resize-none rounded-3xl border border-white/60 bg-white/85 px-5 py-4 text-base leading-7 text-foreground shadow-inner backdrop-blur focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20 dark:border-white/10 dark:bg-slate-900/70"
                maxLength={1000}
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{content.length}</span>
                  /1000 字
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-5 py-2 text-sm font-medium shadow-md motion-safe:hover:-translate-y-0.5"
                >
                  <Icons.Send className="h-4 w-4" />
                  <span className="ml-2">{isSubmitting ? "发布中..." : "发布评论"}</span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {showAI && post && (
        <div className="rounded-[28px] border border-dashed border-primary/30 bg-primary/5 px-5 py-4 shadow-inner backdrop-blur dark:border-primary/40 dark:bg-primary/10">
          <AIAssistant
            mode="reply"
            postTitle={post.title}
            postContent={post.content}
            onSuggestionSelect={handleAISuggestion}
          />
        </div>
      )}
    </div>
  )
}
