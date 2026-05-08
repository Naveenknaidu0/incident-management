"use client"

import { cn } from "@/lib/utils"
import { Mail, MessageSquare, Phone, Bell, Webhook, Globe, Send } from "lucide-react"

type Channel = "email" | "slack" | "teams" | "sms" | "push" | "webhook" | "status-page"

interface ChannelBadgeProps {
  channel: Channel
  className?: string
  showLabel?: boolean
  size?: "sm" | "md"
}

const channelConfig: Record<Channel, { label: string; icon: typeof Mail; color: string }> = {
  email: { label: "Email", icon: Mail, color: "text-blue-600" },
  slack: { label: "Slack", icon: MessageSquare, color: "text-purple-600" },
  teams: { label: "Teams", icon: Send, color: "text-indigo-600" },
  sms: { label: "SMS", icon: Phone, color: "text-green-600" },
  push: { label: "Push", icon: Bell, color: "text-amber-600" },
  webhook: { label: "Webhook", icon: Webhook, color: "text-slate-600" },
  "status-page": { label: "Status Page", icon: Globe, color: "text-[#0D3133]" },
}

export function ChannelBadge({ channel, className, showLabel = true, size = "sm" }: ChannelBadgeProps) {
  const config = channelConfig[channel]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5",
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
    >
      <Icon className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4", config.color)} />
      {showLabel && <span className="text-muted-foreground">{config.label}</span>}
    </span>
  )
}
