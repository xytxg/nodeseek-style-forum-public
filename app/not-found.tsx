"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
        <div className="absolute left-[-15%] top-[20%] h-[320px] w-[320px] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute right-[-20%] bottom-[-20%] h-[420px] w-[420px] rounded-full bg-purple-200/30 blur-[150px]" />
      </div>

      <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white/85 p-10 text-center shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sky-100/40" />
            <div className="absolute right-[-12%] top-[-12%] h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="relative space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-white/80 text-3xl font-semibold text-primary shadow-inner backdrop-blur">
              404
            </div>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">页面未找到</h1>
            <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base">
              抱歉，您访问的页面可能不存在或已被移除。试着回到首页，探索更多精彩内容。
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/">
                <Button className="rounded-full px-6">
                  <Icons.Home className="h-4 w-4" />
                  <span className="ml-2">返回首页</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="rounded-full border-primary/30 bg-white/80 px-6 text-primary backdrop-blur"
              >
                <Icons.ArrowLeft className="h-4 w-4" />
                <span className="ml-2">返回上页</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
