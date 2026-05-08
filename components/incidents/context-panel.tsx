"use client"

import { 
  Server, HardDrive, Users, Link2, Zap, Phone, Copy, 
  GitBranch, Bell, MessageSquare, AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContextWidget {
  id: string
  title: string
  icon: React.ElementType
  items: { label: string; value?: string; status?: "operational" | "degraded" | "outage" }[]
}

const widgets: ContextWidget[] = [
  {
    id: "services",
    title: "Affected Services",
    icon: Server,
    items: [
      { label: "Payment API", status: "outage" },
      { label: "Checkout Service", status: "degraded" },
      { label: "Order Processing", status: "degraded" },
      { label: "Merchant Dashboard", status: "operational" },
    ],
  },
  {
    id: "assets",
    title: "Linked Assets",
    icon: HardDrive,
    items: [
      { label: "prod-payment-01", value: "Server" },
      { label: "prod-db-cluster", value: "Database" },
      { label: "payment-gateway", value: "Service" },
      { label: "checkout-api", value: "Service" },
    ],
  },
  {
    id: "users",
    title: "Impacted Users",
    icon: Users,
    items: [
      { label: "Enterprise Customers", value: "~2,400" },
      { label: "SMB Customers", value: "~8,100" },
      { label: "API Partners", value: "12" },
    ],
  },
  {
    id: "related",
    title: "Similar Incidents",
    icon: Link2,
    items: [
      { label: "INC0042765", value: "92% similar" },
      { label: "INC0041234", value: "85% similar" },
      { label: "INC0040876", value: "78% similar" },
    ],
  },
]

const onCallTeam = [
  { name: "Sarah Chen", role: "Primary", initials: "SC", status: "online" },
  { name: "Mike Johnson", role: "Secondary", initials: "MJ", status: "online" },
  { name: "John Doe", role: "Manager", initials: "JD", status: "away" },
]

const quickActions = [
  { label: "Escalate", icon: AlertTriangle, color: "text-amber-600" },
  { label: "Clone", icon: Copy, color: "text-muted-foreground" },
  { label: "Create Problem", icon: GitBranch, color: "text-purple-600" },
  { label: "Create Change", icon: GitBranch, color: "text-blue-600" },
  { label: "Notify", icon: Bell, color: "text-green-600" },
  { label: "War Room", icon: Phone, color: "text-red-600" },
]

const statusColors = {
  operational: "bg-green-500",
  degraded: "bg-amber-500",
  outage: "bg-red-500",
}

const onlineColors = {
  online: "bg-green-500",
  away: "bg-amber-500",
  offline: "bg-slate-400",
}

export function ContextPanel() {
  return (
    <div className="h-full overflow-y-auto space-y-4 py-4 pb-6 scrollbar-thin">
      {/* Quick Actions */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.label}
                className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-card-foreground transition-colors hover:bg-muted"
              >
                <Icon className={`h-3.5 w-3.5 ${action.color}`} />
                {action.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* On-call Team */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-card-foreground">On-call Team</h3>
        </div>
        <div className="divide-y divide-border">
          {onCallTeam.map((member) => (
            <div key={member.name} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D3133] text-[10px] font-semibold text-white">
                    {member.initials}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card ${onlineColors[member.status as keyof typeof onlineColors]}`} />
                </div>
                <div>
                  <p className="text-sm text-card-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Context Widgets */}
      {widgets.map((widget) => {
        const Icon = widget.icon

        return (
          <div key={widget.id} className="rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-card-foreground">{widget.title}</h3>
              <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {widget.items.length}
              </span>
            </div>
            <div className="divide-y divide-border max-h-40 overflow-y-auto">
              {widget.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-4 py-2 hover:bg-muted/20">
                  <div className="flex items-center gap-2">
                    {item.status && (
                      <span className={`h-2 w-2 rounded-full ${statusColors[item.status]}`} />
                    )}
                    <span className="text-sm text-card-foreground">{item.label}</span>
                  </div>
                  {item.value && (
                    <span className="text-xs text-muted-foreground">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
