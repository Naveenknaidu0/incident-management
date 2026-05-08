"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChannelBadge } from "./channel-badge"
import { Mail, Phone, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface StakeholderCardProps {
  name: string
  initials: string
  role: string
  group: "executive" | "service-owner" | "operations" | "engineering" | "customer" | "vendor"
  email: string
  phone?: string
  preferredChannels: Array<"email" | "slack" | "teams" | "sms" | "push">
  escalationLevel: number
  lastContact?: string
  isOnline?: boolean
}

const groupLabels: Record<string, { label: string; color: string }> = {
  executive: { label: "Executive", color: "bg-purple-100 text-purple-700" },
  "service-owner": { label: "Service Owner", color: "bg-blue-100 text-blue-700" },
  operations: { label: "Operations", color: "bg-green-100 text-green-700" },
  engineering: { label: "Engineering", color: "bg-amber-100 text-amber-700" },
  customer: { label: "Customer", color: "bg-slate-100 text-slate-700" },
  vendor: { label: "Vendor", color: "bg-indigo-100 text-indigo-700" },
}

export function StakeholderCard({
  name,
  initials,
  role,
  group,
  email,
  phone,
  preferredChannels,
  escalationLevel,
  lastContact,
  isOnline,
}: StakeholderCardProps) {
  const groupConfig = groupLabels[group]

  return (
    <Card className="group hover:border-[#E69F50]/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-[#0D3133] text-white text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {isOnline && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#0D3133]">{name}</h4>
              <p className="text-xs text-muted-foreground">{role}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge variant="secondary" className={groupConfig.color}>
                  {groupConfig.label}
                </Badge>
                <span className="text-xs text-muted-foreground">L{escalationLevel}</span>
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
                <Mail className="h-3.5 w-3.5" />
                Send Message
              </DropdownMenuItem>
              {phone && (
                <DropdownMenuItem className="gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {preferredChannels.map((channel) => (
              <ChannelBadge key={channel} channel={channel} showLabel={false} />
            ))}
          </div>
          {lastContact && (
            <span className="text-xs text-muted-foreground">Last: {lastContact}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
