"use client"

import { Link2, AlertCircle, Wrench, GitBranch, Server, HardDrive, FileText, Zap, Users, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ContextItem {
  label: string
  value?: string
  status?: "operational" | "degraded" | "outage" | "active" | "resolved"
  href?: string
}

interface RelationshipContextPanelProps {
  recordType: "incident" | "problem" | "change" | "asset"
  recordId: string
}

const statusColors = {
  operational: "bg-green-500",
  degraded: "bg-amber-500",
  outage: "bg-red-500",
  active: "bg-red-500",
  resolved: "bg-green-500",
}

// Demo context data by record
const contextData = {
  incident: {
    "INC0042789": {
      services: {
        icon: Server,
        items: [
          { label: "Payment API", status: "outage" },
          { label: "Checkout Service", status: "degraded" },
          { label: "Order Processing", status: "degraded" },
        ],
      },
      assets: {
        icon: HardDrive,
        items: [
          { label: "prod-payment-01", value: "Server" },
          { label: "prod-db-cluster", value: "Database" },
          { label: "payment-gateway", value: "Service" },
        ],
      },
      impactedUsers: {
        icon: Users,
        items: [
          { label: "Enterprise Customers", value: "~2,400" },
          { label: "SMB Customers", value: "~8,100" },
          { label: "API Partners", value: "12" },
        ],
      },
      relatedProblems: {
        icon: Wrench,
        items: [
          { label: "PRB0001847", value: "Active RCA" },
          { label: "PRB0001234", value: "Known Error" },
        ],
      },
    },
  },
  problem: {
    "PRB0001847": {
      affectedServices: {
        icon: Server,
        items: [
          { label: "Payment Processing", status: "degraded" },
          { label: "Settlement", status: "operational" },
        ],
      },
      affectedAssets: {
        icon: HardDrive,
        items: [
          { label: "prod-db-cluster-01", value: "Database" },
          { label: "prod-app-02", value: "Server" },
        ],
      },
      incidents: {
        icon: AlertCircle,
        items: [
          { label: "INC0042789", value: "Critical" },
          { label: "INC0042756", value: "High" },
          { label: "INC0042545", value: "Medium" },
        ],
      },
    },
  },
  change: {
    "CHG0045231": {
      affectedServices: {
        icon: Server,
        items: [
          { label: "Payment Processing", status: "degraded" },
          { label: "Settlement", status: "operational" },
        ],
      },
      deploymentTargets: {
        icon: HardDrive,
        items: [
          { label: "prod-db-cluster", value: "Database" },
          { label: "prod-app-servers", value: "3 servers" },
        ],
      },
      linkedProblems: {
        icon: Wrench,
        items: [
          { label: "PRB0001847", value: "RCA In Progress" },
        ],
      },
    },
  },
}

export function RelationshipContextPanel({ recordType, recordId }: RelationshipContextPanelProps) {
  const data = contextData[recordType]?.[recordId as keyof typeof contextData["incident"]] || {}

  return (
    <div className="h-full overflow-y-auto space-y-4 py-4 pb-6 scrollbar-thin">
      {Object.entries(data).map(([key, widget]: [string, any]) => {
        const Icon = widget.icon

        return (
          <div key={key} className="rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-card-foreground capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </h3>
              <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {widget.items?.length || 0}
              </span>
            </div>
            <div className="divide-y divide-border max-h-40 overflow-y-auto">
              {widget.items?.map((item: ContextItem, idx: number) => (
                <div key={idx} className="flex items-center justify-between px-4 py-2 hover:bg-muted/20">
                  <div className="flex items-center gap-2">
                    {item.status && (
                      <span className={`h-2 w-2 rounded-full ${statusColors[item.status]}`} />
                    )}
                    <Link href={item.href || "#"} className="text-sm text-card-foreground hover:text-[#0D3133]">
                      {item.label}
                    </Link>
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
