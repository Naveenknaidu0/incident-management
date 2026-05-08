"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertTriangle,
  Star,
  UserPlus,
  Siren,
  Users,
  XCircle,
  RefreshCw,
  Timer,
  ArrowRight,
} from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface AutomationTemplate {
  id: string
  name: string
  description: string
  icon: LucideIcon
  category: "sla" | "assignment" | "escalation" | "notification" | "lifecycle"
  popularity: number
}

const templates: AutomationTemplate[] = [
  {
    id: "sla-breach-escalation",
    name: "SLA Breach Escalation",
    description: "Automatically escalate incidents when SLA is breached",
    icon: AlertTriangle,
    category: "sla",
    popularity: 95,
  },
  {
    id: "vip-routing",
    name: "VIP Incident Routing",
    description: "Route VIP incidents to priority support team",
    icon: Star,
    category: "assignment",
    popularity: 88,
  },
  {
    id: "auto-assignment",
    name: "Auto Assignment",
    description: "Automatically assign incidents based on category",
    icon: UserPlus,
    category: "assignment",
    popularity: 92,
  },
  {
    id: "major-incident-trigger",
    name: "Major Incident Trigger",
    description: "Trigger major incident workflow for critical issues",
    icon: Siren,
    category: "escalation",
    popularity: 85,
  },
  {
    id: "executive-notification",
    name: "Executive Notification",
    description: "Notify executives for high-impact incidents",
    icon: Users,
    category: "notification",
    popularity: 78,
  },
  {
    id: "auto-closure",
    name: "Incident Auto Closure",
    description: "Close resolved incidents after 48 hours",
    icon: XCircle,
    category: "lifecycle",
    popularity: 82,
  },
  {
    id: "reassignment-workflow",
    name: "Reassignment Workflow",
    description: "Handle reassignment with approval flow",
    icon: RefreshCw,
    category: "assignment",
    popularity: 75,
  },
  {
    id: "sla-warning-notification",
    name: "SLA Warning Alert",
    description: "Send alerts when SLA is approaching breach",
    icon: Timer,
    category: "sla",
    popularity: 90,
  },
]

const categoryLabels: Record<string, { label: string; color: string }> = {
  sla: { label: "SLA", color: "bg-amber-100 text-amber-700" },
  assignment: { label: "Assignment", color: "bg-blue-100 text-blue-700" },
  escalation: { label: "Escalation", color: "bg-red-100 text-red-700" },
  notification: { label: "Notification", color: "bg-purple-100 text-purple-700" },
  lifecycle: { label: "Lifecycle", color: "bg-green-100 text-green-700" },
}

interface AutomationTemplatesProps {
  onSelectTemplate: (template: AutomationTemplate) => void
}

export function AutomationTemplates({ onSelectTemplate }: AutomationTemplatesProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {templates.map((template) => {
        const Icon = template.icon
        const category = categoryLabels[template.category]

        return (
          <Card
            key={template.id}
            className="group cursor-pointer transition-all hover:shadow-md hover:border-[#E69F50]"
            onClick={() => onSelectTemplate(template)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D3133]/5">
                  <Icon className="h-5 w-5 text-[#0D3133]" />
                </div>
                <Badge variant="secondary" className={cn("text-[10px]", category.color)}>
                  {category.label}
                </Badge>
              </div>
              <CardTitle className="mt-3 text-sm font-semibold">
                {template.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {template.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-12 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[#E69F50]"
                      style={{ width: `${template.popularity}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {template.popularity}% used
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 text-xs opacity-0 group-hover:opacity-100"
                >
                  Use
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export { templates }
