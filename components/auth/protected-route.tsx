"use client"

import type React from "react"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, isLoading, checkAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
          <div className="absolute left-[-15%] top-[20%] h-[320px] w-[320px] rounded-full bg-sky-200/30 blur-3xl" />
          <div className="absolute right-[-20%] bottom-[-20%] h-[420px] w-[420px] rounded-full bg-purple-200/30 blur-[150px]" />
        </div>
        <div className="flex items-center gap-3 rounded-full border border-white/60 bg-white/80 px-5 py-3 text-sm font-medium text-muted-foreground shadow-2xl backdrop-blur-xl">
          <Icons.Loader2 className="h-4 w-4 animate-spin text-primary" />
          正在加载您的访问权限...
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      fallback || (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
            <div className="absolute left-[-15%] top-[20%] h-[320px] w-[320px] rounded-full bg-sky-200/30 blur-3xl" />
          </div>
          <div className="rounded-[32px] border border-white/60 bg-white/85 p-8 text-center text-sm text-muted-foreground shadow-2xl backdrop-blur-xl">
            <p className="font-medium text-foreground">正在重定向...</p>
            <p className="mt-2">请稍候，我们会带您返回首页。</p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
