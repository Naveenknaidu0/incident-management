"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Home,
  Save,
  Send,
  X,
  Plus,
  FileText,
  Settings,
  Users,
  Server,
  AlertTriangle,
  Clock,
  Loader2,
  CheckCircle,
} from "lucide-react"

import { PriorityMatrix, getCalculatedPriority } from "@/components/create-incident/priority-matrix"
import { ServiceSelector } from "@/components/create-incident/service-selector"
import { SLAPreviewPanel } from "@/components/create-incident/sla-preview-panel"
import { IncidentTemplates, incidentTemplates, type IncidentTemplate } from "@/components/create-incident/incident-templates"
import { TriageIntelligencePanel } from "@/components/create-incident/triage-intelligence-panel"
import { AssignmentSelector } from "@/components/create-incident/assignment-selector"
import { ImpactAssessment } from "@/components/create-incident/impact-assessment"
import { AttachmentsSection } from "@/components/create-incident/attachments-section"

const categories = [
  { value: "infrastructure", label: "Infrastructure", subcategories: ["Network", "Server", "Storage", "Cloud"] },
  { value: "application", label: "Application", subcategories: ["Web App", "Mobile App", "API", "Integration"] },
  { value: "database", label: "Database", subcategories: ["Performance", "Connectivity", "Data Issues", "Backup"] },
  { value: "security", label: "Security", subcategories: ["Access", "Vulnerability", "Compliance", "Threat"] },
  { value: "communication", label: "Communication", subcategories: ["Email", "Phone", "Chat", "Video"] },
]

const incidentSources = [
  { value: "monitoring", label: "Monitoring Alert" },
  { value: "user-report", label: "User Report" },
  { value: "service-desk", label: "Service Desk" },
  { value: "auto-detection", label: "Auto-Detection" },
  { value: "scheduled-check", label: "Scheduled Check" },
]

const contactChannels = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "chat", label: "Chat" },
  { value: "portal", label: "Self-Service Portal" },
  { value: "api", label: "API/Integration" },
]

const environments = [
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "development", label: "Development" },
  { value: "qa", label: "QA/Testing" },
]

interface Attachment {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "complete" | "error"
}

