"use client"

import { Link2, ExternalLink, AlertCircle, Wrench, GitBranch, HardDrive, Server, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { RelationshipRecord, MODULE_COLORS } from "@/lib/enterprise-relationships"

interface RelationshipWidgetProps {
  title: string
  records: RelationshipRecord[]
  icon: React.ElementType
  createAction?: { label: string; href: string }
  linkAction?: { label: string; onClick: () => void }
  emptyMessage?: string
}

export function RelationshipWidget({
  title,
  records,
  icon: Icon,
  createAction,
  linkAction,
  emptyMessage = "No related records"
}: RelationshipWidgetProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
          {records.length > 0 && (
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {records.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {linkAction && (
            <Button
              variant="ghost"
              size="sm"
              onClick={linkAction.onClick}
              className="h-7 px-2 text-xs"
            >
              <Link2 className="h-3.5 w-3.5 mr-1" />
              {linkAction.label}
            </Button>
          )}
          {createAction && (
            <Link href={createAction.href}>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                {createAction.label}
              </Button>
            </Link>
          )}
        </div>
      </div>
      {records.length === 0 ? (
        <div className="px-4 py-6 text-center text-xs text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="divide-y divide-border max-h-80 overflow-y-auto">
          {records.map((record) => (
            <Link
              key={record.id}
              href={record.href || "#"}
              className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="font-mono text-xs text-[#E69F50] flex-shrink-0">{record.number}</span>
                <span className="text-sm text-card-foreground truncate">{record.title}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                {record.severity && (
                  <Badge
                    variant={
                      record.severity === 'critical'
                        ? 'destructive'
                        : record.severity === 'high'
                        ? 'secondary'
                        : 'outline'
                    }
                    className="text-xs"
                  >
                    {record.severity}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {record.relationship}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    record.status === 'Resolved' ? 'bg-green-50 text-green-700' :
                    record.status === 'Active' || record.status === 'In Progress' ? 'bg-orange-50 text-orange-700' :
                    record.status === 'Closed' ? 'bg-slate-50 text-slate-700' :
                    'bg-background'
                  }`}
                >
                  {record.status}
                </Badge>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// Compact chip for quick navigation
interface RelationshipChipProps {
  record: RelationshipRecord
  onClose?: () => void
}

export function RelationshipChip({ record, onClose }: RelationshipChipProps) {
  const colors = MODULE_COLORS[record.type as keyof typeof MODULE_COLORS] || MODULE_COLORS.incident
  
  return (
    <Link href={record.href || "#"}>
      <Badge
        variant="outline"
        className={`cursor-pointer hover:opacity-75 transition-opacity ${colors.bg} ${colors.text}`}
      >
        {record.number}: {record.title}
        {onClose && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onClose()
            }}
            className="ml-1"
          >
            ×
          </button>
        )}
      </Badge>
    </Link>
  )
}

// Summary card for at-a-glance relationship counts
interface RelationshipSummaryProps {
  relationships: Record<string, number>
}

export function RelationshipSummary({ relationships }: RelationshipSummaryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
      {Object.entries(relationships).map(([type, count]) => (
        count > 0 && (
          <div key={type} className="rounded-lg border border-border bg-card p-3 text-center">
            <div className="text-2xl font-semibold text-foreground">{count}</div>
            <div className="text-xs text-muted-foreground capitalize">{type}</div>
          </div>
        )
      ))}
    </div>
  )
}

// Quick action button component
interface QuickRelationActionProps {
  label: string
  icon: React.ElementType
  onClick: () => void
  href?: string
}

export function QuickRelationAction({ label, icon: Icon, onClick, href }: QuickRelationActionProps) {
  const Component = href ? Link : "button"
  
  return (
    <Component
      href={href}
      onClick={href ? undefined : onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors text-xs font-medium text-foreground"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Component>
  )
}
