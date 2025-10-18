"use client"

import { useState } from "react"

import { Icons } from "@/components/icons"
import { UserLevelBadge } from "@/components/user-level-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/auth"
import { type Comment, useCommentsStore } from "@/lib/comments"
import { DEMO_USER_LEVELS, calculateUserLevel } from "@/lib/user-level"

interface CommentItemProps {
  comment: Comment
  onReply?: () => void
}

export function CommentItem({ comment }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [editContent, setEditContent] = useState(comment.content)

  const { addComment, updateComment, deleteComment, getRepliesByCommentId, likeComment, unlikeComment } = useCommentsStore()
  const { user } = useAuthStore()
  const { toast } = useToast()

  const replies = getRepliesByCommentId(comment.id)
  const isLiked = user ? comment.likedBy.includes(user.id) : false
  const isAuthor = user?.id === comment.author.id
  const commentAuthorLevel = DEMO_USER_LEVELS[comment.author.id] || calculateUserLevel(90)

  const handleLike = () => {
    if (!user) {
      toast({
        title: "请先登录",
        description: "登录后才能点赞评论",
        variant: "destructive",
      })
      return
    }

    if (isLiked) {
      unlikeComment(comment.id, user.id)
    } else {
      likeComment(comment.id, user.id)
    }
  }

  const handleReply = () => {
    if (!user) {
      toast({
        title: "请先登录",
        description: "登录后才能回复评论",
        variant: "destructive",
      })
      return
    }

    if (!replyContent.trim()) {
      toast({
        title: "请输入回复内容",
        variant: "destructive",
      })
      return
    }

    addComment({
      postId: comment.postId,
      content: replyContent.trim(),
      parentId: comment.id,
      author: {
        id: user.id,
        name: user.username,
        avatar: user.avatar || "/placeholder.svg",
      },
    })

    setReplyContent("")
    setIsReplying(false)
    toast({
      title: "回复成功",
    })
  }

  const handleEdit = () => {
    if (!editContent.trim()) {
      toast({
        title: "请输入评论内容",
        variant: "destructive",
      })
      return
    }

    updateComment(comment.id, { content: editContent.trim() })
    setIsEditing(false)
    toast({
      title: "编辑成功",
    })
  }

  const handleDelete = () => {
    if (confirm("确定要删除这条评论吗？此操作无法撤销。")) {
      deleteComment(comment.id)
      toast({
        title: "删除成功",
      })
    }
  }

  return (
    <div className="space-y-5">
      <article className="group relative overflow-hidden rounded-[26px] border border-white/35 bg-white/85 px-6 py-6 shadow-[0_25px_90px_-65px_rgba(15,23,42,0.7)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/75 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-2xl">
        <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100" />
        <div className="flex items-start gap-4 sm:gap-5">
          <Avatar className="h-11 w-11 shrink-0 border-2 border-white/70 shadow-lg ring-2 ring-white/40 ring-offset-2 ring-offset-transparent dark:border-white/20 dark:ring-white/10">
            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
            <AvatarFallback className="font-semibold text-primary/80 dark:text-primary/60">
              {comment.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
              <span className="font-medium text-foreground">{comment.author.name}</span>
              <UserLevelBadge userLevel={commentAuthorLevel} />
              <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm dark:bg-slate-900/70">
                {comment.createdAt}
              </span>
              {comment.updatedAt !== comment.createdAt && (
                <span className="rounded-full bg-white/50 px-3 py-1 text-[11px] font-medium text-muted-foreground dark:bg-slate-900/60">
                  已编辑
                </span>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="编辑评论..."
                  className="min-h-[120px] resize-none rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-base leading-7 text-foreground shadow-inner backdrop-blur focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20 dark:border-white/10 dark:bg-slate-900/70"
                />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={handleEdit} className="rounded-full px-4 py-1.5 shadow-md">
                    <Icons.Send className="h-4 w-4" />
                    <span className="ml-1.5">保存</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="rounded-full border-white/60 bg-white/60 px-4 py-1.5 text-muted-foreground shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60"
                  >
                    取消
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-muted-foreground sm:text-base">
                  {comment.content}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={`h-8 rounded-full border border-transparent px-3 py-1 transition-all motion-safe:hover:-translate-y-0.5 ${
                      isLiked
                        ? "border-rose-200 bg-rose-100/60 text-rose-600 dark:border-rose-300/40 dark:bg-rose-300/10 dark:text-rose-300"
                        : "bg-white/70 text-muted-foreground hover:border-primary/30 hover:text-primary dark:bg-slate-900/60"
                    }`}
                  >
                    <Icons.Heart className={`mr-1 h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
                    {comment.likes > 0 ? comment.likes : "点赞"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsReplying(!isReplying)}
                    className="h-8 rounded-full border border-white/40 bg-white/70 px-3 py-1 text-muted-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-slate-900/60"
                  >
                    <Icons.MessageCircle className="mr-1 h-3.5 w-3.5" />
                    回复
                  </Button>

                  {isAuthor && (
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="h-8 rounded-full border border-white/40 bg-white/70 px-3 py-1 text-muted-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-slate-900/60"
                      >
                        <Icons.Edit className="mr-1 h-3.5 w-3.5" />
                        编辑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                        className="h-8 rounded-full border border-transparent px-3 py-1 text-destructive shadow-sm transition-colors hover:border-destructive/40 hover:bg-destructive/10"
                      >
                        <Icons.Trash2 className="mr-1 h-3.5 w-3.5" />
                        删除
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </article>

      {isReplying && (
        <div className="ml-11 border-l border-dashed border-white/40 pl-5 dark:border-white/10 sm:ml-14 sm:pl-7">
          <div className="rounded-[22px] border border-white/45 bg-white/80 px-5 py-4 shadow-inner backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
            <div className="space-y-3">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="写下您的回复..."
                className="min-h-[110px] resize-none rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm leading-7 text-foreground shadow-inner backdrop-blur focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20 dark:border-white/10 dark:bg-slate-900/70"
              />
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={handleReply} className="rounded-full px-4 py-1.5 shadow-md">
                  <Icons.Send className="h-4 w-4" />
                  <span className="ml-1.5">回复</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsReplying(false)}
                  className="rounded-full border-white/60 bg-white/60 px-4 py-1.5 text-muted-foreground shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60"
                >
                  取消
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {replies.length > 0 && (
        <div className="ml-11 space-y-4 border-l border-dashed border-white/35 pl-5 dark:border-white/10 sm:ml-14 sm:pl-7">
          {replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  )
}
