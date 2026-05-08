"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QuickCreateModal } from "@/components/create-incident/quick-create-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Download,
  RefreshCw,
  Settings2,
  ChevronDown,
  Bookmark,
  Star,
  Check,
} from "lucide-react"

interface QueueHeaderProps {
  title: string
  description?: string
  incidentCount: number
  lastRefresh: Date
  onRefresh: () => void
  isRefreshing?: boolean
}

const savedViews = [
  { id: "my-queue", name: "My Queue", isDefault: true, isPinned: true },
  { id: "critical", name: "Critical Incidents", isDefault: false, isPinned: true },
  { id: "sla-breach", name: "SLA Breaches", isDefault: false, isPinned: false },
  { id: "unassigned", name: "Unassigned", isDefault: false, isPinned: false },
  { id: "vip", name: "VIP Incidents", isDefault: false, isPinned: false },
  { id: "major", name: "Major Incidents", isDefault: false, isPinned: false },
]

export function QueueHeader({
  title,
  description,
  incidentCount,
  lastRefresh,
  onRefresh,
  isRefreshing = false,
}: QueueHeaderProps) {
  const [activeView, setActiveView] = useState("my-queue")
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)

  const formatLastRefresh = (date: Date) => {
    const now = new Date()
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diffSeconds < 60) return "Just now"
    if (diffSeconds < 120) return "1 min ago"
    return `${Math.floor(diffSeconds / 60)} mins ago`
  }

  return (
    <div className="shrink-0 border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
              <span className="rounded-full bg-[#0D3133] px-2.5 py-0.5 text-sm font-medium text-white">
                {incidentCount.toLocaleString()}
              </span>
            </div>
            {description && (
              <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          
          {/* Live Refresh Indicator */}
          <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-xs text-muted-foreground">
              Updated {formatLastRefresh(lastRefresh)}
            </span>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Saved Views Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="h-4 w-4" />
                {savedViews.find((v) => v.id === activeView)?.name || "Views"}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Pinned Views
              </div>
              {savedViews
                .filter((v) => v.isPinned)
                .map((view) => (
                  <DropdownMenuItem
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className="gap-2"
                  >
                    <Star className="h-3.5 w-3.5 text-[#E69F50]" />
                    <span className="flex-1">{view.name}</span>
                    {activeView === view.id && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    {view.isDefault && (
                      <span className="text-xs text-muted-foreground">Default</span>
                    )}
                  </DropdownMenuItem>
                ))}
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                All Views
              </div>
              {savedViews
                .filter((v) => !v.isPinned)
                .map((view) => (
                  <DropdownMenuItem
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className="gap-2"
                  >
                    <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="flex-1">{view.name}</span>
                    {activeView === view.id && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                  </DropdownMenuItem>
                ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Plus className="h-3.5 w-3.5" />
                Create New View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Configure Columns */}
          <Button variant="outline" size="sm" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Columns
          </Button>

          {/* Export */}
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>

          {/* Refresh */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          {/* Create Incident */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Create Incident
                <ChevronDown className="h-3 w-3 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setQuickCreateOpen(true)}>
                Quick Create
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/incidents/create">Full Form</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Create Modal */}
      <QuickCreateModal open={quickCreateOpen} onOpenChange={setQuickCreateOpen} />
    </div>
  )
}
