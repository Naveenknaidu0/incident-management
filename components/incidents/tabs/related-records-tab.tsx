"use client"

import { AlertCircle, Wrench, GitBranch, FileText, Link2, ExternalLink, Plus, HardDrive, Server, Users, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { RelationshipWidget, RelationshipSummary, QuickRelationAction } from "@/components/relationships/relationship-widget"
import { getRelationships } from "@/lib/enterprise-relationships"

// Demo incident ID for relationships
const CURRENT_INCIDENT_ID = "INC0042789"

interface RelatedRecord {
  id: string
  type: "incident" | "problem" | "change" | "knowledge" | "asset" | "service" | "request"
  number: string
  title: string
  status: string
  relationship: string
  priority?: "critical" | "high" | "medium" | "low"
  href?: string
}

const relatedRecords: Record<string, RelatedRecord[]> = {
  incidents: [
    {
      id: "1",
      type: "incident",
      number: "INC0042765",
      title: "Payment API latency issues in EU region",
      status: "Resolved",
      relationship: "Similar",
      priority: "high",
      href: "/operations/incidents/INC0042765"
    },
    {
      id: "2",
      type: "incident",
      number: "INC0042701",
      title: "Database connection pool alerts",
      status: "Active",
      relationship: "Parent",
      priority: "critical",
      href: "/operations/incidents/INC0042701"
    },
    {
      id: "3",
      type: "incident",
      number: "INC0041890",
      title: "Checkout service timeouts",
      status: "Resolved",
      relationship: "Related",
      priority: "medium",
      href: "/operations/incidents/INC0041890"
    },
  ],
  problems: [
    {
      id: "1",
      type: "problem",
      number: "PRB0001234",
      title: "Recurring database connection exhaustion",
      status: "Under Investigation",
      relationship: "Root Cause",
      href: "/operations/problems/PRB0001234"
    },
    {
      id: "2",
      type: "problem",
      number: "PRB0001198",
      title: "Memory leak in payment-service",
      status: "Known Error",
      relationship: "Contributing Factor",
      href: "/operations/problems/PRB0001198"
    },
  ],
  changes: [
    {
      id: "1",
      type: "change",
      number: "CHG0005678",
      title: "Deploy payment-service v2.4.2 hotfix",
      status: "Implemented",
      relationship: "Resolution",
      href: "/operations/changes/CHG0005678"
    },
    {
      id: "2",
      type: "change",
      number: "CHG0005621",
      title: "Increase database connection pool limit",
      status: "Scheduled",
      relationship: "Mitigation",
      href: "/operations/changes/CHG0005621"
    },
  ],
  knowledge: [
    {
      id: "1",
      type: "knowledge",
      number: "KB0012345",
      title: "Troubleshooting Database Connection Pool Issues",
      status: "Published",
      relationship: "Resolution Guide",
      href: "/knowledge/KB0012345"
    },
    {
      id: "2",
      type: "knowledge",
      number: "KB0012298",
      title: "Payment Service Error Codes Reference",
      status: "Published",
      relationship: "Reference",
      href: "/knowledge/KB0012298"
    },
  ],
  assets: [
    {
      id: "1",
      type: "asset",
      number: "AST-0001234",
      title: "prod-db-cluster-01",
      status: "Active",
      relationship: "Impacted Asset",
      href: "/assets/inventory/AST-0001234"
    },
    {
      id: "2",
      type: "asset",
      number: "AST-0001235",
      title: "payment-api-server-02",
      status: "Active",
      relationship: "Impacted Asset",
      href: "/assets/inventory/AST-0001235"
    },
  ],
  services: [
    {
      id: "1",
      type: "service",
      number: "SVC-0042",
      title: "Payment Processing Gateway",
      status: "Degraded",
      priority: "high",
      relationship: "Primary Service",
      href: "/assets/services/SVC-0042"
    },
  ],
  requests: [
    {
      id: "1",
      type: "request",
      number: "REQ0089234",
      title: "Emergency Database Capacity Increase",
      status: "In Progress",
      relationship: "Fulfillment",
      href: "/operations/requests/REQ0089234"
    },
  ],
}

const typeConfig = {
  incident: { icon: AlertCircle, label: "Incidents", color: "bg-red-100 text-red-700" },
  problem: { icon: Wrench, label: "Problems", color: "bg-purple-100 text-purple-700" },
  change: { icon: GitBranch, label: "Changes", color: "bg-blue-100 text-blue-700" },
  knowledge: { icon: FileText, label: "Knowledge", color: "bg-green-100 text-green-700" },
  asset: { icon: HardDrive, label: "Assets", color: "bg-slate-100 text-slate-700" },
  service: { icon: Server, label: "Services", color: "bg-amber-100 text-amber-700" },
  request: { icon: Database, label: "Requests", color: "bg-cyan-100 text-cyan-700" },
}

const priorityColors = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
}

