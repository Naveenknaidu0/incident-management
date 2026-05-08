"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
  Send,
  Eye,
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Link as LinkIcon,
  Image,
  Heading1,
  Heading2,
  Quote,
  Minus,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
  Sparkles,
  FileText,
} from "lucide-react"

interface ResolutionStep {
  id: string
  title: string
  description: string
  code?: string
}

export default function NewArticlePage() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [summary, setSummary] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [rootCause, setRootCause] = useState("")
  const [workaround, setWorkaround] = useState("")
  const [validation, setValidation] = useState("")
  const [escalation, setEscalation] = useState("")
  const [services, setServices] = useState<string[]>([])
  const [steps, setSteps] = useState<ResolutionStep[]>([
    { id: "1", title: "", description: "", code: "" },
  ])
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "summary",
    "symptoms",
    "resolution",
  ])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const addStep = () => {
    setSteps([
      ...steps,
      { id: String(steps.length + 1), title: "", description: "", code: "" },
    ])
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id))
  }

  const updateStep = (id: string, field: keyof ResolutionStep, value: string) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const CollapsibleSection = ({
    id,
    title,
    children,
  }: {
    id: string
    title: string
    children: React.ReactNode
  }) => {
    const isExpanded = expandedSections.includes(id)
    return (
      <Card>
        <CardHeader
          className="cursor-pointer py-3"
          onClick={() => toggleSection(id)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </CardHeader>
        {isExpanded && <CardContent className="pt-0">{children}</CardContent>}
      </Card>
    )
  }

  const EditorToolbar = () => (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-b-0 bg-muted/50 p-1">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Italic className="h-4 w-4" />
      </Button>
      <div className="h-4 w-px bg-border" />
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Heading2 className="h-4 w-4" />
      </Button>
      <div className="h-4 w-px bg-border" />
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <ListOrdered className="h-4 w-4" />
      </Button>
      <div className="h-4 w-px bg-border" />
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Code className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Quote className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Minus className="h-4 w-4" />
      </Button>
      <div className="h-4 w-px bg-border" />
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Image className="h-4 w-4" />
      </Button>
    </div>
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
                  <Link href="/knowledge">Knowledge Base</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>New Article</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Create New Article</h1>
              <p className="text-sm text-muted-foreground">
                Create a knowledge base article with structured content
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Sparkles className="h-4 w-4" />
                AI Assist
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button size="sm" className="gap-2 bg-[#E69F50] hover:bg-[#E69F50]/90">
                <Send className="h-4 w-4" />
                Submit for Review
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 min-h-0">
          {/* Editor */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-3xl space-y-4">
              {/* Basic Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Article Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="network">Network</SelectItem>
                          <SelectItem value="vpn">VPN</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="database">Database</SelectItem>
                          <SelectItem value="cloud">Cloud</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="applications">Applications</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Affected Services</Label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {services.map((service) => (
                          <Badge key={service} variant="secondary" className="gap-1">
                            {service}
                            <button
                              onClick={() =>
                                setServices(services.filter((s) => s !== service))
                              }
                              className="ml-1 hover:text-red-600"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 gap-1 text-xs"
                          onClick={() => {
                            const service = prompt("Enter service name:")
                            if (service) setServices([...services, service])
                          }}
                        >
                          <Plus className="h-3 w-3" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Issue Summary */}
              <CollapsibleSection id="summary" title="Issue Summary">
                <EditorToolbar />
                <Textarea
                  placeholder="Describe the issue in detail..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="min-h-[120px] rounded-t-none"
                />
              </CollapsibleSection>

              {/* Symptoms */}
              <CollapsibleSection id="symptoms" title="Symptoms">
                <EditorToolbar />
                <Textarea
                  placeholder="List the symptoms users experience..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-[120px] rounded-t-none"
                />
              </CollapsibleSection>

              {/* Root Cause */}
              <CollapsibleSection id="rootcause" title="Root Cause">
                <EditorToolbar />
                <Textarea
                  placeholder="Explain the root cause of the issue..."
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                  className="min-h-[100px] rounded-t-none"
                />
              </CollapsibleSection>

              {/* Workaround */}
              <CollapsibleSection id="workaround" title="Workaround">
                <EditorToolbar />
                <Textarea
                  placeholder="Describe any temporary workarounds..."
                  value={workaround}
                  onChange={(e) => setWorkaround(e.target.value)}
                  className="min-h-[100px] rounded-t-none"
                />
              </CollapsibleSection>

              {/* Resolution Steps */}
              <CollapsibleSection id="resolution" title="Resolution Steps">
                <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="flex gap-3 rounded-lg border p-4">
                      <div className="flex flex-col items-center gap-2">
                        <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0D3133] text-xs font-medium text-white">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <Input
                          placeholder="Step title..."
                          value={step.title}
                          onChange={(e) => updateStep(step.id, "title", e.target.value)}
                        />
                        <Textarea
                          placeholder="Step description..."
                          value={step.description}
                          onChange={(e) =>
                            updateStep(step.id, "description", e.target.value)
                          }
                          className="min-h-[80px]"
                        />
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Code/Commands (optional)
                          </Label>
                          <Textarea
                            placeholder="Enter code or commands..."
                            value={step.code}
                            onChange={(e) => updateStep(step.id, "code", e.target.value)}
                            className="mt-1 min-h-[60px] font-mono text-sm"
                          />
                        </div>
                      </div>
                      {steps.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 text-red-600"
                          onClick={() => removeStep(step.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full gap-2" onClick={addStep}>
                    <Plus className="h-4 w-4" />
                    Add Step
                  </Button>
                </div>
              </CollapsibleSection>

              {/* Validation */}
              <CollapsibleSection id="validation" title="Validation">
                <EditorToolbar />
                <Textarea
                  placeholder="Describe how to validate the resolution..."
                  value={validation}
                  onChange={(e) => setValidation(e.target.value)}
                  className="min-h-[100px] rounded-t-none"
                />
              </CollapsibleSection>

              {/* Escalation */}
              <CollapsibleSection id="escalation" title="Escalation Guidance">
                <EditorToolbar />
                <Textarea
                  placeholder="Describe when and how to escalate..."
                  value={escalation}
                  onChange={(e) => setEscalation(e.target.value)}
                  className="min-h-[100px] rounded-t-none"
                />
              </CollapsibleSection>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden w-[300px] shrink-0 border-l border-border lg:block">
            <div className="h-full overflow-y-auto p-4">
              <div className="space-y-4">
                {/* AI Generate */}
                <Card className="bg-gradient-to-br from-[#0D3133]/5 to-[#E69F50]/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#E69F50]" />
                      <span className="text-sm font-medium">AI Article Generator</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Generate article content from an incident resolution
                    </p>
                    <Button size="sm" variant="outline" className="mt-3 w-full gap-2">
                      <FileText className="h-4 w-4" />
                      Import from Incident
                    </Button>
                  </CardContent>
                </Card>

                {/* Article Status */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Article Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                      Draft
                    </Badge>
                    <p className="mt-2 text-xs text-muted-foreground">
                      This article will need to be reviewed before publishing.
                    </p>
                  </CardContent>
                </Card>

                {/* Checklist */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Publishing Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-xs">
                      {[
                        { label: "Title added", done: !!title },
                        { label: "Category selected", done: !!category },
                        { label: "Summary written", done: !!summary },
                        { label: "Symptoms documented", done: !!symptoms },
                        { label: "Resolution steps added", done: steps.some((s) => s.title) },
                      ].map((item) => (
                        <li key={item.label} className="flex items-center gap-2">
                          <div
                            className={`h-4 w-4 rounded-full border-2 ${
                              item.done
                                ? "border-green-500 bg-green-500"
                                : "border-muted-foreground"
                            }`}
                          >
                            {item.done && (
                              <svg
                                className="h-full w-full text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span className={item.done ? "text-muted-foreground" : ""}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
