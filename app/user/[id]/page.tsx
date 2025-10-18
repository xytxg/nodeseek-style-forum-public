"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ForumHeader } from "@/components/forum-header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { UserLevelBadge } from "@/components/user-level-badge"
import { DEMO_USER_LEVELS, calculateUserLevel } from "@/lib/user-level"
import { useAuthStore } from "@/lib/auth"
import { usePostsStore } from "@/lib/posts"
import { useCommentsStore } from "@/lib/comments"
import { CalendarDays, MapPin, LinkIcon, MessageSquare, Eye, Sparkles, ArrowLeft } from "lucide-react"

const getUserById = (id: string) => {
  const users = [
    {
      id: "1",
      username: "walker",
      email: "walker@example.com",
      avatar: "/user-walker.jpg",
      bio: "热爱技术，专注于前端开发和用户体验设计。",
      joinDate: "2023年3月",
      location: "北京",
      website: "https://walker.dev",
      postCount: 156,
      commentCount: 892,
      likeCount: 1234,
    },
    {
      id: "2",
      username: "David",
      email: "david@example.com",
      avatar: "/user-david.jpg",
      bio: "全栈开发者，喜欢探索新技术。",
      joinDate: "2023年5月",
      location: "上海",
      website: "",
      postCount: 89,
      commentCount: 456,
      likeCount: 678,
    },
  ]
  return users.find((user) => user.id === id)
}

export default function UserProfilePage() {
  const params = useParams()
  const { user: currentUser } = useAuthStore()
  const { posts } = usePostsStore()
  const { comments } = useCommentsStore()

  const userId = params.id as string
  const profileUser = getUserById(userId)
  const userLevel = DEMO_USER_LEVELS[userId] || calculateUserLevel(90)

  if (!profileUser) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
          <div className="absolute left-[-15%] top-[20%] h-[320px] w-[320px] rounded-full bg-sky-200/30 blur-3xl" />
        </div>
        <ForumHeader />
        <div className="container relative mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center">
          <div className="rounded-[32px] border border-white/60 bg-white/80 p-12 shadow-2xl backdrop-blur-xl">
            <Sparkles className="mx-auto h-10 w-10 text-primary" />
            <h1 className="mt-4 text-2xl font-semibold text-foreground">用户不存在</h1>
            <p className="mt-2 text-sm text-muted-foreground">您访问的用户可能不存在或已离开社区。</p>
            <Link href="/" className="mt-6 inline-flex">
              <Button className="rounded-full px-6">返回首页</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const userPosts = posts.filter((post) => post.author.id === userId)
  const userCommentsList = comments.filter((comment) => comment.author.id === userId)
  const isOwnProfile = currentUser?.id === userId

  const stats = [
    { label: "话题", value: profileUser.postCount },
    { label: "评论", value: profileUser.commentCount },
    { label: "获赞", value: profileUser.likeCount },
    { label: "鸡腿", value: userLevel.drumsticks },
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
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="group rounded-full border-primary/20 bg-white/80 px-4 text-primary shadow-sm backdrop-blur-lg transition hover:border-primary/40 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              <span className="ml-2 font-medium">返回首页</span>
            </Button>
          </Link>
          {isOwnProfile && (
            <Link href="/settings">
              <Button className="rounded-full px-4">
                <Sparkles className="mr-2 h-4 w-4" />
                编辑资料
              </Button>
            </Link>
          )}
        </div>

        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white/85 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-sky-100/40" />
              <div className="absolute right-[-12%] top-[-12%] h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            </div>
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <Avatar className="h-24 w-24 border-4 border-white/70 shadow-xl">
                  <AvatarImage src={profileUser.avatar || "/placeholder.svg"} alt={profileUser.username} />
                  <AvatarFallback className="text-2xl font-semibold">{profileUser.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-semibold text-foreground">{profileUser.username}</h1>
                    <UserLevelBadge userLevel={userLevel} showDrumsticks size="md" />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-xl">{profileUser.bio}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4 text-primary" /> 加入于 {profileUser.joinDate}
                    </span>
                    {profileUser.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary" /> {profileUser.location}
                      </span>
                    )}
                    {profileUser.website && (
                      <a
                        href={profileUser.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <LinkIcon className="h-4 w-4" />
                        {profileUser.website}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-inner backdrop-blur"
                  >
                    <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Tabs defaultValue="posts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 gap-2 rounded-full border border-white/60 bg-white/70 p-1 backdrop-blur">
              <TabsTrigger
                value="posts"
                className="rounded-full border border-transparent text-sm font-medium text-muted-foreground transition data-[state=active]:border-primary/40 data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                话题 ({userPosts.length})
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="rounded-full border border-transparent text-sm font-medium text-muted-foreground transition data-[state=active]:border-primary/40 data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                评论 ({userCommentsList.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-[28px] border border-white/60 bg-white/85 p-4 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-primary/40"
                  >
                    <PostCard {...post} />
                  </div>
                ))
              ) : (
                <div className="rounded-[28px] border border-dashed border-primary/30 bg-primary/5 p-10 text-center text-sm text-muted-foreground">
                  还没有发布任何话题，开始分享你的想法吧。
                </div>
              )}
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              {userCommentsList.length > 0 ? (
                userCommentsList.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-[28px] border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-primary" /> {comment.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-primary" /> 互动 {comment.likes}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-[28px] border border-dashed border-primary/30 bg-primary/5 p-10 text-center text-sm text-muted-foreground">
                  还没有发表任何评论，积极参与讨论会提升曝光度。
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
