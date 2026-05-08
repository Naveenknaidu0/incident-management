"use client"

import { StatusBadge } from "@/components/ui/status-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { SLATimer } from "@/components/ui/sla-timer"

interface Incident {
  id: string
  title: string
  priority: "critical" | "high" | "medium" | "low"
  status: "open" | "in-progress" | "resolved" | "closed" | "escalated"
  sla: { remaining: string; status: "safe" | "warning" | "breach" | "breached" }
  assignmentGroup: string
  updated: string
}

const mockIncidents: Incident[] = [
  {
    id: "INC0042781",
    title: "Payment Gateway - Transaction Failures",
    priority: "critical",
    status: "in-progress",
    sla: { remaining: "00:45:22", status: "warning" },
    assignmentGroup: "Payment Ops",
    updated: "2 min ago",
  },
  {
    id: "INC0042780",
    title: "Database Cluster - High Latency",
    priority: "high",
    status: "escalated",
    sla: { remaining: "01:30:00", status: "safe" },
    assignmentGroup: "DB Team",
    updated: "5 min ago",
  },
  {
    id: "INC0042779",
    title: "Login Service - 500 Errors",
    priority: "critical",
    status: "open",
    sla: { remaining: "-00:15:32", status: "breached" },
    assignmentGroup: "Auth Team",
    updated: "8 min ago",
  },
  {
    id: "INC0042778",
    title: "CDN - Cache Invalidation Issue",
    priority: "medium",
    status: "in-progress",
    sla: { remaining: "03:22:10", status: "safe" },
    assignmentGroup: "Platform Ops",
    updated: "12 min ago",
  },
  {
    id: "INC0042777",
    title: "Email Service - Delayed Delivery",
    priority: "low",
    status: "resolved",
    sla: { remaining: "04:00:00", status: "safe" },
    assignmentGroup: "Comms Team",
    updated: "25 min ago",
  },
  {
    id: "INC0042776",
    title: "Search API - Timeout Errors",
    priority: "high",
    status: "in-progress",
    sla: { remaining: "00:10:45", status: "breach" },
    assignmentGroup: "Search Team",
    updated: "32 min ago",
  },
]

export function IncidentTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-card-foreground">Recent Incidents</h3>
        <a href="/incidents" className="text-xs font-medium text-[#E69F50] hover:underline">
          View all
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                ID
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Title
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Priority
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                SLA
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Assignment
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {mockIncidents.map((incident) => (
              <tr
                key={incident.id}
                className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-3">
                  <a
                    href={`/incidents/${incident.id}`}
                    className="text-sm font-mono font-medium text-[#0D3133] hover:text-[#E69F50] hover:underline"
                  >
                    {incident.id}
                  </a>
                </td>
                <td className="max-w-xs truncate px-4 py-3 text-sm text-card-foreground">
                  {incident.title}
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={incident.priority} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={incident.status} />
                </td>
                <td className="px-4 py-3">
                  <SLATimer remaining={incident.sla.remaining} status={incident.sla.status} />
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {incident.assignmentGroup}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {incident.updated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
        <span className="text-xs text-muted-foreground">Showing 6 of 247 incidents</span>
        <div className="flex items-center gap-2">
          <button className="rounded border border-border px-2.5 py-1 text-xs font-medium text-card-foreground transition-colors hover:bg-muted disabled:opacity-50">
            Previous
          </button>
          <button className="rounded border border-border px-2.5 py-1 text-xs font-medium text-card-foreground transition-colors hover:bg-muted">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
