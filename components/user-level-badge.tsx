"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type UserLevel, getLevelDisplay } from "@/lib/user-level"

interface UserLevelBadgeProps {
  userLevel: UserLevel
  showDrumsticks?: boolean
  size?: "sm" | "md" | "lg"
}

const levelStyles: Record<number, string> = {
  0: "border-white/20 bg-gradient-to-r from-slate-500/50 via-slate-500/40 to-slate-600/50 text-white shadow-[0_16px_40px_-28px_rgba(100,116,139,0.65)]",
  1: "border-white/20 bg-gradient-to-r from-sky-500/55 via-blue-500/45 to-indigo-500/55 text-white shadow-[0_16px_40px_-28px_rgba(56,189,248,0.62)]",
  2: "border-white/20 bg-gradient-to-r from-emerald-500/55 via-emerald-400/45 to-teal-500/55 text-white shadow-[0_16px_40px_-28px_rgba(16,185,129,0.58)]",
  3: "border-white/20 bg-gradient-to-r from-amber-400/55 via-orange-400/45 to-rose-400/55 text-slate-900 shadow-[0_16px_40px_-28px_rgba(251,191,36,0.6)]",
  4: "border-white/20 bg-gradient-to-r from-purple-500/55 via-fuchsia-500/45 to-violet-500/55 text-white shadow-[0_16px_40px_-28px_rgba(168,85,247,0.62)]",
  5: "border-white/20 bg-gradient-to-r from-rose-500/60 via-pink-500/50 to-amber-400/55 text-white shadow-[0_18px_48px_-30px_rgba(244,114,182,0.68)]",
  6: "border-white/20 bg-gradient-to-r from-indigo-500/60 via-purple-500/45 to-sky-500/60 text-white shadow-[0_20px_52px_-32px_rgba(129,140,248,0.7)]",
}

const sizeClasses: Record<NonNullable<UserLevelBadgeProps["size"]>, string> = {
  sm: "px-2.5 py-1 text-[10px] uppercase tracking-[0.26em]",
  md: "px-3 py-1.5 text-xs uppercase tracking-[0.3em]",
  lg: "px-3.5 py-2 text-sm uppercase tracking-[0.32em]",
}

const drumstickClasses: Record<NonNullable<UserLevelBadgeProps["size"]>, string> = {
  sm: "text-[11px]",
  md: "text-xs",
  lg: "text-sm",
}

function LiveIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 2633 1024"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M169.545143 163.181714h2248.923428v707.364572H169.545143z" fill="currentColor" opacity="0.15"></path>
      <path
        d="M2510.994286 73.142857c22.747429 0 45.494857 20.772571 44.397714 43.300572l-0.950857 6.144v747.446857c0 22.381714-15.36 44.909714-41.472 48.786285l-8.118857 0.585143H144.676571a48.859429 48.859429 0 0 1-49.005714-41.252571l-0.512-8.118857V209.042286c0-22.454857 15.36-44.982857 41.398857-48.859429l8.118857-0.585143h1021.805715v-37.010285c0-22.454857 15.36-44.982857 41.472-48.859429l8.045714-0.585143h1295.067429zM2170.88 174.518857l-272.310857 370.614857a27.867429 27.867429 0 0 0 22.528 44.397715h176.713143l-30.427429 210.944c-4.169143 28.745143 32.914286 43.958857 50.176 20.48l272.237714-370.541715a27.940571 27.940571 0 0 0-22.528-44.470857h-176.713142l30.427428-210.870857c4.169143-28.818286-32.914286-43.958857-50.102857-20.553143z m-484.059429 3.584h-384c-18.505143 0-37.010286 18.578286-37.010285 37.083429v574.464c0 18.578286 18.505143 37.083428 37.083428 37.083428h384c18.505143 0 37.083429-18.505143 37.083429-37.083428V474.624c0-18.505143-18.578286-37.010286-37.156572-37.010286h-297.179428V301.714286h297.179428c18.578286 0 37.156571-18.578286 37.156572-37.083429v-49.444571c0-18.505143-18.578286-37.083429-37.156572-37.083429zM733.037714 264.630857h-49.517714c-18.578286 0-37.156571 18.505143-37.156571 37.083429v302.665143c0 16.822857 0 31.817143 6.217142 37.083428l173.348572 172.909714c12.434286 12.361143 43.373714 12.361143 43.373714 12.361143s30.939429 0 43.373714-12.361143l185.782858-172.909714c6.144-6.217143 6.144-18.578286 6.144-30.866286V307.858286c0-18.505143-18.578286-37.010286-37.156572-37.010286h-49.444571c-18.651429 0-37.229714 18.505143-37.229715 37.010286V585.874286l-105.325714 104.96L770.194286 585.874286V301.714286c0-18.578286-18.578286-37.083429-37.156572-37.083429z m-445.878857 0h-49.590857c-16.530286 0-32.987429 14.628571-36.498286 30.939429l-0.658285 6.144v488.009143c0 16.457143 14.628571 32.914286 31.012571 36.352l6.144 0.658285h297.252571c16.530286 0 33.060571-14.628571 36.571429-30.866285l0.585143-6.144v-49.444572c0-16.530286-14.628571-32.914286-30.939429-36.425143l-6.217143-0.658285H324.315429V301.714286c0-18.578286-18.578286-37.083429-37.156572-37.083429z m1312.914286 296.521143v142.043429h-210.505143V561.152h210.432z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export function UserLevelBadge({ userLevel, showDrumsticks = false, size = "sm" }: UserLevelBadgeProps) {
  if (userLevel.isSuper) {
    return (
      <div className="flex items-center gap-2">
        <Badge
          variant="glass"
          className={cn(
            "border-rose-400/45 bg-rose-500/20 text-rose-100 shadow-[0_18px_48px_-30px_rgba(244,63,94,0.68)]",
            sizeClasses[size],
            "tracking-[0.28em]",
          )}
        >
          LIVE
        </Badge>
        <LiveIcon className="h-4 w-auto text-rose-400 drop-shadow-[0_8px_20px_rgba(244,63,94,0.55)]" />
        {showDrumsticks && (
          <span
            className={cn(
              "rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-foreground/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]",
              drumstickClasses[size],
            )}
          >
            🍗 {userLevel.drumsticks}
          </span>
        )}
      </div>
    )
  }

  const levelClassName = levelStyles[userLevel.level] ?? levelStyles[0]

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="glass"
        className={cn(
          "flex items-center gap-2 border bg-gradient-to-r uppercase",
          levelClassName,
          sizeClasses[size],
        )}
      >
        <span className="drop-shadow-[0_4px_14px_rgba(15,23,42,0.45)]">{getLevelDisplay(userLevel)}</span>
      </Badge>
      {showDrumsticks && (
        <span
          className={cn(
            "rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-foreground/65 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
            drumstickClasses[size],
          )}
        >
          🍗 {userLevel.drumsticks}
        </span>
      )}
    </div>
  )
}
