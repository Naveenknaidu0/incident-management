"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Home,
  Save,
  Eye,
  GripVertical,
  Plus,
  Trash2,
  Type,
  AlignLeft,
  List,
  CheckSquare,
  Calendar,
  Upload,
  ToggleLeft,
  Hash,
  Mail,
  Link2,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FormField {
  id: string
  type: string
  label: string
  required: boolean
  placeholder?: string
}

const fieldTypes = [
  { type: "text", label: "Text Field", icon: Type },
  { type: "textarea", label: "Text Area", icon: AlignLeft },
  { type: "dropdown", label: "Dropdown", icon: List },
  { type: "multiselect", label: "Multi-Select", icon: CheckSquare },
  { type: "checkbox", label: "Checkbox", icon: ToggleLeft },
  { type: "date", label: "Date Picker", icon: Calendar },
  { type: "file", label: "File Upload", icon: Upload },
  { type: "number", label: "Number", icon: Hash },
  { type: "email", label: "Email", icon: Mail },
  { type: "url", label: "URL", icon: Link2 },
]

const defaultFields: FormField[] = [
  { id: "1", type: "text", label: "Title", required: true, placeholder: "Enter incident title" },
  { id: "2", type: "dropdown", label: "Category", required: true },
  { id: "3", type: "dropdown", label: "Subcategory", required: true },
  { id: "4", type: "textarea", label: "Description", required: true, placeholder: "Describe the incident" },
  { id: "5", type: "dropdown", label: "Priority", required: true },
  { id: "6", type: "dropdown", label: "Affected Service", required: false },
]

export default function FormBuilderPage() {
  const [fields, setFields] = useState<FormField[]>(defaultFields)
  const [selectedField, setSelectedField] = useState<FormField | null>(null)

  const handleAddField = (type: string) => {
    const fieldType = fieldTypes.find((f) => f.type === type)
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: fieldType?.label || "New Field",
      required: false,
    }
    setFields([...fields, newField])
    setSelectedField(newField)
  }

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id))
    if (selectedField?.id === id) {
      setSelectedField(null)
    }
  }

  const getFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find((f) => f.type === type)
    return fieldType?.icon || Type
  }

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
                <BreadcrumbLink asChild>
                  <Link href="/settings/forms">Forms</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>New Form</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                defaultValue="New Incident Form"
                className="w-64 border-0 bg-transparent text-lg font-semibold focus-visible:ring-0"
              />
              <Badge variant="secondary">Draft</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Save className="h-4 w-4" />
                Save Form
              </Button>
            </div>
          </div>
        </div>

        {/* Builder Area */}
        <div className="flex flex-1 min-h-0">
          {/* Field Palette */}
          <div className="w-56 shrink-0 border-r border-border bg-card overflow-y-auto p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Field Types
            </h3>
            <div className="space-y-1">
              {fieldTypes.map((field) => {
                const Icon = field.icon
                return (
                  <button
                    key={field.type}
                    onClick={() => handleAddField(field.type)}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {field.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-y-auto bg-muted/30 p-6">
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Form Fields</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {fields.map((field) => {
                    const Icon = getFieldIcon(field.type)
                    return (
                      <div
                        key={field.id}
                        onClick={() => setSelectedField(field)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors",
                          selectedField?.id === field.id
                            ? "border-[#E69F50] bg-[#E69F50]/5"
                            : "hover:border-muted-foreground"
                        )}
                      >
                        <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{field.label}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {field.type.replace("-", " ")}
                          </p>
                        </div>
                        {field.required && (
                          <Badge variant="outline" className="text-xs">
                            Required
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveField(field.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}

                  <Button
                    variant="outline"
                    className="w-full gap-2 border-dashed"
                    onClick={() => handleAddField("text")}
                  >
                    <Plus className="h-4 w-4" />
                    Add Field
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="w-72 shrink-0 border-l border-border bg-card overflow-y-auto">
            {selectedField ? (
              <div className="p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Field Properties</h3>
                </div>

                <Tabs defaultValue="general" className="space-y-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="general" className="flex-1">
                      General
                    </TabsTrigger>
                    <TabsTrigger value="validation" className="flex-1">
                      Validation
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4">
                    <div>
                      <Label htmlFor="label">Label</Label>
                      <Input
                        id="label"
                        value={selectedField.label}
                        onChange={(e) => {
                          setFields(
                            fields.map((f) =>
                              f.id === selectedField.id
                                ? { ...f, label: e.target.value }
                                : f
                            )
                          )
                          setSelectedField({ ...selectedField, label: e.target.value })
                        }}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="placeholder">Placeholder</Label>
                      <Input
                        id="placeholder"
                        value={selectedField.placeholder || ""}
                        placeholder="Enter placeholder text"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>Field Type</Label>
                      <Select value={selectedField.type}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map((ft) => (
                            <SelectItem key={ft.type} value={ft.type}>
                              {ft.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="validation" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Required</Label>
                        <p className="text-xs text-muted-foreground">
                          User must fill this field
                        </p>
                      </div>
                      <Switch
                        checked={selectedField.required}
                        onCheckedChange={(checked) => {
                          setFields(
                            fields.map((f) =>
                              f.id === selectedField.id
                                ? { ...f, required: checked }
                                : f
                            )
                          )
                          setSelectedField({ ...selectedField, required: checked })
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Read Only</Label>
                        <p className="text-xs text-muted-foreground">
                          Field cannot be edited
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div>
                      <Label htmlFor="helpText">Help Text</Label>
                      <Input
                        id="helpText"
                        placeholder="Enter help text"
                        className="mt-1.5"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-4">
                <p className="text-center text-sm text-muted-foreground">
                  Select a field to edit its properties
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
