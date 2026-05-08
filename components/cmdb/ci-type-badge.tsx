"use client"

import { cn } from "@/lib/utils"
import { 
  Server, 
  Database, 
  Globe, 
  Cloud, 
  Network, 
  Container, 
  HardDrive,
  Cpu,
  type LucideIcon
} from "lucide-react"

type CIType = "server" | "database" | "application" | "api" | "cloud" | "network" | "container" | "storage"

interface CITypeBadgeProps {
  type: CIType
  showLabel?: boolean
  className?: string
}

const typeConfig: Record<CIType, { icon: LucideIcon; bg: string; text: string; label: string }> = {
  server: { icon: Server, bg: "bg-slate-100", text: "text-slate-700", label: "Server" },
  database: { icon: Database, bg: "bg-blue-50", text: "text-blue-700", label: "Database" },
  application: { icon: Globe, bg: "bg-purple-50", text: "text-purple-700", label: "Application" },
  api: { icon: Cpu, bg: "bg-green-50", text: "text-green-700", label: "API" },
  cloud: { icon: Cloud, bg: "bg-sky-50", text: "text-sky-700", label: "Cloud Resource" },
  network: { icon: Network, bg: "bg-amber-50", text: "text-amber-700", label: "Network" },
  container: { icon: Container, bg: "bg-teal-50", text: "text-teal-700", label: "Container" },
  storage: { icon: HardDrive, bg: "bg-orange-50", text: "text-orange-700", label: "Storage" },
}

export function CITypeBadge({ type, showLabel = true, className }: CITypeBadgeProps) {
  const config = typeConfig[type]
  const Icon = config.icon
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {showLabel && config.label}
    </span>
  )
}
