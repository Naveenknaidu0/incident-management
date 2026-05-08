"use client"

import { Card } from "@/components/ui/card"
import { 
  Server, 
  GitBranch, 
  AlertTriangle, 
  Database,
  Zap,
  Activity
} from "lucide-react"

interface KPICardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: { value: string; positive: boolean }
  variant?: "default" | "warning" | "critical"
}

function KPICard({ label, value, icon, trend, variant = "default" }: KPICardProps) {
  const variantStyles = {
    default: "border-border",
    warning: "border-l-4 border-l-amber-500",
    critical: "border-l-4 border-l-red-500",
  }

  return (
    <Card className={`p-4 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold text-[#0D3133]">{value}</p>
          {trend && (
            <p className={`text-xs ${trend.positive ? "text-green-600" : "text-red-600"}`}>
              {trend.value}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-muted p-2">
          {icon}
        </div>
      </div>
    </Card>
  )
}

export function CMDBKPIStrip() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <KPICard
        label="Total Services"
        value="284"
        icon={<Server className="h-5 w-5 text-[#0D3133]" />}
        trend={{ value: "+12 this month", positive: true }}
      />
      <KPICard
        label="Active Dependencies"
        value="1,847"
        icon={<GitBranch className="h-5 w-5 text-[#0D3133]" />}
      />
      <KPICard
        label="Impacted Services"
        value="8"
        icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
        variant="warning"
      />
      <KPICard
        label="Critical Infrastructure"
        value="42"
        icon={<Database className="h-5 w-5 text-[#0D3133]" />}
      />
      <KPICard
        label="Active Outages"
        value="3"
        icon={<Zap className="h-5 w-5 text-red-600" />}
        variant="critical"
      />
      <KPICard
        label="Degraded Systems"
        value="5"
        icon={<Activity className="h-5 w-5 text-amber-600" />}
        variant="warning"
      />
    </div>
  )
}
