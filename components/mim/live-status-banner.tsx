"use client"

import { AlertTriangle, Radio, Server, MessageSquare, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiveStatusBannerProps {
  severity: "SEV-1" | "SEV-2" | "SEV-3" | "SEV-4"
  status: string
  impactedServices: number
  recoveryProgress: number
  lastUpdate: string
}

const severityBg = {
  "SEV-1": "bg-red-600",
  "SEV-2": "bg-orange-500",
  "SEV-3": "bg-amber-500",
  "SEV-4": "bg-[#73847B]",
}

export function LiveStatusBanner({
  severity,
  status,
  impactedServices,
  recoveryProgress,
  lastUpdate,
}: LiveStatusBannerProps) {
  return (
    <div className={cn("shrink-0 h-10 px-4 flex items-center justify-between text-white", severityBg[severity])}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Radio className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-white animate-ping" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide">Live Incident</span>
        </div>

        <div className="h-4 w-px bg-white/30" />

        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{status}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Server className="h-3.5 w-3.5" />
          <span className="text-xs">{impactedServices} Services Impacted</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5" />
          <span className="text-xs">Recovery: {recoveryProgress}%</span>
          <div className="w-20 h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${recoveryProgress}%` }}
            />
          </div>
        </div>

        <div className="h-4 w-px bg-white/30" />

        <div className="flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5" />
          <span className="text-xs">Last Update: {lastUpdate}</span>
        </div>
      </div>
    </div>
  )
}