const quickActions = [
  { label: "Create Problem", icon: Wrench, href: "/operations/problems/create" },
  { label: "Link Problem", icon: Link2 },
  { label: "Create Change", icon: GitBranch, href: "/operations/changes/create" },
  { label: "Link Change", icon: Link2 },
  { label: "Add Asset", icon: HardDrive },
  { label: "Link Request", icon: Database },
  { label: "View Dependencies", icon: GitBranch },
]

export function RelatedRecordsTab() {
  const relationshipCounts = {
    incidents: relatedRecords.incidents.length,
    problems: relatedRecords.problems.length,
    changes: relatedRecords.changes.length,
    assets: relatedRecords.assets.length,
    services: relatedRecords.services.length,
    requests: relatedRecords.requests.length,
    knowledge: relatedRecords.knowledge.length,
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Quick Relationship Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.label} href={action.href || "#"}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-9 justify-start text-xs"
                >
                  <Icon className="h-3.5 w-3.5 mr-1.5" />
                  {action.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Relationship Summary */}
      <div>
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Relationship Summary</h3>
        <RelationshipSummary relationships={relationshipCounts} />
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
                  {record.priority && (
                    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${priorityColors[record.priority]}`}>
                      {record.priority}
                    </span>
                  )}
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {record.relationship}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                    record.status === "Resolved" ? "bg-green-100 text-green-700" :
                    record.status === "Active" ? "bg-red-100 text-red-700" :
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

      {/* Problems */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Linked Problems</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.problems.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Link</span>
          </Button>
        </div>
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
      </div>

      {/* Changes */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Related Changes</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.changes.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Link</span>
          </Button>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.changes.map((record) => (
            <Link key={record.id} href={record.href || "#"} className="block hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-blue-600">{record.number}</span>
                  <span className="text-sm text-card-foreground">{record.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {record.relationship}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                    record.status === "Implemented" ? "bg-green-100 text-green-700" :
                    "bg-blue-100 text-blue-700"
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

      {/* Impacted Assets */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Impacted Assets</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.assets.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Add</span>
          </Button>
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
                  {record.priority && (
                    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${priorityColors[record.priority]}`}>
                      {record.priority}
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

      {/* Related Requests */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Related Requests</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.requests.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Link</span>
          </Button>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.requests.map((record) => (
            <Link key={record.id} href={record.href || "#"} className="block hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-cyan-600">{record.number}</span>
                  <span className="text-sm text-card-foreground">{record.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {record.relationship}
                  </span>
                  <span className="rounded bg-cyan-100 px-1.5 py-0.5 text-xs font-medium text-cyan-700">
                    {record.status}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Knowledge Articles */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Knowledge Articles</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.knowledge.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-xs">Link</span>
          </Button>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.knowledge.map((record) => (
            <Link key={record.id} href={record.href || "#"} className="block hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-green-600">{record.number}</span>
                  <span className="text-sm text-card-foreground">{record.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {record.relationship}
                  </span>
                  <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
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

