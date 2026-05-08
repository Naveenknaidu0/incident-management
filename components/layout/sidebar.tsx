"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useSidebar } from "@/contexts/sidebar-context"
import {
  LayoutDashboard,
  AlertCircle,
  FolderOpen,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Eye,
  Bug,
  Phone,
  Calendar,
  Bell,
  Siren,
  Users,
  MessageSquare,
  FileText,
  ListTodo,
  Timer,
  ArrowUpRight,
  Zap,
  BookOpen,
  Database,
  GitBranch,
  Layers,
  Brain,
  Lightbulb,
  Wrench,
  BarChart3,
  TrendingUp,
  PieChart,
  FileEdit,
  FormInput,
  Megaphone,
  ScrollText,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
  badge?: number
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navigation: NavSection[] = [
  {
    title: "",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/home" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        label: "Operations Dashboard",
        icon: AlertTriangle,
        href: "/operations",
      },
    ],
  },
  {
    title: "INCIDENT MANAGEMENT",
    items: [
      { label: "Create Incident", icon: Plus, href: "/operations/incidents/create" },
      { label: "All Incidents", icon: AlertCircle, href: "/operations/incidents/all", badge: 847 },
      { label: "Open", icon: FolderOpen, href: "/operations/incidents/open", badge: 42 },
      { label: "In Progress", icon: Clock, href: "/operations/incidents/in-progress", badge: 18 },
      { label: "Resolved", icon: CheckCircle, href: "/operations/incidents/resolved", badge: 156 },
      { label: "Closed", icon: XCircle, href: "/operations/incidents/closed", badge: 1243 },
      { label: "Escalated", icon: ArrowUpRight, href: "/operations/incidents/escalated", badge: 5 },
      { label: "VIP Incidents", icon: Star, href: "/operations/incidents/vip", badge: 3 },
      { label: "Watchlist", icon: Eye, href: "/operations/incidents/watchlist", badge: 7 },
    ],
  },
  {
    title: "MAJOR INCIDENTS",
    items: [
      { label: "Major Incidents", icon: Siren, href: "/operations/major-incidents", badge: 2 },
      { label: "War Room", icon: Users, href: "/war-room" },
      { label: "Communication Center", icon: MessageSquare, href: "/communications" },
      { label: "Stakeholders", icon: Users, href: "/communications/stakeholders" },
      { label: "Broadcast Center", icon: Megaphone, href: "/communications/broadcast" },
      { label: "PIR Reports", icon: FileText, href: "/pir-reports" },
    ],
  },
  {
    title: "PROBLEM MANAGEMENT",
    items: [
      { label: "Problem Dashboard", icon: AlertTriangle, href: "/operations/problems" },
      { label: "Known Errors", icon: Bug, href: "/operations/problems?tab=known-errors" },
      { label: "Permanent Fixes", icon: Wrench, href: "/operations/problems?tab=fixes" },
      { label: "Learnings", icon: Lightbulb, href: "/operations/problems?tab=learnings" },
    ],
  },
  {
    title: "CHANGE MANAGEMENT",
    items: [
      { label: "Changes Dashboard", icon: GitBranch, href: "/operations/changes" },
      { label: "Pending Approval", icon: Clock, href: "/operations/changes?tab=pending", badge: 8 },
      { label: "In Implementation", icon: Zap, href: "/operations/changes?tab=implementing", badge: 3 },
      { label: "Completed", icon: CheckCircle, href: "/operations/changes?tab=completed" },
    ],
  },
  {
    title: "REQUEST MANAGEMENT",
    items: [
      { label: "Requests Dashboard", icon: FileText, href: "/operations/requests" },
      { label: "Open Requests", icon: FolderOpen, href: "/operations/requests?tab=open", badge: 15 },
      { label: "In Progress", icon: Clock, href: "/operations/requests?tab=in-progress", badge: 7 },
      { label: "Fulfilled", icon: CheckCircle, href: "/operations/requests?tab=fulfilled" },
    ],
  },
  {
    title: "ON-CALL",
    items: [
      { label: "On-Call Dashboard", icon: Phone, href: "/oncall" },
      { label: "Responders", icon: Users, href: "/oncall/responders" },
      { label: "Escalations", icon: ArrowUpRight, href: "/oncall/escalations" },
      { label: "Schedules", icon: Calendar, href: "/oncall/schedules" },
      { label: "Policies", icon: FileText, href: "/oncall/policies" },
      { label: "Paging", icon: Bell, href: "/oncall/paging" },
    ],
  },
  {
    title: "SLA & AUTOMATION",
    items: [
      { label: "SLA Operations", icon: Timer, href: "/sla", badge: 23 },
      { label: "Escalation Center", icon: AlertTriangle, href: "/sla/escalations", badge: 6 },
      { label: "SLA Policies", icon: FileText, href: "/sla/policies" },
      { label: "Breach Analytics", icon: BarChart3, href: "/sla/analytics" },
      { label: "Automation Rules", icon: Zap, href: "/automation" },
      { label: "Runbooks", icon: BookOpen, href: "/runbooks" },
    ],
  },
  {
    title: "ASSETS",
    items: [
      { label: "Asset Dashboard", icon: Database, href: "/assets" },
      { label: "Service Catalog", icon: Layers, href: "/assets/services" },
      { label: "CI Explorer", icon: GitBranch, href: "/assets/ci" },
      { label: "Dependencies", icon: GitBranch, href: "/assets/dependencies" },
      { label: "Impact Analysis", icon: Layers, href: "/assets/impact" },
    ],
  },
  {
    title: "KNOWLEDGE & AI",
    items: [
      { label: "Knowledge Base", icon: BookOpen, href: "/knowledge" },
      { label: "Known Errors", icon: AlertTriangle, href: "/knowledge/known-errors" },
      { label: "Runbooks", icon: FileText, href: "/knowledge/runbooks" },
      { label: "KB Analytics", icon: Brain, href: "/knowledge/analytics" },
    ],
  },
  {
    title: "REPORTING",
    items: [
      { label: "Analytics Dashboard", icon: BarChart3, href: "/home/analytics" },
      { label: "Custom Reports", icon: PieChart, href: "/home/analytics/reports" },
      { label: "Export Center", icon: TrendingUp, href: "/home/analytics/exports" },
    ],
  },
  {
    title: "PLATFORM",
    items: [
      { label: "Platform Dashboard", icon: Settings, href: "/platform" },
      { label: "Audit Center", icon: ScrollText, href: "/platform/audit" },
      { label: "Governance", icon: Shield, href: "/platform/governance" },
      { label: "Compliance", icon: Shield, href: "/platform/compliance" },
      { label: "Access Visibility", icon: Eye, href: "/platform/access" },
      { label: "Settings", icon: Settings, href: "/settings" },
    ],
  },
]

