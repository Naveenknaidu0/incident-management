"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import { QueueHeader } from "@/components/queue/queue-header"
import { QueueSummaryStrip } from "@/components/queue/queue-summary-strip"
import { FilterToolbar } from "@/components/queue/filter-toolbar"
import { ProductivityToolbar } from "@/components/queue/productivity-toolbar"
import { IncidentQueueTable, type Incident } from "@/components/queue/incident-queue-table"
import { BulkActionsBar } from "@/components/queue/bulk-actions-bar"
import { QuickPreviewPanel } from "@/components/queue/quick-preview-panel"
import { AdvancedFilterDrawer } from "@/components/queue/advanced-filter-drawer"
import { ColumnManager, defaultColumns, type ColumnConfig } from "@/components/queue/column-manager"
import { SavedViewsManager, type SavedView } from "@/components/queue/saved-views-manager"
import {
  useKeyboardShortcuts,
  KeyboardShortcutsHelp,
  ShortcutIndicator,
} from "@/components/queue/keyboard-shortcuts"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { Home } from "lucide-react"
import { FloatingCreateButton } from "@/components/create-incident/floating-create-button"
import { type QueueType, getQueueConfig } from "@/lib/queue-config"
import { mockIncidents, filterIncidentsByQueue, getQueueMetrics } from "@/lib/mock-incidents"
import { defaultSavedViews } from "@/lib/saved-views"

interface DynamicIncidentQueueProps {
  queueType: QueueType
}

