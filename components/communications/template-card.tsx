"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChannelBadge } from "./channel-badge"
import { MessagePriorityBadge } from "./message-priority-badge"
import { FileText, MoreHorizontal, Copy, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TemplateCardProps {
  id: string
  name: string
  description: string
  category: string
  priority: "informational" | "warning" | "critical" | "executive-critical"
  channels: Array<"email" | "slack" | "teams" | "sms" | "push">
  lastUsed?: string
  usageCount: number
}

export function TemplateCard({
  id,
  name,
  description,
  category,
  priority,
  channels,
  lastUsed,
  usageCount,
}: TemplateCardProps) {
  return (
    <Card className="group hover:border-[#E69F50]/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 min-w-0">
            <div className="rounded-lg bg-[#0D3133]/10 p-2">
              <FileText className="h-5 w-5 text-[#0D3133]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-[#0D3133]">{name}</h4>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{description}</p>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <Badge variant="secondary">{category}</Badge>
                <MessagePriorityBadge priority={priority} />
              </div>
              <div className="mt-2 flex items-center gap-1">
                {channels.map((channel) => (
                  <ChannelBadge key={channel} channel={channel} showLabel={false} />
                ))}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <Copy className="h-3.5 w-3.5" />
                Use Template
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Edit className="h-3.5 w-3.5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-red-600">
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
          <span>Used {usageCount} times</span>
          {lastUsed && <span>Last used: {lastUsed}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
