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

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToRegister?: () => void
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "请填写完整信息",
        description: "邮箱和密码都是必填项",
        variant: "destructive",
      })
      return
    }

    try {
      await login(email, password)
      toast({
        title: "登录成功",
        description: "欢迎回来！",
      })
      onSuccess?.()
    } catch (error) {
      toast({
        title: "登录失败",
        description: error instanceof Error ? error.message : "请检查邮箱和密码",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="glass-card relative isolate w-full max-w-lg overflow-hidden rounded-[32px] border border-white/30 bg-white/80 px-0 py-0 shadow-[0_32px_120px_-56px_rgba(15,23,42,0.55)] backdrop-blur dark:border-white/10 dark:bg-slate-950/65">
      <span className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-primary/15 blur-3xl dark:bg-primary/25" />
      <span className="pointer-events-none absolute -bottom-24 right-0 h-60 w-60 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-400/20" />
      <CardHeader className="space-y-3 px-8 pt-8 pb-4">
        <CardTitle className="text-3xl font-semibold tracking-tight text-foreground">登录</CardTitle>
        <CardDescription className="text-[15px] leading-relaxed text-muted-foreground">
          输入账号信息，继续探索社区的灵感与讨论。
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
            <Label htmlFor="password" className="text-sm font-medium text-foreground/80">
              密码
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="h-12 rounded-full border-white/30 bg-white/60 px-5 text-base shadow-inner backdrop-blur focus:border-primary/40 focus:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus:bg-white/15"
            />
          </div>
          <Button
            type="submit"
            className="h-12 w-full rounded-full text-base font-semibold shadow-[0_22px_80px_-48px_rgba(37,99,235,0.6)] transition-transform duration-200 hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading && <Icons.Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            登录
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          还没有账户？
          <Button
            variant="link"
            className="ml-1 inline-flex h-auto p-0 text-primary transition hover:text-primary/80"
            onClick={onSwitchToRegister}
          >
            立即注册
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
