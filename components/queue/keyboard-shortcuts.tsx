"use client"

import { useEffect, useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X, Keyboard } from "lucide-react"

interface ShortcutAction {
  key: string
  description: string
  action: () => void
}

interface KeyboardShortcutsProps {
  shortcuts: ShortcutAction[]
  onNavigateToView?: (view: string) => void
  onFocusSearch?: () => void
  onCloseDrawer?: () => void
  onRefresh?: () => void
  onSelectAll?: () => void
  onClearSelection?: () => void
}

export function useKeyboardShortcuts({
  onNavigateToView,
  onFocusSearch,
  onCloseDrawer,
  onRefresh,
  onSelectAll,
  onClearSelection,
}: Omit<KeyboardShortcutsProps, "shortcuts">) {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [pendingKey, setPendingKey] = useState<string | null>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore if typing in an input
      const target = event.target as HTMLElement
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return
      }

      const key = event.key.toLowerCase()
      const isCmd = event.metaKey || event.ctrlKey

      // Handle single key shortcuts
      if (key === "/" && !isCmd) {
        event.preventDefault()
        onFocusSearch?.()
        return
      }

      if (key === "escape") {
        event.preventDefault()
        onCloseDrawer?.()
        setPendingKey(null)
        return
      }

      if (key === "?" && event.shiftKey) {
        event.preventDefault()
        setIsHelpOpen((prev) => !prev)
        return
      }

      if (key === "r" && !isCmd) {
        event.preventDefault()
        onRefresh?.()
        return
      }

      // Handle Cmd/Ctrl shortcuts
      if (isCmd && key === "a") {
        event.preventDefault()
        onSelectAll?.()
        return
      }

      // Handle G + key sequences for navigation
      if (pendingKey === "g") {
        event.preventDefault()
        setPendingKey(null)
        
        const viewMap: Record<string, string> = {
          a: "all",
          o: "open",
          p: "in-progress",
          r: "resolved",
          c: "closed",
          e: "escalated",
          v: "vip",
          w: "watchlist",
          m: "major-incidents",
        }

        if (viewMap[key]) {
          onNavigateToView?.(viewMap[key])
        }
        return
      }

      // Start G sequence
      if (key === "g" && !isCmd) {
        setPendingKey("g")
        // Clear pending after timeout
        setTimeout(() => setPendingKey(null), 1500)
        return
      }
    },
    [pendingKey, onNavigateToView, onFocusSearch, onCloseDrawer, onRefresh, onSelectAll]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return {
    isHelpOpen,
    setIsHelpOpen,
    pendingKey,
  }
}

interface KeyboardShortcutsHelpProps {
  isOpen: boolean
  onClose: () => void
}

const shortcutGroups = [
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["G", "A"], description: "Go to All Incidents" },
      { keys: ["G", "O"], description: "Go to Open Incidents" },
      { keys: ["G", "P"], description: "Go to In Progress" },
      { keys: ["G", "R"], description: "Go to Resolved" },
      { keys: ["G", "C"], description: "Go to Closed" },
      { keys: ["G", "E"], description: "Go to Escalated" },
      { keys: ["G", "V"], description: "Go to VIP Incidents" },
      { keys: ["G", "W"], description: "Go to Watchlist" },
      { keys: ["G", "M"], description: "Go to Major Incidents" },
    ],
  },
  {
    title: "Search & Filters",
    shortcuts: [
      { keys: ["/"], description: "Focus search" },
      { keys: ["Esc"], description: "Close drawer / Clear" },
    ],
  },
  {
    title: "Actions",
    shortcuts: [
      { keys: ["R"], description: "Refresh queue" },
      { keys: ["⌘", "A"], description: "Select all incidents" },
      { keys: ["?"], description: "Show keyboard shortcuts" },
    ],
  },
]

export function KeyboardShortcutsHelp({
  isOpen,
  onClose,
}: KeyboardShortcutsHelpProps) {
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
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-50 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Keyboard className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Keyboard Shortcuts
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Speed up your workflow
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="max-h-[60vh]">
              <div className="p-6 space-y-6">
                {shortcutGroups.map((group, idx) => (
                  <div key={group.title}>
                    {idx > 0 && <Separator className="mb-6" />}
                    <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                      {group.title}
                    </h3>
                    <div className="space-y-2">
                      {group.shortcuts.map((shortcut) => (
                        <div
                          key={shortcut.description}
                          className="flex items-center justify-between py-1"
                        >
                          <span className="text-sm text-foreground">
                            {shortcut.description}
                          </span>
                          <div className="flex items-center gap-1">
                            {shortcut.keys.map((key, keyIdx) => (
                              <span key={keyIdx}>
                                {keyIdx > 0 && (
                                  <span className="mx-1 text-xs text-muted-foreground">
                                    then
                                  </span>
                                )}
                                <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-foreground">
                                  {key}
                                </kbd>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border bg-muted/30 px-6 py-3">
              <p className="text-center text-xs text-muted-foreground">
                Press <kbd className="mx-1 rounded border border-border bg-muted px-1">?</kbd> to toggle this help
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface ShortcutIndicatorProps {
  pendingKey: string | null
}

export function ShortcutIndicator({ pendingKey }: ShortcutIndicatorProps) {
  return (
    <AnimatePresence>
      {pendingKey && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 shadow-lg">
            <kbd className="inline-flex h-7 min-w-7 items-center justify-center rounded border border-border bg-muted px-2 font-mono text-sm font-medium text-foreground uppercase">
              {pendingKey}
            </kbd>
            <span className="text-sm text-muted-foreground">
              + key for navigation...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
