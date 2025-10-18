"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ForumHeader } from "@/components/forum-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Save, Upload, Eye, EyeOff, Lock, Shield, ArrowLeft, Sparkles } from "lucide-react"
import { useAuthStore } from "@/lib/auth"
import { AnimatedDivider } from "@/components/animated-divider"

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore()
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  })

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    updateUser({
      ...user,
      ...profile,
    })

    toast({
      title: "资料更新成功",
      description: "您的个人资料已成功更新",
    })
  }

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "密码不匹配",
        description: "新密码和确认密码不一致",
        variant: "destructive",
      })
      return
    }

    if (security.newPassword.length < 6) {
      toast({
        title: "密码太短",
        description: "密码至少需要6个字符",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "密码更新成功",
      description: "您的密码已成功更新",
    })

    setSecurity({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleAvatarUpload = () => {
    toast({
      title: "功能开发中",
      description: "头像上传功能正在开发中",
    })
  }

  if (!user) {
    return null
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

        <div className="container relative mx-auto max-w-4xl px-4 pb-16 pt-10 lg:pb-24">
          <div className="mb-8 flex items-center justify-between">
            <Link href={`/user/${user.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="group rounded-full border-primary/20 bg-white/80 px-4 text-primary shadow-sm backdrop-blur-lg transition hover:border-primary/40 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                <span className="ml-2 font-medium">返回个人资料</span>
              </Button>
            </Link>
            <Badge className="rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-medium text-primary">
              设置中心
            </Badge>
          </div>

          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white/85 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-sky-100/40" />
                <div className="absolute right-[-12%] top-[-12%] h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              </div>
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-4 border-white/70 shadow-xl">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                    <AvatarFallback className="text-2xl font-semibold">{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold text-foreground">账户设置</h1>
                    <p className="text-sm text-muted-foreground">管理您的个人资料、联系方式和安全策略。</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-primary" /> 最近更新于：刚刚
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="h-4 w-4 text-primary" /> 安全等级：中
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAvatarUpload}
                  className="rounded-full border-primary/20 bg-white/80 px-4 text-primary"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  上传头像
                </Button>
              </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 gap-2 rounded-full border border-white/60 bg-white/70 p-1 backdrop-blur">
                <TabsTrigger
                  value="profile"
                  className="rounded-full border border-transparent text-sm font-medium text-muted-foreground transition data-[state=active]:border-primary/40 data-[state=active]:bg-white data-[state=active]:text-primary"
                >
                  个人资料
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="rounded-full border border-transparent text-sm font-medium text-muted-foreground transition data-[state=active]:border-primary/40 data-[state=active]:bg-white data-[state=active]:text-primary"
                >
                  安全设置
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="rounded-[32px] border border-white/60 bg-white/85 p-8 shadow-2xl backdrop-blur-xl">
                  <form onSubmit={handleProfileSubmit} className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <Label htmlFor="username">用户名</Label>
                        <Input
                          id="username"
                          value={profile.username}
                          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                          placeholder="输入用户名"
                          className="rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email">邮箱</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          placeholder="输入邮箱地址"
                          className="rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="bio">个人简介</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="介绍一下自己..."
                        className="min-h-[140px] rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-sm leading-7 text-foreground shadow-inner backdrop-blur focus-visible:border-primary/40"
                        maxLength={200}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>展示个性和擅长领域有助于吸引关注</span>
                        <span>{profile.bio.length}/200</span>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <Label htmlFor="location">所在地</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          placeholder="输入所在城市"
                          className="rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="website">个人网站</Label>
                        <Input
                          id="website"
                          type="url"
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          placeholder="https://example.com"
                          className="rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40"
                        />
                      </div>
                    </div>

                    <AnimatedDivider />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted-foreground">
                        建议每季度更新一次资料，保持信息新鲜，让更多志同道合的朋友认识你。
                      </p>
                      <Button type="submit" className="rounded-full px-6 py-2">
                        <Save className="mr-2 h-4 w-4" />
                        保存更改
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="rounded-[32px] border border-white/60 bg-white/85 p-8 shadow-2xl backdrop-blur-xl">
                  <form onSubmit={handleSecuritySubmit} className="space-y-8">
                    <div className="space-y-3">
                      <Label htmlFor="currentPassword">当前密码</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={security.currentPassword}
                          onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                          placeholder="输入当前密码"
                          className="rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 text-primary"
                          onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        >
                          {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <Label htmlFor="newPassword">新密码</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPasswords.new ? "text" : "password"}
                            value={security.newPassword}
                            onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                            placeholder="输入新密码"
                            className="rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 text-primary"
                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                          >
                            {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="confirmPassword">确认新密码</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={security.confirmPassword}
                            onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                            placeholder="再次输入新密码"
                            className="rounded-2xl border-white/60 bg-white/80 px-4 py-3 text-sm shadow-inner backdrop-blur focus-visible:border-primary/40"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 text-primary"
                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                          >
                            {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <AnimatedDivider />

                    <div className="rounded-[24px] border border-primary/20 bg-primary/5 p-6 shadow-inner backdrop-blur">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Lock className="h-4 w-4" /> 密码建议
                      </h4>
                      <ul className="mt-3 space-y-2 text-xs text-primary/80">
                        <li>• 至少 6 个字符，推荐 12 位以上。</li>
                        <li>• 包含大小写字母、数字和符号。</li>
                        <li>• 避免使用常见密码或个人信息。</li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted-foreground">
                        建议定期更换密码，并启用两步验证以加强账户安全。
                      </p>
                      <Button type="submit" className="rounded-full px-6 py-2">
                        <Save className="mr-2 h-4 w-4" />
                        更新密码
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
