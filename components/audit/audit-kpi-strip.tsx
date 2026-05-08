"use client"

import { Activity, Settings, GitBranch, AlertTriangle, Shield, CheckCircle } from "lucide-react"

const kpis = [
  { label: "Total Audit Events", value: "24,892", change: "+1,247 today", icon: Activity, variant: "default" },
  { label: "Configuration Changes", value: "156", change: "+12 this week", icon: Settings, variant: "default" },
  { label: "Workflow Updates", value: "34", change: "+5 this week", icon: GitBranch, variant: "default" },
  { label: "Escalation Events", value: "89", change: "+7 today", icon: AlertTriangle, variant: "warning" },
  { label: "Governance Alerts", value: "12", change: "3 critical", icon: Shield, variant: "critical" },
  { label: "Compliance Status", value: "94.2%", change: "Target: 95%", icon: CheckCircle, variant: "success" },
]

const variantStyles = {
  default: "border-border",
  warning: "border-l-amber-500 border-l-4",
  critical: "border-l-red-500 border-l-4",
  success: "border-l-green-500 border-l-4",
}

export function AuditKPIStrip() {
  return (
    <div className="grid grid-cols-6 gap-3">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <div
            key={kpi.label}
            className={`rounded-lg border bg-card p-3 ${variantStyles[kpi.variant as keyof typeof variantStyles]}`}
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
            </div>
            <p className="mt-1 text-xl font-semibold text-[#0D3133]">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.change}</p>
          </div>
        )
      })}
    </div>
  )
}
