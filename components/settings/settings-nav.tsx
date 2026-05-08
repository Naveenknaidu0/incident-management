"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Settings,
  AlertCircle,
  Timer,
  Grid3X3,
  Users,
  AlertTriangle,
  FormInput,
  FileEdit,
  Bell,
  MessageSquare,
  Clock,
  Calendar,
  Zap,
  ScrollText,
  Palette,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

interface NavSection {
  title: string
  items: NavItem[]
}

const settingsNav: NavSection[] = [
  {
    title: "INCIDENT SETTINGS",
    items: [
      { label: "Categories", href: "/settings/categories", icon: AlertCircle },
      { label: "Priority Matrix", href: "/settings/priority-matrix", icon: Grid3X3 },
      { label: "Statuses", href: "/settings/statuses", icon: Settings },
    ],
  },
  {
    title: "ASSIGNMENT & ESCALATION",
    items: [
      { label: "Assignment Rules", href: "/settings/assignment-rules", icon: Users },
      { label: "Escalation Rules", href: "/settings/escalation-rules", icon: AlertTriangle },
    ],
  },
  {
    title: "SLA MANAGEMENT",
    items: [
      { label: "SLA Policies", href: "/settings/sla-policies", icon: Timer },
      { label: "Business Hours", href: "/settings/business-hours", icon: Clock },
      { label: "Holiday Calendar", href: "/settings/holidays", icon: Calendar },
    ],
  },
  {
    title: "FORMS & TEMPLATES",
    items: [
      { label: "Dynamic Forms", href: "/settings/forms", icon: FormInput },
      { label: "Templates", href: "/settings/templates", icon: FileEdit },
    ],
  },
  {
    title: "NOTIFICATIONS",
    items: [
      { label: "Notification Rules", href: "/settings/notifications", icon: Bell },
      { label: "Communication Plans", href: "/settings/communication-plans", icon: MessageSquare },
    ],
  },
  {
    title: "AUTOMATION",
    items: [
      { label: "Workflow Rules", href: "/settings/workflow-rules", icon: Zap },
      { label: "Business Rules", href: "/settings/business-rules", icon: Settings },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Audit Settings", href: "/settings/audit", icon: ScrollText },
      { label: "Preferences", href: "/settings/preferences", icon: Palette },
    ],
  },
]

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="w-56 shrink-0 border-r border-border bg-card">
      <div className="flex h-full flex-col overflow-y-auto py-4">
        {settingsNav.map((section) => (
          <div key={section.title} className="mb-4">
            <h3 className="mb-1 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-1.5 text-sm transition-colors",
                      isActive
                        ? "border-r-2 border-[#E69F50] bg-muted text-[#0D3133] font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  )
}
