import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { PostsProvider } from "@/lib/posts";
import { CommentsProvider } from "@/lib/comments";
import { CategoriesProvider } from "@/lib/categories";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TechForum - 现代化技术社区",
  description: "A modern tech community inspired by NotSeek",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="h-full">
      <body
        className={cn(
          "relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased transition-colors duration-500",
          "motion-reduce:transition-none font-sans leading-[1.65] tracking-[0.01em]",
          inter.variable,
        )}
      >
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="bg-canvas bg-canvas-animated absolute inset-0"></div>
          <div className="absolute inset-0 bg-noise-overlay" />
        </div>
        <AuthProvider>
          <PostsProvider>
            <CommentsProvider>
              <CategoriesProvider>
                <Suspense fallback={null}>{children}</Suspense>
              </CategoriesProvider>
            </CommentsProvider>
          </PostsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
