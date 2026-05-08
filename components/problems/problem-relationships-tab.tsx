"use client"

import { AlertCircle, Wrench, GitBranch, FileText, Link2, ExternalLink, Server, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RelatedRecord {
  id: string
  type: "incident" | "problem" | "change" | "service"
  number: string
  title: string
  status: string
  relationship: string
  severity?: "critical" | "high" | "medium" | "low"
  href?: string
  recurrenceCount?: number
}

const relatedRecords: Record<string, RelatedRecord[]> = {
  incidents: [
    {
      id: "1",
      type: "incident",
      number: "INC0042789",
      title: "Payment Processing Timeout",
      status: "In Progress",
      relationship: "Active Incident",
      severity: "critical",
      recurrenceCount: 3,
      href: "/operations/incidents/INC0042789"
    },
    {
      id: "2",
      type: "incident",
      number: "INC0042756",
      title: "Database Connection Issues",
      status: "Resolved",
      relationship: "Related",
      severity: "high",
      recurrenceCount: 5,
      href: "/operations/incidents/INC0042756"
    },
    {
      id: "3",
      type: "incident",
      number: "INC0042545",
      title: "Payment API slow response",
      status: "Resolved",
      relationship: "Related",
      severity: "medium",
      recurrenceCount: 2,
      href: "/operations/incidents/INC0042545"
    },
  ],
  changes: [
    {
      id: "1",
      type: "change",
      number: "CHG0045231",
      title: "Database Migration to v14.2",
      status: "Implementing",
      relationship: "Permanent Fix",
      severity: "high",
      href: "/operations/changes/CHG0045231"
    },
  ],
  services: [
    {
      id: "1",
      type: "service",
      number: "SVC-0042",
      title: "Payment Processing Gateway",
      status: "Degraded",
      relationship: "Impacted Service",
      severity: "high",
      href: "/assets/services/SVC-0042"
    },
  ],
  knownErrors: [
    {
      id: "1",
      type: "problem",
      number: "KE-0001847",
      title: "Database Connection Pool Exhaustion Pattern",
      status: "Known Error",
      relationship: "Known Error",
      href: "/operations/problems/KE-0001847"
    },
  ],
}

const priorityColors = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
}

export function ProblemRelationshipsTab() {
  const relationshipCounts = {
    incidents: relatedRecords.incidents.length,
    changes: relatedRecords.changes.length,
    services: relatedRecords.services.length,
    knownErrors: relatedRecords.knownErrors.length,
  }

  return (
    <div className="space-y-6">
      {/* Relationships Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-2xl font-semibold text-foreground">{relationshipCounts.incidents}</div>
          <div className="text-xs text-muted-foreground">Related Incidents</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-2xl font-semibold text-foreground">{relationshipCounts.changes}</div>
          <div className="text-xs text-muted-foreground">Permanent Fixes</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-2xl font-semibold text-foreground">{relationshipCounts.services}</div>
          <div className="text-xs text-muted-foreground">Impacted Services</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-2xl font-semibold text-foreground">{relationshipCounts.knownErrors}</div>
          <div className="text-xs text-muted-foreground">Known Errors</div>
        </div>
      </div>

      {/* Impact Analysis Widget */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold text-card-foreground">Recurring Incident Pattern</h3>
        </div>
        <div className="px-4 py-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">Total Incidents</span>
              <span className="text-lg font-semibold text-red-600">12</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
            <div className="text-xs text-muted-foreground">
              This problem is associated with 12 incidents over 90 days (recurrence rate: 85%)
            </div>
          </div>
        </div>
      </div>

      {/* Related Incidents */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Related Incidents</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.incidents.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Link</span>
          </Button>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.incidents.map((record) => (
            <Link key={record.id} href={record.href || "#"} className="block hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#E69F50]">{record.number}</span>
                  <span className="text-sm text-card-foreground">{record.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {record.severity && (
                    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${priorityColors[record.severity]}`}>
                      {record.severity}
                    </span>
                  )}
                  {record.recurrenceCount && (
                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                      {record.recurrenceCount}x
                    </span>
                  )}
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {record.relationship}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                    record.status === "Resolved" ? "bg-green-100 text-green-700" :
                    record.status === "In Progress" ? "bg-orange-100 text-orange-700" :
                    "bg-slate-100 text-slate-700"
                  }`}>
                    {record.status}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Permanent Fix Changes */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Permanent Fix Changes</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.changes.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Create</span>
          </Button>
        </div>
        {relatedRecords.changes.length === 0 ? (
          <div className="px-4 py-6 text-center text-xs text-muted-foreground">
            No permanent fix changes yet
          </div>
        ) : (
          <div className="divide-y divide-border">
            {relatedRecords.changes.map((record) => (
              <Link key={record.id} href={record.href || "#"} className="block hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-blue-600">{record.number}</span>
                    <span className="text-sm text-card-foreground">{record.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {record.severity && (
                      <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${priorityColors[record.severity]}`}>
                        {record.severity}
                      </span>
                    )}
                    <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                      {record.relationship}
                    </span>
                    <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                      {record.status}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Impacted Services */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Impacted Services</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.services.length}
            </span>
          </div>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.services.map((record) => (
            <Link key={record.id} href={record.href || "#"} className="block hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-amber-600">{record.number}</span>
                  <span className="text-sm text-card-foreground">{record.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {record.severity && (
                    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${priorityColors[record.severity]}`}>
                      {record.severity}
                    </span>
                  )}
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                    {record.status}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Known Errors */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Known Errors</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.knownErrors.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Add</span>
          </Button>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.knownErrors.map((record) => (
            <Link key={record.id} href={record.href || "#"} className="block hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-yellow-600">{record.number}</span>
                  <span className="text-sm text-card-foreground">{record.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-700">
                    {record.status}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
