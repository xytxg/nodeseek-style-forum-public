"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AIAssistant } from "@/components/ai-assistant"
import { Icons } from "@/components/icons"
import { useCommentsStore } from "@/lib/comments"
import { useAuthStore } from "@/lib/auth"
import { usePostsStore } from "@/lib/posts"
import { useToast } from "@/hooks/use-toast"

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
      <div className="flex flex-col items-center justify-center gap-4 rounded-[26px] border border-dashed border-primary/30 bg-white/80 p-8 text-center text-sm text-muted-foreground shadow-xl backdrop-blur">
        <Icons.User className="h-6 w-6 text-primary" />
        <div>
          <p className="font-medium text-foreground">登录后参与讨论</p>
          <p className="mt-1 text-muted-foreground">加入社区，分享你的观点并与他人互动。</p>
        </div>
        <Button className="rounded-full px-6">登录</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur-xl sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">发表评论</h3>
            <p className="text-sm text-muted-foreground">保持友善与尊重，让对话更有温度。</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAI(!showAI)}
            className="rounded-full border border-transparent px-4 text-xs font-medium text-primary hover:border-primary/40 hover:bg-primary/10"
          >
            <Icons.Sparkles className="mr-1 h-3.5 w-3.5" />
            AI助手
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border-2 border-white/70 shadow-sm">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
              <AvatarFallback className="font-medium">{user.username.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="写下您的想法..."
                className="min-h-[140px] resize-none border-white/60 bg-white/80 text-base leading-7 text-foreground shadow-inner backdrop-blur focus-visible:border-primary/40"
                maxLength={1000}
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted-foreground">{content.length}/1000</div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-5 py-2 text-sm font-medium"
                >
                  <Icons.Send className="h-4 w-4" />
                  <span className="ml-2">{isSubmitting ? "发布中..." : "发布评论"}</span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {showAI && post && (
        <div className="rounded-[24px] border border-dashed border-primary/30 bg-primary/5 p-4 shadow-inner backdrop-blur">
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
