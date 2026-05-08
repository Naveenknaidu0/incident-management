"use client"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  UserPlus,
  ArrowUpRight,
  Users,
  Mail,
  ListTodo,
  Siren,
  Tag,
  RefreshCw,
  Pause,
  FileText,
  MessageSquare,
  Bell,
  Webhook,
  CheckCircle,
  Clock,
} from "lucide-react"
import { useState } from "react"
import { LucideIcon } from "lucide-react"

export interface Action {
  id: string
  name: string
  description: string
  icon: LucideIcon
  category: "assignment" | "notification" | "status" | "record" | "integration"
}

const actions: Action[] = [
  {
    id: "assign-incident",
    name: "Assign Incident",
    description: "Assign incident to user or group",
    icon: UserPlus,
    category: "assignment",
  },
  {
    id: "escalate",
    name: "Escalate",
    description: "Escalate to next level",
    icon: ArrowUpRight,
    category: "assignment",
  },
  {
    id: "notify-stakeholders",
    name: "Notify Stakeholders",
    description: "Send notification to stakeholders",
    icon: Users,
    category: "notification",
  },
  {
    id: "send-email",
    name: "Send Email",
    description: "Send email notification",
    icon: Mail,
    category: "notification",
  },
  {
    id: "push-notification",
    name: "Push Notification",
    description: "Send push notification",
    icon: Bell,
    category: "notification",
  },
  {
    id: "post-message",
    name: "Post Message",
    description: "Post to Slack/Teams",
    icon: MessageSquare,
    category: "notification",
  },
  {
    id: "create-task",
    name: "Create Task",
    description: "Create a new task",
    icon: ListTodo,
    category: "record",
  },
  {
    id: "launch-major-incident",
    name: "Launch Major Incident",
    description: "Trigger major incident workflow",
    icon: Siren,
    category: "status",
  },
  {
    id: "add-tags",
    name: "Add Tags",
    description: "Add tags to incident",
    icon: Tag,
    category: "status",
  },
  {
    id: "change-status",
    name: "Change Status",
    description: "Update incident status",
    icon: RefreshCw,
    category: "status",
  },
  {
    id: "pause-sla",
    name: "Pause SLA",
    description: "Pause SLA timer",
    icon: Pause,
    category: "status",
  },
  {
    id: "create-problem",
    name: "Create Problem Record",
    description: "Create linked problem record",
    icon: FileText,
    category: "record",
  },
  {
    id: "resolve-incident",
    name: "Resolve Incident",
    description: "Mark incident as resolved",
    icon: CheckCircle,
    category: "status",
  },
  {
    id: "wait",
    name: "Wait",
    description: "Wait for duration or condition",
    icon: Clock,
    category: "integration",
  },
  {
    id: "webhook",
    name: "Call Webhook",
    description: "Make HTTP request to external service",
    icon: Webhook,
    category: "integration",
  },
]

const categoryLabels: Record<string, string> = {
  assignment: "Assignment",
  notification: "Notifications",
  status: "Status Updates",
  record: "Records",
  integration: "Integrations",
}

interface ActionLibraryProps {
  onSelectAction: (action: Action) => void
  selectedActionId?: string
}

export function ActionLibrary({ onSelectAction, selectedActionId }: ActionLibraryProps) {
  const [search, setSearch] = useState("")

  const filteredActions = actions.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
  )

  const groupedActions = filteredActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = []
    }
    acc[action.category].push(action)
    return acc
  }, {} as Record<string, Action[]>)

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b border-border p-3">
        <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
          Actions
        </h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-3">
          {Object.entries(groupedActions).map(([category, items]) => (
            <div key={category}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {categoryLabels[category]}
              </p>
              <div className="space-y-1">
                {items.map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.id}
                      onClick={() => onSelectAction(action)}
                      className={cn(
                        "flex w-full items-start gap-2 rounded-md p-2 text-left transition-colors hover:bg-muted",
                        selectedActionId === action.id && "bg-[#E69F50]/10 ring-1 ring-[#E69F50]"
                      )}
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#E69F50]/10">
                        <Icon className="h-3.5 w-3.5 text-[#E69F50]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {action.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {action.description}
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

export { actions }
