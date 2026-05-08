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
import { StakeholderCard } from "@/components/communications/stakeholder-card"
import {
  Home,
  Search,
  Plus,
  Filter,
  Download,
  Users,
} from "lucide-react"

const stakeholders = [
  {
    name: "John Smith",
    initials: "JS",
    role: "VP Engineering",
    group: "executive" as const,
    email: "john.smith@company.com",
    phone: "+1-555-0123",
    preferredChannels: ["email" as const, "sms" as const],
    escalationLevel: 4,
    lastContact: "2 hours ago",
    isOnline: true,
  },
  {
    name: "Sarah Chen",
    initials: "SC",
    role: "Service Owner - Payments",
    group: "service-owner" as const,
    email: "sarah.chen@company.com",
    preferredChannels: ["slack" as const, "email" as const],
    escalationLevel: 2,
    lastContact: "1 hour ago",
    isOnline: true,
  },
  {
    name: "Mike Wilson",
    initials: "MW",
    role: "Operations Lead",
    group: "operations" as const,
    email: "mike.wilson@company.com",
    phone: "+1-555-0456",
    preferredChannels: ["slack" as const, "push" as const],
    escalationLevel: 1,
    lastContact: "30 min ago",
    isOnline: true,
  },
  {
    name: "Emily Davis",
    initials: "ED",
    role: "Senior Engineer",
    group: "engineering" as const,
    email: "emily.davis@company.com",
    preferredChannels: ["slack" as const, "email" as const],
    escalationLevel: 2,
    lastContact: "1 day ago",
    isOnline: false,
  },
  {
    name: "Robert Brown",
    initials: "RB",
    role: "CTO",
    group: "executive" as const,
    email: "robert.brown@company.com",
    phone: "+1-555-0789",
    preferredChannels: ["email" as const, "sms" as const],
    escalationLevel: 5,
    lastContact: "3 hours ago",
    isOnline: false,
  },
  {
    name: "Acme Corp",
    initials: "AC",
    role: "Enterprise Customer",
    group: "customer" as const,
    email: "support@acme.com",
    preferredChannels: ["email" as const],
    escalationLevel: 3,
    lastContact: "1 week ago",
    isOnline: false,
  },
  {
    name: "CloudHost Inc",
    initials: "CH",
    role: "Infrastructure Vendor",
    group: "vendor" as const,
    email: "support@cloudhost.com",
    phone: "+1-800-CLOUD",
    preferredChannels: ["email" as const, "slack" as const],
    escalationLevel: 2,
    lastContact: "2 days ago",
    isOnline: true,
  },
]

const groupCounts = {
  all: stakeholders.length,
  executive: stakeholders.filter((s) => s.group === "executive").length,
  "service-owner": stakeholders.filter((s) => s.group === "service-owner").length,
  operations: stakeholders.filter((s) => s.group === "operations").length,
  engineering: stakeholders.filter((s) => s.group === "engineering").length,
  customer: stakeholders.filter((s) => s.group === "customer").length,
  vendor: stakeholders.filter((s) => s.group === "vendor").length,
}

export default function StakeholdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStakeholders = stakeholders.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || s.group === activeTab
    return matchesSearch && matchesTab
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
                <BreadcrumbPage>Stakeholders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#0D3133]/10 p-2">
                <Users className="h-5 w-5 text-[#0D3133]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#0D3133]">Stakeholder Management</h1>
                <p className="text-sm text-muted-foreground">Manage stakeholder groups and communication preferences</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
              <Button size="sm" className="h-8 gap-1.5 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-3.5 w-3.5" />
                Add Stakeholder
              </Button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="shrink-0 border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stakeholders..."
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
            {filteredStakeholders.length} stakeholders
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="sticky top-0 bg-card border-b border-border px-6">
              <TabsList className="h-10 bg-transparent p-0 gap-4">
                <TabsTrigger
                  value="all"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  All
                  <Badge variant="secondary" className="ml-1.5">{groupCounts.all}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="executive"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Executives
                  <Badge variant="secondary" className="ml-1.5">{groupCounts.executive}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="service-owner"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Service Owners
                  <Badge variant="secondary" className="ml-1.5">{groupCounts["service-owner"]}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="operations"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Operations
                  <Badge variant="secondary" className="ml-1.5">{groupCounts.operations}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="engineering"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Engineering
                  <Badge variant="secondary" className="ml-1.5">{groupCounts.engineering}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="customer"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Customers
                  <Badge variant="secondary" className="ml-1.5">{groupCounts.customer}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="vendor"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Vendors
                  <Badge variant="secondary" className="ml-1.5">{groupCounts.vendor}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0 p-6">
              <div className="grid grid-cols-3 gap-4">
                {filteredStakeholders.map((stakeholder) => (
                  <StakeholderCard key={stakeholder.email} {...stakeholder} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