export function DynamicIncidentQueue({ queueType }: DynamicIncidentQueueProps) {
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const config = getQueueConfig(queueType)
  
  // Filter incidents based on queue type
  const filteredIncidents = useMemo(() => {
    return filterIncidentsByQueue(mockIncidents, queueType)
  }, [queueType])
  
  const incidentCount = filteredIncidents.length
  const summaryMetrics = useMemo(() => getQueueMetrics(mockIncidents), [])

  // State
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [previewIncident, setPreviewIncident] = useState<Incident | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [isColumnManagerOpen, setIsColumnManagerOpen] = useState(false)
  const [isSavedViewsOpen, setIsSavedViewsOpen] = useState(false)
  const [density, setDensity] = useState<"compact" | "comfortable">("compact")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    status: [] as string[],
    priority: [] as string[],
    assignmentGroup: [] as string[],
    assignedEngineer: [] as string[],
    slaState: [] as string[],
    category: [] as string[],
    service: [] as string[],
    severity: [] as string[],
    tags: [] as string[],
    dateRange: {} as { from?: Date; to?: Date },
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns)
  const [savedViews, setSavedViews] = useState<SavedView[]>(defaultSavedViews)
  const [activeViewId, setActiveViewId] = useState("my-queue")

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(filters).reduce((count, value) => {
      if (Array.isArray(value)) return count + value.length
      if (value?.from || value?.to) return count + 1
      return count
    }, 0)
  }, [filters])

  // Handlers
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLastRefresh(new Date())
      setIsRefreshing(false)
    }, 800)
  }, [])

  const handleIncidentClick = (incident: Incident) => {
    setPreviewIncident(incident)
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
    setTimeout(() => setPreviewIncident(null), 300)
  }

  const handleNavigateToView = useCallback((view: string) => {
    const viewRoutes: Record<string, string> = {
      all: "/incidents/all",
      open: "/incidents/open",
      "in-progress": "/incidents/in-progress",
      resolved: "/incidents/resolved",
      closed: "/incidents/closed",
      escalated: "/incidents/escalated",
      vip: "/incidents/vip",
      watchlist: "/incidents/watchlist",
      "major-incidents": "/major-incidents",
    }
    if (viewRoutes[view]) {
      router.push(viewRoutes[view])
    }
  }, [router])

  const handleFocusSearch = useCallback(() => {
    searchInputRef.current?.focus()
  }, [])

  const handleSelectAll = useCallback(() => {
    setSelectedIds(filteredIncidents.map((i) => i.id))
  }, [filteredIncidents])

  // Saved Views handlers
  const handleViewCreate = (name: string) => {
    const newView: SavedView = {
      id: `custom-${Date.now()}`,
      name,
      filters: { ...filters },
      isPinned: false,
      isDefault: false,
      isSystem: false,
    }
    setSavedViews([...savedViews, newView])
    setActiveViewId(newView.id)
  }

  const handleViewUpdate = (viewId: string, updates: Partial<SavedView>) => {
    setSavedViews(
      savedViews.map((view) =>
        view.id === viewId ? { ...view, ...updates } : view
      )
    )
  }

  const handleViewDelete = (viewId: string) => {
    setSavedViews(savedViews.filter((v) => v.id !== viewId))
    if (activeViewId === viewId) {
      setActiveViewId("my-queue")
    }
  }

  const handleViewDuplicate = (viewId: string) => {
    const original = savedViews.find((v) => v.id === viewId)
    if (original) {
      const duplicate: SavedView = {
        ...original,
        id: `custom-${Date.now()}`,
        name: `${original.name} (copy)`,
        isPinned: false,
        isDefault: false,
        isSystem: false,
      }
      setSavedViews([...savedViews, duplicate])
    }
  }

  // Keyboard shortcuts
  const { isHelpOpen, setIsHelpOpen, pendingKey } = useKeyboardShortcuts({
    onNavigateToView: handleNavigateToView,
    onFocusSearch: handleFocusSearch,
    onCloseDrawer: () => {
      if (isPreviewOpen) handleClosePreview()
      else if (isAdvancedFilterOpen) setIsAdvancedFilterOpen(false)
      else if (isColumnManagerOpen) setIsColumnManagerOpen(false)
      else if (isSavedViewsOpen) setIsSavedViewsOpen(false)
    },
    onRefresh: handleRefresh,
    onSelectAll: handleSelectAll,
    onClearSelection: () => setSelectedIds([]),
  })

  // Pagination
  const pageSize = 10
  const totalPages = Math.ceil(incidentCount / pageSize)
  const paginatedIncidents = filteredIncidents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <AppShell>
      <div className="relative flex h-full flex-col overflow-hidden">
        {/* Breadcrumb */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/incidents/all">Incidents</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{config.breadcrumbLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Queue Header */}
        {isLoading ? (
          <QueueHeaderSkeleton />
        ) : (
          <QueueHeader
            title={config.title}
            description={config.description}
            incidentCount={incidentCount}
            lastRefresh={lastRefresh}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        )}

        {/* Summary Strip */}
        {isLoading ? (
          <QueueSummaryStripSkeleton />
        ) : (
          <QueueSummaryStrip metrics={summaryMetrics} />
        )}

        {/* Productivity Toolbar */}
        <ProductivityToolbar
          density={density}
          onDensityChange={setDensity}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          lastRefresh={lastRefresh}
          onOpenColumnManager={() => setIsColumnManagerOpen(true)}
          onOpenSavedViews={() => setIsSavedViewsOpen(true)}
          onOpenKeyboardShortcuts={() => setIsHelpOpen(true)}
          onOpenAdvancedFilters={() => setIsAdvancedFilterOpen(true)}
          onExport={() => console.log("Export")}
          activeFilterCount={activeFilterCount}
          savedViews={savedViews}
          activeViewId={activeViewId}
          onViewSelect={setActiveViewId}
        />

        {/* Filter Toolbar */}
        <FilterToolbar
          filters={filters}
          onFiltersChange={setFilters}
          onOpenAdvanced={() => setIsAdvancedFilterOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Table */}
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <IncidentQueueTable
              incidents={paginatedIncidents}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onIncidentClick={handleIncidentClick}
              density={density}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalCount={incidentCount}
              pageSize={pageSize}
            />
          )}
        </div>

        {/* Bulk Actions Bar */}
        <BulkActionsBar
          selectedCount={selectedIds.length}
          onClearSelection={() => setSelectedIds([])}
          onAssign={() => console.log("Assign")}
          onChangeStatus={() => console.log("Change Status")}
          onEscalate={() => console.log("Escalate")}
          onAddTags={() => console.log("Add Tags")}
          onExport={() => console.log("Export")}
          onClose={() => console.log("Close")}
          onMerge={() => console.log("Merge")}
        />

        {/* Quick Preview Panel */}
        <QuickPreviewPanel
          incident={previewIncident}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
        />

        {/* Advanced Filter Drawer */}
        <AdvancedFilterDrawer
          isOpen={isAdvancedFilterOpen}
          onClose={() => setIsAdvancedFilterOpen(false)}
          onApply={(groups) => console.log("Applied filters:", groups)}
        />

        {/* Column Manager */}
        <ColumnManager
          isOpen={isColumnManagerOpen}
          onClose={() => setIsColumnManagerOpen(false)}
          columns={columns}
          onColumnsChange={setColumns}
        />

        {/* Saved Views Manager */}
        <SavedViewsManager
          isOpen={isSavedViewsOpen}
          onClose={() => setIsSavedViewsOpen(false)}
          views={savedViews}
          activeViewId={activeViewId}
          onViewSelect={(viewId) => {
            setActiveViewId(viewId)
            setIsSavedViewsOpen(false)
          }}
          onViewCreate={handleViewCreate}
          onViewUpdate={handleViewUpdate}
          onViewDelete={handleViewDelete}
          onViewDuplicate={handleViewDuplicate}
        />

        {/* Keyboard Shortcuts Help */}
        <KeyboardShortcutsHelp
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
        />

        {/* Shortcut Indicator */}
        <ShortcutIndicator pendingKey={pendingKey} />

        {/* Floating Create Button */}
        <FloatingCreateButton />
      </div>
    </AppShell>
  )
}

// Skeleton components for loading states
function QueueHeaderSkeleton() {
  return (
    <div className="shrink-0 border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
            <Skeleton className="mt-1.5 h-4 w-64" />
          </div>
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    </div>
  )
}

function QueueSummaryStripSkeleton() {
  return (
    <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-3">
      <div className="flex items-center gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-12 w-32" />
        ))}
      </div>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-2">
          {/* Header row */}
          <div className="flex items-center gap-4 border-b border-border pb-3">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          {/* Data rows */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-4 py-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-5 w-16 rounded" />
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
      {/* Pagination skeleton */}
      <div className="shrink-0 border-t border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="h-8 w-8" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
