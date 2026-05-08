"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  X,
  Plus,
  Star,
  StarOff,
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  Check,
  Bookmark,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface SavedView {
  id: string
  name: string
  filters: Record<string, unknown>
  columns?: string[]
  isPinned: boolean
  isDefault: boolean
  isSystem: boolean
  incidentCount?: number
}

interface SavedViewsManagerProps {
  isOpen: boolean
  onClose: () => void
  views: SavedView[]
  activeViewId: string
  onViewSelect: (viewId: string) => void
  onViewCreate: (name: string) => void
  onViewUpdate: (viewId: string, updates: Partial<SavedView>) => void
  onViewDelete: (viewId: string) => void
  onViewDuplicate: (viewId: string) => void
}

export function SavedViewsManager({
  isOpen,
  onClose,
  views,
  activeViewId,
  onViewSelect,
  onViewCreate,
  onViewUpdate,
  onViewDelete,
  onViewDuplicate,
}: SavedViewsManagerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newViewName, setNewViewName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

  const pinnedViews = views.filter((v) => v.isPinned)
  const unpinnedViews = views.filter((v) => !v.isPinned)

  const handleCreate = () => {
    if (newViewName.trim()) {
      onViewCreate(newViewName.trim())
      setNewViewName("")
      setIsCreating(false)
    }
  }

  const handleStartEdit = (view: SavedView) => {
    setEditingId(view.id)
    setEditingName(view.name)
  }

  const handleSaveEdit = (viewId: string) => {
    if (editingName.trim()) {
      onViewUpdate(viewId, { name: editingName.trim() })
    }
    setEditingId(null)
    setEditingName("")
  }

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
            className="fixed right-0 top-0 z-50 flex h-full w-[400px] flex-col border-l border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Saved Views
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {views.length} views available
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Pinned Views */}
                {pinnedViews.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Star className="h-4 w-4 text-[#E69F50]" />
                      Pinned Views
                    </h3>
                    <div className="space-y-1">
                      {pinnedViews.map((view) => (
                        <ViewItem
                          key={view.id}
                          view={view}
                          isActive={view.id === activeViewId}
                          isEditing={editingId === view.id}
                          editingName={editingName}
                          onSelect={() => {
                            onViewSelect(view.id)
                            onClose()
                          }}
                          onTogglePin={() =>
                            onViewUpdate(view.id, { isPinned: !view.isPinned })
                          }
                          onSetDefault={() =>
                            onViewUpdate(view.id, { isDefault: true })
                          }
                          onStartEdit={() => handleStartEdit(view)}
                          onSaveEdit={() => handleSaveEdit(view.id)}
                          onCancelEdit={() => setEditingId(null)}
                          onEditingNameChange={setEditingName}
                          onDuplicate={() => onViewDuplicate(view.id)}
                          onDelete={() => onViewDelete(view.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {pinnedViews.length > 0 && unpinnedViews.length > 0 && (
                  <Separator />
                )}

                {/* All Views */}
                {unpinnedViews.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                      All Views
                    </h3>
                    <div className="space-y-1">
                      {unpinnedViews.map((view) => (
                        <ViewItem
                          key={view.id}
                          view={view}
                          isActive={view.id === activeViewId}
                          isEditing={editingId === view.id}
                          editingName={editingName}
                          onSelect={() => {
                            onViewSelect(view.id)
                            onClose()
                          }}
                          onTogglePin={() =>
                            onViewUpdate(view.id, { isPinned: !view.isPinned })
                          }
                          onSetDefault={() =>
                            onViewUpdate(view.id, { isDefault: true })
                          }
                          onStartEdit={() => handleStartEdit(view)}
                          onSaveEdit={() => handleSaveEdit(view.id)}
                          onCancelEdit={() => setEditingId(null)}
                          onEditingNameChange={setEditingName}
                          onDuplicate={() => onViewDuplicate(view.id)}
                          onDelete={() => onViewDelete(view.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="shrink-0 border-t border-border bg-muted/30 px-6 py-4">
              {isCreating ? (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="View name..."
                    value={newViewName}
                    onChange={(e) => setNewViewName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreate()
                      if (e.key === "Escape") setIsCreating(false)
                    }}
                    autoFocus
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={handleCreate}
                    className="bg-[#0D3133] hover:bg-[#0D3133]/90"
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsCreating(true)}
                  className="w-full gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90"
                >
                  <Plus className="h-4 w-4" />
                  Save Current View
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface ViewItemProps {
  view: SavedView
  isActive: boolean
  isEditing: boolean
  editingName: string
  onSelect: () => void
  onTogglePin: () => void
  onSetDefault: () => void
  onStartEdit: () => void
  onSaveEdit: () => void
  onCancelEdit: () => void
  onEditingNameChange: (name: string) => void
  onDuplicate: () => void
  onDelete: () => void
}

function ViewItem({
  view,
  isActive,
  isEditing,
  editingName,
  onSelect,
  onTogglePin,
  onSetDefault,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditingNameChange,
  onDuplicate,
  onDelete,
}: ViewItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-3 transition-colors",
        isActive
          ? "border-[#E69F50] bg-[#E69F50]/5"
          : "border-border hover:bg-muted/50"
      )}
    >
      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={editingName}
            onChange={(e) => onEditingNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSaveEdit()
              if (e.key === "Escape") onCancelEdit()
            }}
            autoFocus
            className="h-8 flex-1"
          />
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onSaveEdit}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onCancelEdit}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <button
            onClick={onSelect}
            className="flex flex-1 items-center gap-3 text-left"
          >
            {view.isPinned ? (
              <Star className="h-4 w-4 shrink-0 text-[#E69F50]" />
            ) : (
              <Bookmark className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
            <span className="flex-1 text-sm font-medium text-foreground">
              {view.name}
            </span>
            {view.isDefault && (
              <Badge variant="secondary" className="text-xs">
                Default
              </Badge>
            )}
            {view.incidentCount !== undefined && (
              <Badge variant="outline" className="text-xs">
                {view.incidentCount}
              </Badge>
            )}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onTogglePin}>
                {view.isPinned ? (
                  <>
                    <StarOff className="mr-2 h-4 w-4" />
                    Unpin
                  </>
                ) : (
                  <>
                    <Star className="mr-2 h-4 w-4" />
                    Pin to top
                  </>
                )}
              </DropdownMenuItem>
              {!view.isDefault && (
                <DropdownMenuItem onClick={onSetDefault}>
                  <Check className="mr-2 h-4 w-4" />
                  Set as default
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onStartEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              {!view.isSystem && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  )
}
