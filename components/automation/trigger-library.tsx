"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Zap,
  AlertCircle,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  UserCog,
  Siren,
  Star,
  RefreshCw,
  Search,
} from "lucide-react"
import { useState } from "react"
import { LucideIcon } from "lucide-react"

export interface Trigger {
  id: string
  name: string
  description: string
  icon: LucideIcon
  category: "incident" | "sla" | "assignment" | "escalation"
}

const triggers: Trigger[] = [
  {
    id: "incident-created",
    name: "Incident Created",
    description: "Fires when a new incident is created",
    icon: AlertCircle,
    category: "incident",
  },
  {
    id: "priority-changed",
    name: "Priority Changed",
    description: "Fires when incident priority is updated",
    icon: ArrowUpRight,
    category: "incident",
  },
  {
    id: "status-changed",
    name: "Status Changed",
    description: "Fires when incident status changes",
    icon: RefreshCw,
    category: "incident",
  },
  {
    id: "sla-warning",
    name: "SLA Warning",
    description: "Fires when SLA approaches breach threshold",
    icon: Clock,
    category: "sla",
  },
  {
    id: "sla-breached",
    name: "SLA Breached",
    description: "Fires when SLA is breached",
    icon: AlertTriangle,
    category: "sla",
  },
  {
    id: "assignment-changed",
    name: "Assignment Changed",
    description: "Fires when incident assignment changes",
    icon: UserCog,
    category: "assignment",
  },
  {
    id: "escalation-triggered",
    name: "Escalation Triggered",
    description: "Fires when incident is escalated",
    icon: ArrowUpRight,
    category: "escalation",
  },
  {
    id: "major-incident-created",
    name: "Major Incident Created",
    description: "Fires when major incident is declared",
    icon: Siren,
    category: "incident",
  },
  {
    id: "vip-incident-created",
    name: "VIP Incident Created",
    description: "Fires when VIP incident is created",
    icon: Star,
    category: "incident",
  },
]

const categoryLabels: Record<string, string> = {
  incident: "Incident Events",
  sla: "SLA Events",
  assignment: "Assignment Events",
  escalation: "Escalation Events",
}

interface TriggerLibraryProps {
  onSelectTrigger: (trigger: Trigger) => void
  selectedTriggerId?: string
}

export function TriggerLibrary({ onSelectTrigger, selectedTriggerId }: TriggerLibraryProps) {
  const [search, setSearch] = useState("")

  const filteredTriggers = triggers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  )

  const groupedTriggers = filteredTriggers.reduce((acc, trigger) => {
    if (!acc[trigger.category]) {
      acc[trigger.category] = []
    }
    acc[trigger.category].push(trigger)
    return acc
  }, {} as Record<string, Trigger[]>)

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b border-border p-3">
        <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
          Triggers
        </h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search triggers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-3">
          {Object.entries(groupedTriggers).map(([category, items]) => (
            <div key={category}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {categoryLabels[category]}
              </p>
              <div className="space-y-1">
                {items.map((trigger) => {
                  const Icon = trigger.icon
                  return (
                    <button
                      key={trigger.id}
                      onClick={() => onSelectTrigger(trigger)}
                      className={cn(
                        "flex w-full items-start gap-2 rounded-md p-2 text-left transition-colors hover:bg-muted",
                        selectedTriggerId === trigger.id && "bg-[#E69F50]/10 ring-1 ring-[#E69F50]"
                      )}
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#0D3133]/5">
                        <Icon className="h-3.5 w-3.5 text-[#0D3133]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {trigger.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {trigger.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export { triggers }
