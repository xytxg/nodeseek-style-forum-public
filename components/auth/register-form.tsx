"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { register, isLoading } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !username || !password || !confirmPassword) {
      toast({
        title: "请填写完整信息",
        description: "所有字段都是必填项",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "密码不匹配",
        description: "请确认两次输入的密码相同",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "密码太短",
        description: "密码至少需要6个字符",
        variant: "destructive",
      })
      return
    }

    try {
      await register(email, username, password)
      toast({
        title: "注册成功",
        description: "欢迎加入我们的社区！",
      })
      onSuccess?.()
    } catch (error) {
      toast({
        title: "注册失败",
        description: error instanceof Error ? error.message : "请稍后重试",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="glass-card relative isolate w-full max-w-lg overflow-hidden rounded-[32px] border border-white/30 bg-white/80 px-0 py-0 shadow-[0_32px_120px_-56px_rgba(15,23,42,0.55)] backdrop-blur dark:border-white/10 dark:bg-slate-950/65">
      <span className="pointer-events-none absolute -left-20 -top-12 h-60 w-60 rounded-full bg-fuchsia-500/20 blur-3xl dark:bg-fuchsia-500/30" />
      <span className="pointer-events-none absolute -bottom-20 right-[-36px] h-56 w-56 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-500/25" />
      <CardHeader className="space-y-3 px-8 pt-8 pb-4">
        <CardTitle className="text-3xl font-semibold tracking-tight text-foreground">注册</CardTitle>
        <CardDescription className="text-[15px] leading-relaxed text-muted-foreground">
          创建您的账户，解锁发布、收藏与互动等完整社区体验。
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground/80">
              邮箱
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-12 rounded-full border-white/30 bg-white/60 px-5 text-base shadow-inner backdrop-blur focus:border-primary/40 focus:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus:bg-white/15"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-foreground/80">
              用户名
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="h-12 rounded-full border-white/30 bg-white/60 px-5 text-base shadow-inner backdrop-blur focus:border-primary/40 focus:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus:bg-white/15"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground/80">
              密码
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="输入密码（至少6位）"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="h-12 rounded-full border-white/30 bg-white/60 px-5 text-base shadow-inner backdrop-blur focus:border-primary/40 focus:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus:bg-white/15"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">
              确认密码
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="再次输入密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className="h-12 rounded-full border-white/30 bg-white/60 px-5 text-base shadow-inner backdrop-blur focus:border-primary/40 focus:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus:bg-white/15"
            />
          </div>
          <Button
            type="submit"
            className="h-12 w-full rounded-full text-base font-semibold shadow-[0_24px_90px_-50px_rgba(236,72,153,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading && <Icons.Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            注册
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          注册即表示您同意社区的使用条款与隐私政策。
        </p>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          已有账户？
          <Button
            variant="link"
            className="ml-1 inline-flex h-auto p-0 text-primary transition hover:text-primary/80"
            onClick={onSwitchToLogin}
          >
            立即登录
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