function NavItemComponent({ item, isCollapsed, isActive }: { item: NavItem; isCollapsed: boolean; isActive: boolean }) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-sidebar-accent",
        isActive
          ? "bg-sidebar-accent text-sidebar-primary"
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex-1 truncate"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {!isCollapsed && item.badge !== undefined && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ml-auto rounded-full bg-sidebar-primary px-2 py-0.5 text-xs font-medium text-sidebar-primary-foreground"
        >
          {item.badge}
        </motion.span>
      )}
    </Link>
  )
}

function NavSectionComponent({ section, isCollapsed, pathname }: { section: NavSection; isCollapsed: boolean; pathname: string }) {
  const [isOpen, setIsOpen] = useState(true)

  // Check if current section has an active item
  const hasActiveItem = section.items.some((item) => pathname === item.href || pathname.startsWith(item.href + "/"))

  return (
    <div className="space-y-1">
      {section.title && !isCollapsed && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
            hasActiveItem
              ? "text-sidebar-foreground/70"
              : "text-sidebar-foreground/50 hover:text-sidebar-foreground/70"
          )}
        >
          <span>{section.title}</span>
          <motion.div
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-3 w-3" />
          </motion.div>
        </button>
      )}
      <AnimatePresence initial={false}>
        {(isOpen || isCollapsed) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-0.5 overflow-hidden"
          >
            {section.items.map((item) => (
              <NavItemComponent
                key={item.href}
                item={item}
                isCollapsed={isCollapsed}
                isActive={pathname === item.href}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar()
  const pathname = usePathname()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar"
    >
      {/* Logo Area */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <Siren className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                IncidentOps
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {isCollapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary mx-auto">
            <Siren className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-4 overflow-y-auto px-2 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sidebar-border hover:scrollbar-thumb-sidebar-foreground/20">
        {navigation.map((section, idx) => (
          <NavSectionComponent
            key={section.title || idx}
            section={section}
            isCollapsed={isCollapsed}
            pathname={pathname}
          />
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="shrink-0 border-t border-sidebar-border p-2">
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  )
}
