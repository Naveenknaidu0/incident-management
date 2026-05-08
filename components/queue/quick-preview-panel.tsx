"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { SLATimer } from "@/components/ui/sla-timer"
import { Separator } from "@/components/ui/separator"
import {
  X,
  ExternalLink,
  UserPlus,
  AlertTriangle,
  MessageSquare,
  CheckCircle,
  Clock,
  Server,
  Activity,
  ChevronRight,
} from "lucide-react"
import type { Incident } from "./incident-queue-table"
import Link from "next/link"

interface QuickPreviewPanelProps {
  incident: Incident | null
  isOpen: boolean
  onClose: () => void
}

const recentActivity = [
  {
    id: 1,
    type: "comment",
    user: "Sarah Chen",
    action: "added a comment",
    time: "5 mins ago",
    content: "Investigating the root cause. Initial analysis suggests database connection timeout.",
  },
  {
    id: 2,
    type: "status",
    user: "System",
    action: "changed status to In Progress",
    time: "15 mins ago",
  },
  {
    id: 3,
    type: "assignment",
    user: "John Smith",
    action: "assigned to Sarah Chen",
    time: "20 mins ago",
  },
]

export function QuickPreviewPanel({
  incident,
  isOpen,
  onClose,
}: QuickPreviewPanelProps) {
  if (!incident) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[480px] flex-col border-l border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <PriorityBadge priority={incident.priority} />
                <span className="font-mono font-semibold text-foreground">
                  {incident.id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/incidents/${incident.id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open Workspace
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Title & Status */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">
                  {incident.title}
                </h2>
                <div className="flex items-center gap-2">
                  <StatusBadge status={incident.status} />
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    Severity {incident.severity}
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* SLA Info */}
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Resolution SLA
                    </span>
                  </div>
                  <SLATimer
                    remaining={incident.sla.remaining}
                    status={incident.sla.status}
                  />
                </div>
                <div className="mt-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${
                        incident.sla.status === "safe"
                          ? "bg-green-500"
                          : incident.sla.status === "warning"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: incident.sla.status === "breached" ? "100%" : "65%",
                      }}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Assignment */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Assignment</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Group</span>
                    <span className="text-sm font-medium text-foreground">
                      {incident.assignmentGroup}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Assigned To</span>
                    {incident.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={incident.assignedTo.avatar} />
                          <AvatarFallback className="text-[10px]">
                            {incident.assignedTo.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">
                          {incident.assignedTo.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Unassigned
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Affected Services */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">
                  Affected Services
                </h3>
                <div className="flex items-center gap-2 rounded-lg border border-border p-3">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {incident.service}
                  </span>
                  <Badge variant="outline" className="ml-auto">
                    Primary
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Latest Activity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">
                    Latest Activity
                  </h3>
                  <Link
                    href={`/incidents/${incident.id}?tab=activity`}
                    className="flex items-center gap-1 text-xs text-[#E69F50] hover:underline"
                  >
                    View all
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-3 rounded-lg border border-border p-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}
                        </p>
                        {activity.content && (
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {activity.content}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Tags */}
              {incident.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {incident.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="shrink-0 border-t border-border bg-muted/30 px-6 py-4">
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <UserPlus className="h-4 w-4" />
                  Assign
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Escalate
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  Comment
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5 bg-[#0D3133] hover:bg-[#0D3133]/90"
                >
                  <CheckCircle className="h-4 w-4" />
                  Resolve
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
