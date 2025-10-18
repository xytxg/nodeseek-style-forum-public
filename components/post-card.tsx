import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { UserLevelBadge } from "@/components/user-level-badge"
import { DEMO_USER_LEVELS, calculateUserLevel } from "@/lib/user-level"

interface PostCardProps {
  id: string
  title: string
  author: {
    id: string
    name: string
    avatar: string
  }
  topic: string
  replyCount: number
  viewCount: number
  createdAt: string
  isSticky?: boolean
}

const topicLabels: Record<string, string> = {
  daily: "日常",
  tech: "技术",
  info: "信息",
  review: "测评",
  trade: "交易",
  carpool: "拼车",
  promotion: "推广",
}

export function PostCard({ id, title, author, topic, replyCount, viewCount, createdAt, isSticky = false }: PostCardProps) {
  const userLevel = DEMO_USER_LEVELS[author.id] || calculateUserLevel(90)

  return (
    <article className="group relative h-full overflow-hidden rounded-[28px] border border-white/40 bg-white/80 p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.7)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/70 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-2xl">
      <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100" />
      <div className="flex items-start gap-5">
        <Avatar className="h-12 w-12 shrink-0 border-2 border-white/60 shadow-lg ring-2 ring-white/40 ring-offset-2 ring-offset-transparent dark:border-white/20 dark:ring-white/10">
          <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
          <AvatarFallback className="font-semibold text-primary/80 dark:text-primary/60">{author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
                {isSticky && (
                  <Badge className="rounded-full border-transparent bg-amber-400/20 px-3 py-1 text-[10px] font-semibold text-amber-700 dark:bg-amber-400/30 dark:text-amber-200">
                    置顶
                  </Badge>
                )}
                <Badge className="rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-[10px] font-semibold text-primary/70 dark:border-white/10 dark:bg-slate-900/70">
                  {topicLabels[topic] || topic}
                </Badge>
              </div>

              <Link
                href={`/post/${id}`}
                className="block text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 hover:text-primary sm:text-[22px]"
              >
                {title}
              </Link>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors duration-200 dark:border-white/10 dark:bg-slate-900/70 motion-safe:group-hover:border-primary/30 motion-safe:group-hover:text-foreground">
              <Icons.Clock className="h-3.5 w-3.5" />
              {createdAt}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground sm:text-sm">
            <div className="flex items-center gap-2 text-foreground">
              <Link href={`/user/${author.id}`} className="font-medium transition-colors duration-200 hover:text-primary">
                {author.name}
              </Link>
              <UserLevelBadge userLevel={userLevel} />
            </div>

            <span className="flex items-center gap-1">
              <Icons.MessageCircle className="h-3.5 w-3.5" />
              {replyCount} 回复
            </span>

            <span className="flex items-center gap-1">
              <Icons.Eye className="h-3.5 w-3.5" />
              {viewCount} 浏览
            </span>

            <span className="flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm dark:bg-slate-900/70">
              <Icons.Grid3X3 className="h-3 w-3" />
              {topicLabels[topic] || topic}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
