"use client"

import { Link2, AlertCircle, FileText, Wrench, GitBranch, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RelatedRecord {
  id: string
  type: "incident" | "problem" | "change" | "knowledge"
  number: string
  title: string
  status: string
  relationship: string
  priority?: "critical" | "high" | "medium" | "low"
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
    },
    {
      id: "2",
      type: "incident",
      number: "INC0042701",
      title: "Database connection pool alerts",
      status: "Active",
      relationship: "Parent",
      priority: "critical",
    },
    {
      id: "3",
      type: "incident",
      number: "INC0041890",
      title: "Checkout service timeouts",
      status: "Resolved",
      relationship: "Related",
      priority: "medium",
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
    },
    {
      id: "2",
      type: "problem",
      number: "PRB0001198",
      title: "Memory leak in payment-service",
      status: "Known Error",
      relationship: "Contributing Factor",
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
    },
    {
      id: "2",
      type: "change",
      number: "CHG0005621",
      title: "Increase database connection pool limit",
      status: "Scheduled",
      relationship: "Mitigation",
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
    },
    {
      id: "2",
      type: "knowledge",
      number: "KB0012298",
      title: "Payment Service Error Codes Reference",
      status: "Published",
      relationship: "Reference",
    },
  ],
}

const typeConfig = {
  incident: { icon: AlertCircle, label: "Incidents", color: "bg-red-100 text-red-700" },
  problem: { icon: Wrench, label: "Problems", color: "bg-purple-100 text-purple-700" },
  change: { icon: GitBranch, label: "Changes", color: "bg-blue-100 text-blue-700" },
  knowledge: { icon: FileText, label: "Knowledge", color: "bg-green-100 text-green-700" },
}

const priorityColors = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
}

export function RelatedRecordsTab() {
  return (
    <div className="space-y-6">
      {/* Related Incidents */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Related Incidents</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.incidents.length}
            </span>
          </div>
          <Button variant="ghost" size="sm">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            Link Incident
          </Button>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.incidents.map((record) => (
            <div key={record.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20">
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
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problems */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Linked Problems</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.problems.length}
            </span>
          </div>
          <Button variant="ghost" size="sm">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            Create Problem
          </Button>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.problems.map((record) => (
            <div key={record.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20">
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
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Changes */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Related Changes</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.changes.length}
            </span>
          </div>
          <Button variant="ghost" size="sm">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            Create Change
          </Button>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.changes.map((record) => (
            <div key={record.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20">
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
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge Articles */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Knowledge Articles</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {relatedRecords.knowledge.length}
            </span>
          </div>
          <Button variant="ghost" size="sm">
            <Link2 className="mr-1.5 h-3.5 w-3.5" />
            Link Article
          </Button>
        </div>
        <div className="divide-y divide-border">
          {relatedRecords.knowledge.map((record) => (
            <div key={record.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20">
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
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
