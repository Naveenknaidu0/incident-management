"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { SettingsDrawer } from "@/components/settings/settings-drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Search, Plus, MoreHorizontal, Edit, Trash2, Copy, FileText, Network, Database, Mail, Shield, Cloud, Laptop, Server } from "lucide-react"

interface Template {
  id: string
  name: string
  category: string
  description: string
  priority: string
  tags: string[]
  usageCount: number
  icon: React.ElementType
}

const mockTemplates: Template[] = [
  { id: "1", name: "Network Outage", category: "Network", description: "Complete network connectivity loss affecting multiple users", priority: "Critical", tags: ["network", "outage", "connectivity"], usageCount: 234, icon: Network },
  { id: "2", name: "VPN Connection Issue", category: "Network", description: "Users unable to connect to corporate VPN", priority: "High", tags: ["vpn", "remote", "connectivity"], usageCount: 456, icon: Network },
  { id: "3", name: "Database Performance", category: "Database", description: "Database slow query performance degradation", priority: "High", tags: ["database", "performance", "slow"], usageCount: 123, icon: Database },
  { id: "4", name: "Email Delivery Failure", category: "Email", description: "Emails not being sent or received", priority: "High", tags: ["email", "exchange", "delivery"], usageCount: 567, icon: Mail },
  { id: "5", name: "Security Incident", category: "Security", description: "Potential security breach or suspicious activity", priority: "Critical", tags: ["security", "breach", "urgent"], usageCount: 45, icon: Shield },
  { id: "6", name: "Cloud Service Degradation", category: "Cloud", description: "AWS/Azure service experiencing issues", priority: "High", tags: ["cloud", "aws", "azure"], usageCount: 189, icon: Cloud },
  { id: "7", name: "Laptop Hardware Failure", category: "Hardware", description: "User laptop experiencing hardware issues", priority: "Medium", tags: ["hardware", "laptop", "workstation"], usageCount: 678, icon: Laptop },
  { id: "8", name: "Server Unresponsive", category: "Infrastructure", description: "Production server not responding to requests", priority: "Critical", tags: ["server", "infrastructure", "down"], usageCount: 89, icon: Server },
]

const categoryColors: Record<string, string> = {
  Network: "bg-blue-100 text-blue-800",
  Database: "bg-purple-100 text-purple-800",
  Email: "bg-green-100 text-green-800",
  Security: "bg-red-100 text-red-800",
  Cloud: "bg-cyan-100 text-cyan-800",
  Hardware: "bg-orange-100 text-orange-800",
  Infrastructure: "bg-slate-100 text-slate-800",
}

const priorityColors: Record<string, string> = {
  Critical: "bg-red-500 text-white",
  High: "bg-orange-500 text-white",
  Medium: "bg-yellow-500 text-[#0D3133]",
  Low: "bg-green-500 text-white",
}

export default function TemplatesPage() {
  const [templates] = useState(mockTemplates)
  const [search, setSearch] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)

  const handleEdit = (template: Template) => {
    setEditingTemplate(template)
    setDrawerOpen(true)
  }

  const handleAdd = () => {
    setEditingTemplate(null)
    setDrawerOpen(true)
  }

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  )

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
                  <Link href="/settings">Settings</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Templates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Content with Settings Layout */}
        <SettingsLayout>
          <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[#0D3133]">
                  Incident Templates
                </h1>
                <p className="text-sm text-muted-foreground">
                  Pre-configured templates for common incident types
                </p>
              </div>
              <Button onClick={handleAdd} className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Add Template
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-4 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Templates Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <Card key={template.id} className="hover:border-[#E69F50] transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="rounded-md bg-muted p-2">
                          <Icon className="h-5 w-5 text-[#0D3133]" />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(template)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="mt-2 text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge variant="secondary" className={categoryColors[template.category]}>
                          {template.category}
                        </Badge>
                        <Badge className={priorityColors[template.priority]}>
                          {template.priority}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Used {template.usageCount} times
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </SettingsLayout>
      </div>

      {/* Edit Drawer */}
      <SettingsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingTemplate ? "Edit Template" : "Add Template"}
        description="Configure template fields and defaults"
        width="lg"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
              {editingTemplate ? "Save Changes" : "Create Template"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              defaultValue={editingTemplate?.name}
              placeholder="Enter template name"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select defaultValue={editingTemplate?.category || ""}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Network">Network</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Cloud">Cloud</SelectItem>
                <SelectItem value="Hardware">Hardware</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue={editingTemplate?.description}
              placeholder="Enter template description"
              className="mt-1.5"
              rows={3}
            />
          </div>
          <div>
            <Label>Default Priority</Label>
            <Select defaultValue={editingTemplate?.priority || "Medium"}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              defaultValue={editingTemplate?.tags.join(", ")}
              placeholder="network, outage, connectivity"
              className="mt-1.5"
            />
          </div>
        </div>
      </SettingsDrawer>
    </AppShell>
  )
}
