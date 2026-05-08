"use client"

import { AlertCircle, Wrench, GitBranch, FileText, Link2, ExternalLink, Server, Calendar, AlertTriangle, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RelatedRecord {
  id: string
  type: "incident" | "problem" | "service" | "asset"
  number: string
  title: string
  status: string
  relationship: string
  severity?: "critical" | "high" | "medium" | "low"
  href?: string
  riskLevel?: "high" | "medium" | "low"
}

const relatedRecords: Record<string, RelatedRecord[]> = {
  incidents: [
    {
      id: "1",
      type: "incident",
      number: "INC0042789",
      title: "Payment Processing Timeout",
      status: "In Progress",
      relationship: "Related Incident",
      severity: "critical",
      href: "/operations/incidents/INC0042789"
    },
  ],
  problems: [
    {
      id: "1",
      type: "problem",
      number: "PRB0001847",
      title: "Database Connection Pool Exhaustion",
      status: "RCA In Progress",
      relationship: "Addresses Root Cause",
      href: "/operations/problems/PRB0001847"
    },
  ],
  services: [
    {
      id: "1",
      type: "service",
      number: "SVC-0042",
      title: "Payment Processing Gateway",
      status: "Degraded",
      relationship: "Primary Service",
      severity: "high",
      href: "/assets/services/SVC-0042"
    },
    {
      id: "2",
      type: "service",
      number: "SVC-0043",
      title: "Settlement Service",
      status: "Operational",
      relationship: "Dependent Service",
      href: "/assets/services/SVC-0043"
    },
  ],
  assets: [
    {
      id: "1",
      type: "asset",
      number: "AST-0001234",
      title: "prod-db-cluster-01",
      status: "Active",
      relationship: "Deployment Target",
      href: "/assets/inventory/AST-0001234"
    },
  ],
}

const priorityColors = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
}

export function ChangeRelationshipsTab() {
  const relationshipCounts = {
    incidents: relatedRecords.incidents.length,
    problems: relatedRecords.problems.length,
    services: relatedRecords.services.length,
    assets: relatedRecords.assets.length,
  }

  return (
    <div className="space-y-6">
      {/* Change Impact Assessment */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Impact Assessment
          </h3>
        </div>
        <div className="px-4 py-4 space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-card-foreground">Outage Risk</span>
              <span className="text-xs font-semibold text-amber-600">Medium</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "55%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-card-foreground">Service Dependencies</span>
              <span className="text-xs font-semibold">{relationshipCounts.services}</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-card-foreground">Rollback Readiness</span>
              <span className="text-xs font-semibold text-green-600">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Relationship Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-2xl font-semibold text-foreground">{relationshipCounts.incidents}</div>
          <div className="text-xs text-muted-foreground">Related Incidents</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-2xl font-semibold text-foreground">{relationshipCounts.problems}</div>
          <div className="text-xs text-muted-foreground">Problems Fixed</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-2xl font-semibold text-foreground">{relationshipCounts.services}</div>
          <div className="text-xs text-muted-foreground">Services Impacted</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <div className="text-2xl font-semibold text-foreground">{relationshipCounts.assets}</div>
          <div className="text-xs text-muted-foreground">Deployment Targets</div>
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
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {record.relationship}
                  </span>
                  <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-700">
                    {record.status}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Problems Fixed */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Problems Fixed</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.problems.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Link</span>
          </Button>
        </div>
        {relatedRecords.problems.length === 0 ? (
          <div className="px-4 py-6 text-center text-xs text-muted-foreground">
            No problems linked yet
          </div>
        ) : (
          <div className="divide-y divide-border">
            {relatedRecords.problems.map((record) => (
              <Link key={record.id} href={record.href || "#"} className="block hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-purple-600">{record.number}</span>
                    <span className="text-sm text-card-foreground">{record.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                      {record.relationship}
                    </span>
                    <span className="rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-700">
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
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Add</span>
          </Button>
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

      {/* Deployment Targets */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Deployment Targets</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.assets.length}
            </span>
          </div>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.assets.map((record) => (
            <Link key={record.id} href={record.href || "#"} className="block hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-600">{record.number}</span>
                  <span className="text-sm text-card-foreground">{record.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {record.relationship}
                  </span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700">
                    {record.status}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CAB & Maintenance Windows */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Maintenance Windows</h3>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Schedule</span>
          </Button>
        </div>
        <div className="px-4 py-4 space-y-2">
          <div className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded">
            <div>
              <p className="text-sm font-medium text-card-foreground">Scheduled Window</p>
              <p className="text-xs text-muted-foreground">2024-05-15 02:00 - 06:00 UTC</p>
            </div>
            <span className="text-xs font-semibold text-green-600">Approved</span>
          </div>
        </div>
      </div>
    </div>
  )
}
