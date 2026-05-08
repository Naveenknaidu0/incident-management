"use client"

import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { AdminKPIStrip } from "@/components/settings/admin-kpi-strip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Home,
  Search,
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
  ChevronRight,
} from "lucide-react"

interface SettingsCard {
  title: string
  description: string
  icon: React.ElementType
  href: string
  count?: number
}

const settingsCards: { section: string; cards: SettingsCard[] }[] = [
  {
    section: "Incident Configuration",
    cards: [
      { title: "Categories", description: "Manage incident categories and subcategories", icon: AlertCircle, href: "/settings/categories", count: 24 },
      { title: "Priority Matrix", description: "Configure impact, urgency, and priority mapping", icon: Grid3X3, href: "/settings/priority-matrix" },
      { title: "Statuses", description: "Define incident lifecycle statuses", icon: AlertCircle, href: "/settings/statuses", count: 8 },
    ],
  },
  {
    section: "Assignment & Escalation",
    cards: [
      { title: "Assignment Rules", description: "Configure routing and assignment logic", icon: Users, href: "/settings/assignment-rules", count: 15 },
      { title: "Escalation Rules", description: "Define escalation paths and triggers", icon: AlertTriangle, href: "/settings/escalation-rules", count: 6 },
    ],
  },
  {
    section: "SLA Management",
    cards: [
      { title: "SLA Policies", description: "Create and manage SLA definitions", icon: Timer, href: "/settings/sla-policies", count: 12 },
      { title: "Business Hours", description: "Configure support schedules by region", icon: Clock, href: "/settings/business-hours", count: 5 },
      { title: "Holiday Calendar", description: "Manage holidays and maintenance windows", icon: Calendar, href: "/settings/holidays", count: 23 },
    ],
  },
  {
    section: "Forms & Templates",
    cards: [
      { title: "Dynamic Forms", description: "Build and customize incident forms", icon: FormInput, href: "/settings/forms", count: 8 },
      { title: "Templates", description: "Manage incident templates", icon: FileEdit, href: "/settings/templates", count: 23 },
    ],
  },
  {
    section: "Notifications & Communications",
    cards: [
      { title: "Notification Rules", description: "Configure alert channels and triggers", icon: Bell, href: "/settings/notifications", count: 34 },
      { title: "Communication Plans", description: "Stakeholder communication workflows", icon: MessageSquare, href: "/settings/communication-plans", count: 7 },
    ],
  },
  {
    section: "Automation & Governance",
    cards: [
      { title: "Workflow Rules", description: "Automate incident processing", icon: Zap, href: "/settings/workflow-rules", count: 47 },
      { title: "Audit Settings", description: "Configure audit trails and logging", icon: ScrollText, href: "/settings/audit" },
      { title: "Preferences", description: "Platform defaults and theme settings", icon: Palette, href: "/settings/preferences" },
    ],
  },
]

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Breadcrumb */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-[#0D3133]">
                  Administration Center
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure platform settings, policies, and operational governance
                </p>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search settings..." className="pl-9" />
              </div>
            </div>

            {/* KPI Strip */}
            <AdminKPIStrip />

            {/* Settings Cards */}
            {settingsCards.map((section) => (
              <div key={section.section}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.section}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.cards.map((card) => {
                    const Icon = card.icon
                    return (
                      <Link key={card.href} href={card.href}>
                        <Card className="h-full transition-all hover:border-[#E69F50] hover:shadow-md">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="rounded-md bg-muted p-2">
                                <Icon className="h-5 w-5 text-[#0D3133]" />
                              </div>
                              {card.count !== undefined && (
                                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                  {card.count}
                                </span>
                              )}
                            </div>
                            <CardTitle className="mt-3 text-base">{card.title}</CardTitle>
                            <CardDescription className="text-xs">
                              {card.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center text-xs text-[#E69F50]">
                              Configure
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
