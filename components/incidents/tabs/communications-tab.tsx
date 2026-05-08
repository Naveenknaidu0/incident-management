"use client"

import { useState } from "react"
import { 
  Mail, MessageSquare, Phone, Users, Globe, Lock, Crown, Send, 
  ChevronDown, Plus, ExternalLink 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Communication {
  id: string
  type: "email" | "slack" | "teams" | "call" | "status-page"
  visibility: "internal" | "external" | "executive" | "customer"
  subject: string
  preview: string
  sender: { name: string; initials: string }
  timestamp: string
  recipients: string
}

const communications: Communication[] = [
  {
    id: "1",
    type: "slack",
    visibility: "internal",
    subject: "Payment Incident Update",
    preview: "Hotfix deployed, monitoring in progress. Error rates dropping.",
    sender: { name: "Sarah Chen", initials: "SC" },
    timestamp: "5 min ago",
    recipients: "#incident-payment-42781",
  },
  {
    id: "2",
    type: "email",
    visibility: "executive",
    subject: "P1 Payment Incident - Status Update",
    preview: "Executive summary: Root cause identified, resolution in progress...",
    sender: { name: "John Doe", initials: "JD" },
    timestamp: "15 min ago",
    recipients: "executive-team@company.com",
  },
  {
    id: "3",
    type: "status-page",
    visibility: "customer",
    subject: "Payment Processing - Investigating",
    preview: "We are investigating issues with payment processing in some regions...",
    sender: { name: "StatusBot", initials: "SB" },
    timestamp: "25 min ago",
    recipients: "Public Status Page",
  },
  {
    id: "4",
    type: "call",
    visibility: "internal",
    subject: "War Room Bridge Call",
    preview: "Active bridge call with 8 participants",
    sender: { name: "System", initials: "SY" },
    timestamp: "30 min ago",
    recipients: "Payment Ops, Database Ops, SRE",
  },
  {
    id: "5",
    type: "teams",
    visibility: "internal",
    subject: "Database Team Notification",
    preview: "Database connection pool issue identified. Need DBA support.",
    sender: { name: "Sarah Chen", initials: "SC" },
    timestamp: "40 min ago",
    recipients: "Database Operations Team",
  },
  {
    id: "6",
    type: "email",
    visibility: "external",
    subject: "Service Disruption Notice - Payment Processing",
    preview: "Dear Partner, We are currently experiencing issues with...",
    sender: { name: "John Doe", initials: "JD" },
    timestamp: "45 min ago",
    recipients: "API Partners (12)",
  },
]

const typeIcons = {
  email: Mail,
  slack: MessageSquare,
  teams: MessageSquare,
  call: Phone,
  "status-page": Globe,
}

const visibilityConfig = {
  internal: { icon: Lock, label: "Internal", color: "bg-slate-100 text-slate-700" },
  external: { icon: Globe, label: "External", color: "bg-blue-100 text-blue-700" },
  executive: { icon: Crown, label: "Executive", color: "bg-purple-100 text-purple-700" },
  customer: { icon: Users, label: "Customer", color: "bg-green-100 text-green-700" },
}

const templates = [
  "Initial Notification",
  "Status Update",
  "Resolution Notice",
  "Post-Incident Summary",
  "Executive Brief",
  "Customer Apology",
]

export function CommunicationsTab() {
  const [selectedVisibility, setSelectedVisibility] = useState<string>("all")

  const filteredComms = selectedVisibility === "all" 
    ? communications 
    : communications.filter(c => c.visibility === selectedVisibility)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-card-foreground">Communications</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {communications.length} messages
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Visibility Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {selectedVisibility === "all" ? "All Types" : visibilityConfig[selectedVisibility as keyof typeof visibilityConfig]?.label}
                <ChevronDown className="ml-1.5 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedVisibility("all")}>All Types</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedVisibility("internal")}>Internal</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedVisibility("external")}>External</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedVisibility("executive")}>Executive</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedVisibility("customer")}>Customer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* New Communication */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-[#0D3133] text-white hover:bg-[#0D3133]/90">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                New Update
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {templates.map((template) => (
                <DropdownMenuItem key={template}>{template}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Compose */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex gap-3">
          <div className="flex-1 space-y-3">
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Users className="mr-1.5 h-3.5 w-3.5" />
                    Select Audience
                    <ChevronDown className="ml-1.5 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Internal Team</DropdownMenuItem>
                  <DropdownMenuItem>Executive Team</DropdownMenuItem>
                  <DropdownMenuItem>Affected Customers</DropdownMenuItem>
                  <DropdownMenuItem>API Partners</DropdownMenuItem>
                  <DropdownMenuItem>Status Page</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                    Channel
                    <ChevronDown className="ml-1.5 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Slack</DropdownMenuItem>
                  <DropdownMenuItem>Teams</DropdownMenuItem>
                  <DropdownMenuItem>Status Page</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <textarea
              placeholder="Compose your update message..."
              className="min-h-[80px] w-full resize-none rounded-md border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:border-[#E69F50] focus:outline-none focus:ring-1 focus:ring-[#E69F50]"
            />
            <div className="flex justify-end">
              <Button size="sm" className="bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90">
                <Send className="mr-1.5 h-3.5 w-3.5" />
                Send Update
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Timeline */}
      <div className="space-y-3">
        {filteredComms.map((comm) => {
          const TypeIcon = typeIcons[comm.type]
          const visConfig = visibilityConfig[comm.visibility]
          const VisIcon = visConfig.icon

          return (
            <div key={comm.id} className="rounded-lg border border-border bg-card p-4 hover:bg-muted/20">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <TypeIcon className="h-5 w-5 text-muted-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${visConfig.color}`}>
                      <VisIcon className="h-3 w-3" />
                      {visConfig.label}
                    </span>
                    <span className="text-sm font-medium text-card-foreground">{comm.subject}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{comm.preview}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0D3133] text-[8px] font-semibold text-white">
                        {comm.sender.initials}
                      </div>
                      {comm.sender.name}
                    </span>
                    <span>{comm.timestamp}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {comm.recipients}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <Button variant="ghost" size="sm" className="shrink-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
