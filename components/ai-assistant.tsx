"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, MessageSquare, Shield, Lightbulb } from "lucide-react"
import { AIService } from "@/lib/ai-service"

interface AIAssistantProps {
  mode: "post" | "reply" | "moderate"
  postTitle?: string
  postContent?: string
  topic?: string
  onSuggestionSelect?: (suggestion: string) => void
}

export function AIAssistant({ mode, postTitle = "", postContent = "", topic = "", onSuggestionSelect }: AIAssistantProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [aiResponse, setAiResponse] = useState("")

  const handleGenerateSuggestions = async () => {
    setIsLoading(true)
    setSuggestions([])
    setAiResponse("")

    try {
      if (mode === "post") {
        const response = await AIService.generatePostSuggestions(postTitle, topic)
        setAiResponse(response.content)
        if (response.suggestions) {
          setSuggestions(response.suggestions)
        }
      } else if (mode === "reply") {
        const response = await AIService.generateReplySuggestions(postTitle, postContent)
        setAiResponse(response.content)
        if (response.suggestions) {
          setSuggestions(response.suggestions)
        }
      }
    } catch (error) {
      console.error("AI生成失败:", error)
      setAiResponse("AI助手暂时不可用，请稍后再试。")
    } finally {
      setIsLoading(false)
    }
  }

  const getTitle = () => {
    switch (mode) {
      case "post":
        return "AI写作助手"
      case "reply":
        return "AI回复助手"
      case "moderate":
        return "AI内容审核"
      default:
        return "AI助手"
    }
  }

  const getDescription = () => {
    switch (mode) {
      case "post":
        return "让AI帮你生成有趣的帖子内容"
      case "reply":
        return "获取智能回复建议"
      case "moderate":
        return "AI检查内容是否合适"
      default:
        return "AI智能助手"
    }
  }

  const getIcon = () => {
    switch (mode) {
      case "post":
        return <Lightbulb className="h-4 w-4" />
      case "reply":
        return <MessageSquare className="h-4 w-4" />
      case "moderate":
        return <Shield className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  return (
    <div className="rounded-[24px] border border-white/60 bg-white/85 p-5 shadow-lg backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              {getIcon()}
            </div>
            {getTitle()}
            <Badge variant="secondary" className="rounded-full border border-primary/20 bg-white/80 px-2 text-[10px]">
              AI
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{getDescription()}</p>
        </div>
        <Button
          onClick={handleGenerateSuggestions}
          disabled={isLoading}
          size="sm"
          className="rounded-full px-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              AI思考中...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              获取AI建议
            </>
          )}
        </Button>
      </div>

      {aiResponse && (
        <div className="mt-5 space-y-2">
          <div className="text-xs font-medium text-muted-foreground">AI建议：</div>
          <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground shadow-inner">
            {aiResponse}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-5 space-y-2">
          <div className="text-xs font-medium text-muted-foreground">快速选择：</div>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start rounded-2xl border-primary/20 bg-white/80 p-3 text-left text-xs text-foreground hover:border-primary/40 hover:bg-primary/10"
                onClick={() => onSuggestionSelect?.(suggestion)}
              >
                {suggestion.replace(/^\d+\.\s*/, "")}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
