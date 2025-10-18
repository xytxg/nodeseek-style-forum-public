import { cn } from "@/lib/utils"

interface AnimatedDividerProps {
  className?: string
}

export function AnimatedDivider({ className }: AnimatedDividerProps) {
  return (
    <div className={cn("relative h-px w-full overflow-hidden rounded-full bg-transparent", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-pulse" />
    </div>
  )
}
