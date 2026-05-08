"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  RefreshCw,
  Download,
  Settings2,
  Keyboard,
  LayoutGrid,
  List,
  ChevronDown,
  Bookmark,
  Star,
  Check,
  Plus,
  SlidersHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { SavedView } from "./saved-views-manager"

interface ProductivityToolbarProps {
  density: "compact" | "comfortable"
  onDensityChange: (density: "compact" | "comfortable") => void
  isRefreshing: boolean
  onRefresh: () => void
  lastRefresh: Date
  onOpenColumnManager: () => void
  onOpenSavedViews: () => void
  onOpenKeyboardShortcuts: () => void
  onOpenAdvancedFilters: () => void
  onExport: () => void
  activeFilterCount: number
  savedViews: SavedView[]
  activeViewId: string
  onViewSelect: (viewId: string) => void
}

export function ProductivityToolbar({
  density,
  onDensityChange,
  isRefreshing,
  onRefresh,
  lastRefresh,
  onOpenColumnManager,
  onOpenSavedViews,
  onOpenKeyboardShortcuts,
  onOpenAdvancedFilters,
  onExport,
  activeFilterCount,
  savedViews,
  activeViewId,
  onViewSelect,
}: ProductivityToolbarProps) {
  const formatLastRefresh = (date: Date) => {
    const now = new Date()
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diffSeconds < 60) return "Just now"
    if (diffSeconds < 120) return "1m ago"
    return `${Math.floor(diffSeconds / 60)}m ago`
  }

  const pinnedViews = savedViews.filter((v) => v.isPinned).slice(0, 4)
  const activeView = savedViews.find((v) => v.id === activeViewId)

  return (
    <div className="shrink-0 flex items-center justify-between gap-4 border-b border-border bg-muted/30 px-6 py-2">
      {/* Left: Saved View Tabs */}
      <div className="flex items-center gap-1">
        {pinnedViews.map((view) => (
          <Button
            key={view.id}
            variant={view.id === activeViewId ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onViewSelect(view.id)}
            className={cn(
              "h-7 gap-1.5 text-xs",
              view.id === activeViewId && "bg-[#0D3133]/10 text-[#0D3133]"
            )}
          >
            {view.isPinned && view.id === activeViewId ? (
              <Star className="h-3 w-3 text-[#E69F50]" />
            ) : null}
            {view.name}
            {view.incidentCount !== undefined && (
              <Badge
                variant="secondary"
                className="h-4 min-w-4 rounded-full px-1 text-[10px]"
              >
                {view.incidentCount}
              </Badge>
            )}
          </Button>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
              <Bookmark className="h-3.5 w-3.5" />
              Views
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Saved Views
            </div>
            {savedViews.slice(0, 8).map((view) => (
              <DropdownMenuItem
                key={view.id}
                onClick={() => onViewSelect(view.id)}
                className="gap-2"
              >
                {view.isPinned ? (
                  <Star className="h-3.5 w-3.5 text-[#E69F50]" />
                ) : (
                  <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span className="flex-1">{view.name}</span>
                {view.id === activeViewId && (
                  <Check className="h-3.5 w-3.5" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onOpenSavedViews} className="gap-2">
              <Plus className="h-3.5 w-3.5" />
              Manage Views
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Auto-refresh indicator */}
        <div className="flex items-center gap-2 pr-2 border-r border-border">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          <span className="text-xs text-muted-foreground">
            {formatLastRefresh(lastRefresh)}
          </span>
        </div>

        {/* Advanced Filters */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenAdvancedFilters}
                className={cn(
                  "h-7 gap-1.5 text-xs",
                  activeFilterCount > 0 && "text-[#E69F50]"
                )}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="h-4 min-w-4 rounded-full bg-[#E69F50] px-1 text-[10px] text-white"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Advanced Filters</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Density Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
              {density === "compact" ? (
                <List className="h-3.5 w-3.5" />
              ) : (
                <LayoutGrid className="h-3.5 w-3.5" />
              )}
              {density === "compact" ? "Compact" : "Comfortable"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDensityChange("compact")}>
              <List className="mr-2 h-3.5 w-3.5" />
              Compact
              {density === "compact" && <Check className="ml-auto h-3.5 w-3.5" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDensityChange("comfortable")}>
              <LayoutGrid className="mr-2 h-3.5 w-3.5" />
              Comfortable
              {density === "comfortable" && <Check className="ml-auto h-3.5 w-3.5" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Column Manager */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenColumnManager}
                className="h-7 w-7"
              >
                <Settings2 className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Configure Columns</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Keyboard Shortcuts */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenKeyboardShortcuts}
                className="h-7 w-7"
              >
                <Keyboard className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Keyboard Shortcuts
              <kbd className="ml-2 rounded border border-border bg-muted px-1 text-[10px]">?</kbd>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Export */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onExport}
                className="h-7 w-7"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Refresh */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="h-7 w-7"
              >
                <RefreshCw
                  className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Refresh
              <kbd className="ml-2 rounded border border-border bg-muted px-1 text-[10px]">R</kbd>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
