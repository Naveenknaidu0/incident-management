"use client"

import { cn } from "@/lib/utils"
import {
  Network,
  Server,
  Mail,
  Cloud,
  Shield,
  Database,
  AppWindow,
  Wifi,
  type LucideIcon,
} from "lucide-react"

type KnowledgeCategory =
  | "network"
  | "infrastructure"
  | "email"
  | "cloud"
  | "vpn"
  | "security"
  | "database"
  | "applications"

interface CategoryBadgeProps {
  category: KnowledgeCategory
  showIcon?: boolean
  className?: string
}

const categoryConfig: Record<KnowledgeCategory, { icon: LucideIcon; label: string; color: string }> = {
  network: { icon: Network, label: "Network", color: "bg-blue-50 text-blue-700" },
  infrastructure: { icon: Server, label: "Infrastructure", color: "bg-purple-50 text-purple-700" },
  email: { icon: Mail, label: "Email", color: "bg-pink-50 text-pink-700" },
  cloud: { icon: Cloud, label: "Cloud", color: "bg-cyan-50 text-cyan-700" },
  vpn: { icon: Wifi, label: "VPN", color: "bg-indigo-50 text-indigo-700" },
  security: { icon: Shield, label: "Security", color: "bg-red-50 text-red-700" },
  database: { icon: Database, label: "Database", color: "bg-amber-50 text-amber-700" },
  applications: { icon: AppWindow, label: "Applications", color: "bg-green-50 text-green-700" },
}

export function CategoryBadge({ category, showIcon = true, className }: CategoryBadgeProps) {
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
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  )
}
