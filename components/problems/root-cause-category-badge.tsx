"use client"

import { cn } from "@/lib/utils"
import {
  Server,
  Network,
  User,
  Code,
  Gauge,
  Shield,
  Globe,
  Settings,
  type LucideIcon,
} from "lucide-react"

type RootCauseCategory =
  | "infrastructure-failure"
  | "network-issue"
  | "human-error"
  | "application-defect"
  | "capacity-issue"
  | "security-incident"
  | "third-party-failure"
  | "process-failure"

interface RootCauseCategoryBadgeProps {
  category: RootCauseCategory
  className?: string
}

const categoryConfig: Record<RootCauseCategory, { label: string; icon: LucideIcon; color: string }> = {
  "infrastructure-failure": { label: "Infrastructure Failure", icon: Server, color: "text-red-600 bg-red-50" },
  "network-issue": { label: "Network Issue", icon: Network, color: "text-orange-600 bg-orange-50" },
  "human-error": { label: "Human Error", icon: User, color: "text-amber-600 bg-amber-50" },
  "application-defect": { label: "Application Defect", icon: Code, color: "text-purple-600 bg-purple-50" },
  "capacity-issue": { label: "Capacity Issue", icon: Gauge, color: "text-blue-600 bg-blue-50" },
  "security-incident": { label: "Security Incident", icon: Shield, color: "text-rose-600 bg-rose-50" },
  "third-party-failure": { label: "Third-Party Failure", icon: Globe, color: "text-slate-600 bg-slate-100" },
  "process-failure": { label: "Process Failure", icon: Settings, color: "text-teal-600 bg-teal-50" },
}

export function RootCauseCategoryBadge({ category, className }: RootCauseCategoryBadgeProps) {
  const config = categoryConfig[category]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        config.color,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}
