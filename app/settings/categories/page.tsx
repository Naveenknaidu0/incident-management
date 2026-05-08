"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { SettingsDrawer } from "@/components/settings/settings-drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2,
  GripVertical,
  FolderOpen,
} from "lucide-react"

interface Subcategory {
  id: string
  name: string
  active: boolean
  incidentCount: number
}

interface Category {
  id: string
  name: string
  color: string
  active: boolean
  subcategories: Subcategory[]
  incidentCount: number
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Network",
    color: "#0D3133",
    active: true,
    incidentCount: 156,
    subcategories: [
      { id: "1-1", name: "Connectivity", active: true, incidentCount: 89 },
      { id: "1-2", name: "VPN", active: true, incidentCount: 45 },
      { id: "1-3", name: "Firewall", active: true, incidentCount: 22 },
    ],
  },
  {
    id: "2",
    name: "Hardware",
    color: "#E69F50",
    active: true,
    incidentCount: 89,
    subcategories: [
      { id: "2-1", name: "Laptop", active: true, incidentCount: 45 },
      { id: "2-2", name: "Desktop", active: true, incidentCount: 23 },
      { id: "2-3", name: "Printer", active: true, incidentCount: 21 },
    ],
  },
  {
    id: "3",
    name: "Software",
    color: "#73847B",
    active: true,
    incidentCount: 234,
    subcategories: [
      { id: "3-1", name: "Email", active: true, incidentCount: 78 },
      { id: "3-2", name: "Office Apps", active: true, incidentCount: 56 },
      { id: "3-3", name: "Custom Apps", active: true, incidentCount: 67 },
      { id: "3-4", name: "Database", active: true, incidentCount: 33 },
    ],
  },
  {
    id: "4",
    name: "Security",
    color: "#DC2626",
    active: true,
    incidentCount: 45,
    subcategories: [
      { id: "4-1", name: "Access Request", active: true, incidentCount: 23 },
      { id: "4-2", name: "Malware", active: true, incidentCount: 12 },
      { id: "4-3", name: "Data Breach", active: true, incidentCount: 10 },
    ],
  },
  {
    id: "5",
    name: "Cloud Services",
    color: "#059669",
    active: true,
    incidentCount: 78,
    subcategories: [
      { id: "5-1", name: "AWS", active: true, incidentCount: 34 },
      { id: "5-2", name: "Azure", active: true, incidentCount: 28 },
      { id: "5-3", name: "GCP", active: true, incidentCount: 16 },
    ],
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [search, setSearch] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [expandedIds, setExpandedIds] = useState<string[]>(["1", "2"])

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setDrawerOpen(true)
  }

  const handleAdd = () => {
    setEditingCategory(null)
    setDrawerOpen(true)
  }

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.subcategories.some((sub) =>
        sub.name.toLowerCase().includes(search.toLowerCase())
      )
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
                <BreadcrumbPage>Categories</BreadcrumbPage>
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
                  Categories
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage incident categories and subcategories for classification
                </p>
              </div>
              <Button onClick={handleAdd} className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-4 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Categories List */}
            <div className="space-y-2 rounded-lg border border-border bg-card">
              {filteredCategories.map((category) => (
                <Collapsible
                  key={category.id}
                  open={expandedIds.includes(category.id)}
                  onOpenChange={() => toggleExpand(category.id)}
                >
                  <div className="border-b border-border last:border-0">
                    <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3 hover:bg-muted/50">
                      <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                      <ChevronRight
                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                          expandedIds.includes(category.id) ? "rotate-90" : ""
                        }`}
                      />
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="flex-1 text-left text-sm font-medium text-[#0D3133]">
                        {category.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {category.incidentCount} incidents
                      </Badge>
                      <Switch
                        checked={category.active}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(category)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="border-t border-border bg-muted/20 py-2 pl-16 pr-4">
                        {category.subcategories.map((sub) => (
                          <div
                            key={sub.id}
                            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted/50"
                          >
                            <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="flex-1 text-sm text-foreground">
                              {sub.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {sub.incidentCount}
                            </Badge>
                            <Switch checked={sub.active} />
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreHorizontal className="h-3.5 w-3.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 gap-2 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add Subcategory
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </div>
        </SettingsLayout>
      </div>

      {/* Edit Drawer */}
      <SettingsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingCategory ? "Edit Category" : "Add Category"}
        description="Configure category properties"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
              {editingCategory ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              defaultValue={editingCategory?.name}
              placeholder="Enter category name"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <div className="mt-1.5 flex gap-2">
              {["#0D3133", "#E69F50", "#73847B", "#DC2626", "#059669", "#7C3AED"].map(
                (color) => (
                  <button
                    key={color}
                    className="h-8 w-8 rounded-md border-2 border-transparent hover:border-foreground"
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Active</Label>
              <p className="text-xs text-muted-foreground">
                Enable this category for incident classification
              </p>
            </div>
            <Switch defaultChecked={editingCategory?.active ?? true} />
          </div>
        </div>
      </SettingsDrawer>
    </AppShell>
  )
}
