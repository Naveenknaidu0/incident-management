"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Plus,
  Bell,
  HelpCircle,
  Moon,
  Sun,
  ChevronDown,
  User,
  AlertTriangle,
  FileText,
  ClipboardList,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { QuickCreateModal } from "@/components/create-incident/quick-create-modal"

export function TopHeader() {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  // Global keyboard shortcut for quick create
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search focus
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('[data-search-input]')?.focus()
      }
      // Ctrl/Cmd + I for quick incident create
      if ((e.metaKey || e.ctrlKey) && e.key === "i") {
        e.preventDefault()
        setQuickCreateOpen(true)
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleQuickCreate = (type: string) => {
    if (type === "incident") {
      setQuickCreateOpen(true)
    } else if (type === "major-incident") {
      router.push("/incidents/create?type=major")
    } else if (type === "full-form") {
      router.push("/incidents/create")
    }
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-[#0D3133] px-6">
        {/* Left: Global Search */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              data-search-input
              placeholder="Search incidents, services, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-16 text-sm text-white placeholder:text-white/50 focus:border-[#E69F50] focus:outline-none focus:ring-1 focus:ring-[#E69F50]"
            />
            <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-white/50 sm:inline-block">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Create */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Create
                <ChevronDown className="ml-1.5 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleQuickCreate("incident")}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Quick Incident
                <kbd className="ml-auto text-xs text-muted-foreground">⌘I</kbd>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleQuickCreate("full-form")}>
                <FileText className="mr-2 h-4 w-4" />
                New Incident (Full Form)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleQuickCreate("major-incident")}>
                <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                New Major Incident
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ClipboardList className="mr-2 h-4 w-4" />
                New Task
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen className="mr-2 h-4 w-4" />
                New Runbook
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Environment Badge */}
          <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Production
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#E69F50]" />
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E69F50] text-xs font-semibold text-[#0D3133]">
                  JD
                </div>
                <span className="hidden text-sm font-medium md:inline-block">
                  John Doe
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    john.doe@company.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Quick Create Modal */}
      <QuickCreateModal open={quickCreateOpen} onOpenChange={setQuickCreateOpen} />
    </>
  )
}