export default function CreateIncidentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraftSaved, setIsDraftSaved] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    source: "",
    contactChannel: "",
    reportedBy: "",
    affectedUser: "",
    category: "",
    subcategory: "",
    environment: "",
    impact: "",
    urgency: "",
    tags: [] as string[],
    selectedServices: [] as string[],
    assignmentGroup: "",
    assignee: "",
    impactedUsers: "",
    impactedRegions: [] as string[],
    revenueImpact: "",
    executiveVisibility: false,
    outageScope: "",
    notifyStakeholders: true,
    notifyAssignmentGroup: true,
    notifyExecutives: false,
    publicUpdate: false,
  })
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState("")

  // Calculate priority
  const calculatedPriority = getCalculatedPriority(formData.impact, formData.urgency)

  // Get subcategories for selected category
  const selectedCategory = categories.find(c => c.value === formData.category)
  const subcategories = selectedCategory?.subcategories || []

  // Handle template selection
  const handleTemplateSelect = (template: IncidentTemplate) => {
    setSelectedTemplate(template.id)
    setFormData(prev => ({
      ...prev,
      title: template.titleTemplate,
      description: template.descriptionTemplate,
      category: template.category.toLowerCase(),
      subcategory: template.subcategory,
      impact: template.impact,
      urgency: template.urgency,
      tags: template.tags,
      selectedServices: [template.service],
    }))
  }

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  // Remove tag
  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }))
  }

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.title || formData.description) {
        setIsDraftSaved(true)
        setLastSaved(new Date())
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [formData])

  // Save draft
  const handleSaveDraft = () => {
    setIsDraftSaved(true)
    setLastSaved(new Date())
    toast({
      title: "Draft saved",
      description: "Your incident draft has been saved.",
    })
  }

  // Submit form
  const handleSubmit = async (createAndAssign = false) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newIncidentId = `INC00${Math.floor(10000 + Math.random() * 90000)}`
    
    toast({
      title: "Incident created",
      description: `${newIncidentId} has been created successfully.`,
    })
    
    router.push(`/incidents/${newIncidentId}`)
  }

  // Validation
  const isValid = formData.title && formData.category && formData.impact && formData.urgency && formData.selectedServices.length > 0

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
                  <Link href="/incidents/all">Incidents</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Incident</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Create Incident</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Report and triage a new incident
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Auto-save indicator */}
              {isDraftSaved && lastSaved && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  Draft saved {lastSaved.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Left: Form */}
          <div className="flex flex-1 flex-col min-h-0 border-r border-border">
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6 p-6">
                {/* Templates */}
                <IncidentTemplates
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={handleTemplateSelect}
                />

                <Separator />

                {/* Incident Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <FileText className="h-4 w-4 text-[#E69F50]" />
                      Incident Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Title */}
                    <div className="space-y-1.5">
                      <Label htmlFor="title" className="text-xs font-medium">
                        Title <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="Brief description of the incident"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="h-9"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <Label htmlFor="description" className="text-xs font-medium">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Detailed description of the incident..."
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={5}
                        className="resize-none text-sm font-mono"
                      />
                      <p className="text-xs text-muted-foreground">Supports Markdown formatting</p>
                    </div>

                    {/* Source & Channel */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Incident Source</Label>
                        <Select
                          value={formData.source}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                          <SelectContent>
                            {incidentSources.map((src) => (
                              <SelectItem key={src.value} value={src.value}>
                                {src.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Contact Channel</Label>
                        <Select
                          value={formData.contactChannel}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, contactChannel: value }))}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select channel" />
                          </SelectTrigger>
                          <SelectContent>
                            {contactChannels.map((ch) => (
                              <SelectItem key={ch.value} value={ch.value}>
                                {ch.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Reported By & Affected User */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Reported By</Label>
                        <Input
                          placeholder="Name or email"
                          value={formData.reportedBy}
                          onChange={(e) => setFormData(prev => ({ ...prev, reportedBy: e.target.value }))}
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Affected User</Label>
                        <Input
                          placeholder="Name or email"
                          value={formData.affectedUser}
                          onChange={(e) => setFormData(prev => ({ ...prev, affectedUser: e.target.value }))}
                          className="h-9"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Classification */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <Settings className="h-4 w-4 text-[#E69F50]" />
                      Classification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Category & Subcategory */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">
                          Category <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, subcategory: "" }))}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Subcategory</Label>
                        <Select
                          value={formData.subcategory}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}
                          disabled={!formData.category}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            {subcategories.map((sub) => (
                              <SelectItem key={sub} value={sub.toLowerCase()}>
                                {sub}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Environment */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Environment</Label>
                      <Select
                        value={formData.environment}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, environment: value }))}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                        <SelectContent>
                          {environments.map((env) => (
                            <SelectItem key={env.value} value={env.value}>
                              {env.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tags */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add tag"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addTag()
                            }
                          }}
                          className="h-8 flex-1 text-sm"
                        />
                        <Button type="button" variant="outline" size="sm" onClick={addTag}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Priority Matrix */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <AlertTriangle className="h-4 w-4 text-[#E69F50]" />
                      Priority Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PriorityMatrix
                      impact={formData.impact}
                      urgency={formData.urgency}
                      onImpactChange={(value) => setFormData(prev => ({ ...prev, impact: value }))}
                      onUrgencyChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
                    />
                  </CardContent>
                </Card>

                {/* Business Impact */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <AlertTriangle className="h-4 w-4 text-[#E69F50]" />
                      Business Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImpactAssessment
                      impactedUsers={formData.impactedUsers}
                      impactedRegions={formData.impactedRegions}
                      revenueImpact={formData.revenueImpact}
                      executiveVisibility={formData.executiveVisibility}
                      outageScope={formData.outageScope}
                      onImpactedUsersChange={(value) => setFormData(prev => ({ ...prev, impactedUsers: value }))}
                      onImpactedRegionsChange={(regions) => setFormData(prev => ({ ...prev, impactedRegions: regions }))}
                      onRevenueImpactChange={(value) => setFormData(prev => ({ ...prev, revenueImpact: value }))}
                      onExecutiveVisibilityChange={(value) => setFormData(prev => ({ ...prev, executiveVisibility: value }))}
                      onOutageScopeChange={(value) => setFormData(prev => ({ ...prev, outageScope: value }))}
                    />
                  </CardContent>
                </Card>

                {/* Service Impact */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <Server className="h-4 w-4 text-[#E69F50]" />
                      Service Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ServiceSelector
                      selectedServices={formData.selectedServices}
                      onSelectionChange={(services) => setFormData(prev => ({ ...prev, selectedServices: services }))}
                    />
                  </CardContent>
                </Card>

                {/* Assignment */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <Users className="h-4 w-4 text-[#E69F50]" />
                      Assignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AssignmentSelector
                      selectedGroup={formData.assignmentGroup}
                      selectedAssignee={formData.assignee}
                      onGroupChange={(groupId) => setFormData(prev => ({ ...prev, assignmentGroup: groupId }))}
                      onAssigneeChange={(assigneeId) => setFormData(prev => ({ ...prev, assignee: assigneeId }))}
                      suggestedGroup="grp-001"
                    />
                  </CardContent>
                </Card>

                {/* Attachments */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <FileText className="h-4 w-4 text-[#E69F50]" />
                      Attachments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AttachmentsSection
                      attachments={attachments}
                      onAttachmentsChange={setAttachments}
                    />
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <Send className="h-4 w-4 text-[#E69F50]" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="notify-stakeholders"
                        checked={formData.notifyStakeholders}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifyStakeholders: checked as boolean }))}
                      />
                      <Label htmlFor="notify-stakeholders" className="text-sm cursor-pointer">
                        Notify stakeholders
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="notify-group"
                        checked={formData.notifyAssignmentGroup}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifyAssignmentGroup: checked as boolean }))}
                      />
                      <Label htmlFor="notify-group" className="text-sm cursor-pointer">
                        Notify assignment group
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="notify-executives"
                        checked={formData.notifyExecutives}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifyExecutives: checked as boolean }))}
                      />
                      <Label htmlFor="notify-executives" className="text-sm cursor-pointer">
                        Notify executives
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="public-update"
                        checked={formData.publicUpdate}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, publicUpdate: checked as boolean }))}
                      />
                      <Label htmlFor="public-update" className="text-sm cursor-pointer">
                        Post public status page update
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Spacer for sticky footer */}
                <div className="h-20" />
              </div>
            </div>

            {/* Sticky Footer Actions */}
            <div className="shrink-0 border-t border-border bg-card px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    <span className="text-destructive">*</span> Required fields
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => router.back()}>
                    <X className="mr-1.5 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                    <Save className="mr-1.5 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!isValid || isSubmitting}
                    onClick={() => handleSubmit(true)}
                    className="border-[#0D3133] text-[#0D3133] hover:bg-[#0D3133]/5"
                  >
                    Create & Assign
                  </Button>
                  <Button
                    size="sm"
                    disabled={!isValid || isSubmitting}
                    onClick={() => handleSubmit(false)}
                    className="bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Create Incident
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Triage Intelligence Panel */}
          <div className="hidden w-[360px] shrink-0 lg:flex lg:flex-col min-h-0">
            {/* SLA Preview at Top */}
            <div className="shrink-0 p-4 border-b border-border bg-card">
              <SLAPreviewPanel
                priority={calculatedPriority}
                service={formData.selectedServices[0]}
              />
            </div>
            
            {/* Intelligence Panel (Scrollable) */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <TriageIntelligencePanel
                title={formData.title}
                service={formData.selectedServices[0]}
                category={formData.category}
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
