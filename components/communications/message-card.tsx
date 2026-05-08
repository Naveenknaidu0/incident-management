"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DeliveryStatusBadge } from "./delivery-status-badge"
import { ChannelBadge } from "./channel-badge"
import { MessagePriorityBadge } from "./message-priority-badge"
import { MoreHorizontal, Eye, RotateCw, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface MessageCardProps {
  id: string
  subject: string
  preview: string
  sender: { name: string; initials: string }
  sentAt: string
  status: "queued" | "sending" | "delivered" | "failed" | "read" | "acknowledged"
  priority: "informational" | "warning" | "critical" | "executive-critical"
  channels: Array<"email" | "slack" | "teams" | "sms" | "push" | "webhook" | "status-page">
  audience: string
  incidentId?: string
}

export function MessageCard({
  id,
  subject,
  preview,
  sender,
  sentAt,
  status,
  priority,
  channels,
  audience,
  incidentId,
}: MessageCardProps) {
  return (
    <Card className="group hover:border-[#E69F50]/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-[#0D3133] text-white text-xs">
                {sender.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-medium text-[#0D3133] truncate">{subject}</h4>
                <MessagePriorityBadge priority={priority} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{preview}</p>
              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <span className="text-xs text-muted-foreground">To: {audience}</span>
                {incidentId && (
                  <Link href={`/incidents/${incidentId}`} className="text-xs text-[#E69F50] hover:underline">
                    {incidentId}
                  </Link>
                )}
                <div className="flex items-center gap-1">
                  {channels.map((channel) => (
                    <ChannelBadge key={channel} channel={channel} showLabel={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <DeliveryStatusBadge status={status} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Eye className="h-3.5 w-3.5" />
                    View Details
                  </DropdownMenuItem>
                  {status === "failed" && (
                    <DropdownMenuItem className="gap-2">
                      <RotateCw className="h-3.5 w-3.5" />
                      Retry Delivery
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="gap-2">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open Incident
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <span className="text-xs text-muted-foreground">{sentAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
