import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { UserLevelBadge } from "@/components/user-level-badge"
import { DEMO_USER_LEVELS, calculateUserLevel } from "@/lib/user-level"
import Link from "next/link"

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
    <div className="group flex flex-col gap-3 rounded-[24px] border border-white/60 bg-white/80 p-5 shadow-inner backdrop-blur transition hover:-translate-y-1 hover:border-primary/40">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border-2 border-white/70 shadow-sm">
          <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
          <AvatarFallback className="font-semibold">{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary/70">
            {isSticky && (
              <Badge className="rounded-full bg-primary/10 px-3 text-[10px] font-semibold text-primary">置顶</Badge>
            )}
            <Badge variant="secondary" className="rounded-full border border-primary/20 bg-white/70 px-3 text-[10px]">
              {topicLabels[topic] || topic}
            </Badge>
          </div>
          <Link href={`/post/${id}`} className="block text-base font-semibold leading-6 text-foreground transition group-hover:text-primary">
            {title}
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Link href={`/user/${author.id}`} className="font-medium text-foreground transition hover:text-primary">
                {author.name}
              </Link>
              <UserLevelBadge userLevel={userLevel} />
            </div>
            <span className="flex items-center gap-1">
              <Icons.MessageCircle className="h-3.5 w-3.5" /> {replyCount}
            </span>
            <span className="flex items-center gap-1">
              <Icons.Eye className="h-3.5 w-3.5" /> {viewCount}
            </span>
            <span className="flex items-center gap-1">
              <Icons.Clock className="h-3.5 w-3.5" /> {createdAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
