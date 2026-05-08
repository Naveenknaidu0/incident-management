"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Home,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  FormInput,
  LayoutGrid,
  FileText,
} from "lucide-react"

interface Form {
  id: string
  name: string
  type: "incident" | "request" | "change"
  fieldCount: number
  status: "published" | "draft"
  lastModified: string
  usageCount: number
}

const mockForms: Form[] = [
  { id: "1", name: "Standard Incident Form", type: "incident", fieldCount: 12, status: "published", lastModified: "2 hours ago", usageCount: 1234 },
  { id: "2", name: "VIP Incident Form", type: "incident", fieldCount: 15, status: "published", lastModified: "1 day ago", usageCount: 89 },
  { id: "3", name: "Network Incident Form", type: "incident", fieldCount: 18, status: "published", lastModified: "3 days ago", usageCount: 456 },
  { id: "4", name: "Security Incident Form", type: "incident", fieldCount: 22, status: "published", lastModified: "1 week ago", usageCount: 123 },
  { id: "5", name: "Hardware Request Form", type: "request", fieldCount: 10, status: "published", lastModified: "2 weeks ago", usageCount: 567 },
  { id: "6", name: "Software Request Form", type: "request", fieldCount: 8, status: "draft", lastModified: "3 days ago", usageCount: 0 },
  { id: "7", name: "Access Request Form", type: "request", fieldCount: 14, status: "published", lastModified: "1 month ago", usageCount: 890 },
  { id: "8", name: "Emergency Change Form", type: "change", fieldCount: 20, status: "published", lastModified: "2 weeks ago", usageCount: 45 },
]

const typeColors: Record<string, string> = {
  incident: "bg-red-100 text-red-800",
  request: "bg-blue-100 text-blue-800",
  change: "bg-purple-100 text-purple-800",
}

export default function FormsPage() {
  const [forms] = useState(mockForms)
  const [search, setSearch] = useState("")

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(search.toLowerCase())
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
                <BreadcrumbPage>Dynamic Forms</BreadcrumbPage>
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
                  Dynamic Forms
                </h1>
                <p className="text-sm text-muted-foreground">
                  Build and customize forms for incident intake
                </p>
              </div>
              <Link href="/settings/forms/new">
                <Button className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                  <Plus className="h-4 w-4" />
                  Create Form
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-red-100 p-2">
                    <FormInput className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#0D3133]">4</p>
                    <p className="text-xs text-muted-foreground">Incident Forms</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-blue-100 p-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#0D3133]">3</p>
                    <p className="text-xs text-muted-foreground">Request Forms</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-purple-100 p-2">
                    <LayoutGrid className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#0D3133]">1</p>
                    <p className="text-xs text-muted-foreground">Change Forms</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Search */}
            <div className="relative mb-4 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search forms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Forms Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredForms.map((form) => (
                <Card key={form.id} className="hover:border-[#E69F50] transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className={typeColors[form.type]}>
                        {form.type}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/settings/forms/${form.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
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
                    <CardTitle className="mt-2 text-base">{form.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {form.fieldCount} fields
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Modified {form.lastModified}</span>
                      <Badge
                        variant={form.status === "published" ? "default" : "secondary"}
                        className={form.status === "published" ? "bg-green-100 text-green-800" : ""}
                      >
                        {form.status}
                      </Badge>
                    </div>
                    {form.usageCount > 0 && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Used {form.usageCount} times
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SettingsLayout>
      </div>
    </AppShell>
  )
}
