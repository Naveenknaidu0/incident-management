"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { TemplateCard } from "@/components/communications/template-card"
import {
  Home,
  Search,
  Plus,
  Filter,
  FileText,
} from "lucide-react"

const templates = [
  {
    id: "TPL001",
    name: "Major Incident Alert",
    description: "Initial notification for major incidents affecting multiple services or customers",
    category: "Incident",
    priority: "critical" as const,
    channels: ["email" as const, "slack" as const, "sms" as const],
    lastUsed: "2 hours ago",
    usageCount: 156,
  },
  {
    id: "TPL002",
    name: "SLA Breach Warning",
    description: "Warning notification when services are approaching or have breached SLA targets",
    category: "SLA",
    priority: "warning" as const,
    channels: ["email" as const, "slack" as const],
    lastUsed: "1 day ago",
    usageCount: 89,
  },
  {
    id: "TPL003",
    name: "Executive Update",
    description: "High-level summary for executive stakeholders during major incidents",
    category: "Executive",
    priority: "executive-critical" as const,
    channels: ["email" as const],
    lastUsed: "3 hours ago",
    usageCount: 45,
  },
  {
    id: "TPL004",
    name: "Service Restoration",
    description: "Notification confirming service has been restored to normal operation",
    category: "Incident",
    priority: "informational" as const,
    channels: ["email" as const, "slack" as const, "push" as const],
    lastUsed: "5 hours ago",
    usageCount: 134,
  },
  {
    id: "TPL005",
    name: "Maintenance Notification",
    description: "Scheduled maintenance window announcement for affected stakeholders",
    category: "Maintenance",
    priority: "informational" as const,
    channels: ["email" as const],
    lastUsed: "2 days ago",
    usageCount: 67,
  },
  {
    id: "TPL006",
    name: "Customer Outage Alert",
    description: "Customer-facing notification for service outages and degradation",
    category: "Customer",
    priority: "critical" as const,
    channels: ["email" as const, "push" as const],
    lastUsed: "1 week ago",
    usageCount: 23,
  },
  {
    id: "TPL007",
    name: "Escalation Notice",
    description: "Notification for escalation to higher management levels",
    category: "Escalation",
    priority: "warning" as const,
    channels: ["email" as const, "sms" as const],
    lastUsed: "4 days ago",
    usageCount: 34,
  },
  {
    id: "TPL008",
    name: "Post-Incident Report",
    description: "Summary report following incident resolution",
    category: "Report",
    priority: "informational" as const,
    channels: ["email" as const],
    lastUsed: "3 days ago",
    usageCount: 56,
  },
]

const categories = ["All", "Incident", "SLA", "Executive", "Maintenance", "Customer", "Escalation", "Report"]

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || t.category === activeCategory
    return matchesSearch && matchesCategory
  })

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
                <BreadcrumbLink asChild>
                  <Link href="/communications">Communications</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Templates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#0D3133]/10 p-2">
                <FileText className="h-5 w-5 text-[#0D3133]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#0D3133]">Communication Templates</h1>
                <p className="text-sm text-muted-foreground">Manage reusable message templates for notifications</p>
              </div>
            </div>
            <Button size="sm" className="h-8 gap-1.5 bg-[#0D3133] hover:bg-[#0D3133]/90">
              <Plus className="h-3.5 w-3.5" />
              Create Template
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="shrink-0 border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 text-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredTemplates.length} templates
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="h-full">
            <div className="sticky top-0 bg-card border-b border-border px-6">
              <TabsList className="h-10 bg-transparent p-0 gap-4">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                  >
                    {category}
                    <Badge variant="secondary" className="ml-1.5">
                      {category === "All"
                        ? templates.length
                        : templates.filter((t) => t.category === category).length}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeCategory} className="mt-0 p-6">
              <div className="grid grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} {...template} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
