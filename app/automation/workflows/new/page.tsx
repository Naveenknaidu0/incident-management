"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Home,
  ArrowLeft,
  Zap,
  Box,
  GitBranch,
  Save,
  Play,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react"
import { TriggerLibrary, triggers, type Trigger } from "@/components/automation/trigger-library"
import { ActionLibrary, actions, type Action } from "@/components/automation/action-library"
import { WorkflowCanvas, demoWorkflow, type WorkflowNode } from "@/components/automation/workflow-canvas"
import { WorkflowConfigPanel } from "@/components/automation/workflow-config-panel"
import { LucideIcon } from "lucide-react"

export default function NewWorkflowPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeLibrary, setActiveLibrary] = useState<"triggers" | "actions">("triggers")
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>(demoWorkflow)
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>()
  const [workflowName, setWorkflowName] = useState("New Workflow")
  const [workflowDescription, setWorkflowDescription] = useState("")
  const [workflowState, setWorkflowState] = useState<"draft" | "active" | "paused" | "failed" | "archived">("draft")

  const handleSelectTrigger = (trigger: Trigger) => {
    // Replace the first node (trigger) with the selected trigger
    const newTriggerNode: WorkflowNode = {
      id: `trigger-${Date.now()}`,
      type: "trigger",
      name: trigger.name,
      description: trigger.description,
      icon: trigger.icon,
    }

    if (workflowNodes.length > 0 && workflowNodes[0].type === "trigger") {
      setWorkflowNodes([newTriggerNode, ...workflowNodes.slice(1)])
    } else {
      setWorkflowNodes([newTriggerNode, ...workflowNodes])
    }
    setSelectedNodeId(newTriggerNode.id)
  }

  const handleSelectAction = (action: Action) => {
    const newActionNode: WorkflowNode = {
      id: `action-${Date.now()}`,
      type: "action",
      name: action.name,
      description: action.description,
      icon: action.icon,
    }
    setWorkflowNodes([...workflowNodes, newActionNode])
    setSelectedNodeId(newActionNode.id)
  }

  const handleAddNode = (afterNodeId: string, type: string) => {
    const index = workflowNodes.findIndex((n) => n.id === afterNodeId)
    if (index === -1) return

    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: type as WorkflowNode["type"],
      name: type === "condition" ? "New Condition" : "New Action",
      description: "Configure this step",
      icon: type === "condition" ? GitBranch : Box,
    }

    const newNodes = [...workflowNodes]
    newNodes.splice(index + 1, 0, newNode)
    setWorkflowNodes(newNodes)
    setSelectedNodeId(newNode.id)
  }

  const handleRemoveNode = (nodeId: string) => {
    setWorkflowNodes(workflowNodes.filter((n) => n.id !== nodeId))
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(undefined)
    }
  }

  const handleSave = () => {
    toast({
      title: "Workflow saved",
      description: "Your workflow has been saved as a draft.",
    })
  }

  const handlePublish = () => {
    setWorkflowState("active")
    toast({
      title: "Workflow published",
      description: "Your workflow is now active.",
    })
    router.push("/automation")
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
                  <Link href="/automation">Automation</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>New Workflow</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/automation">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-[#0D3133]">{workflowName}</h1>
                <p className="text-xs text-muted-foreground">
                  {workflowNodes.length} steps · Draft
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Redo className="h-4 w-4" />
              </Button>
              <div className="mx-2 h-6 w-px bg-border" />
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="mr-1.5 h-4 w-4" />
                Save Draft
              </Button>
              <Button
                size="sm"
                className="bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90"
                onClick={handlePublish}
              >
                <Play className="mr-1.5 h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>
        </div>

        {/* Builder Area */}
        <div className="flex flex-1 min-h-0">
          {/* Left Panel - Library */}
          <div className="w-64 shrink-0 border-r border-border bg-card flex flex-col min-h-0">
            <div className="shrink-0 border-b border-border p-2">
              <Tabs value={activeLibrary} onValueChange={(v) => setActiveLibrary(v as "triggers" | "actions")}>
                <TabsList className="w-full">
                  <TabsTrigger value="triggers" className="flex-1 gap-1.5 text-xs">
                    <Zap className="h-3.5 w-3.5" />
                    Triggers
                  </TabsTrigger>
                  <TabsTrigger value="actions" className="flex-1 gap-1.5 text-xs">
                    <Box className="h-3.5 w-3.5" />
                    Actions
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              {activeLibrary === "triggers" ? (
                <TriggerLibrary
                  onSelectTrigger={handleSelectTrigger}
                  selectedTriggerId={workflowNodes.find((n) => n.type === "trigger")?.id}
                />
              ) : (
                <ActionLibrary
                  onSelectAction={handleSelectAction}
                />
              )}
            </div>
          </div>

          {/* Center - Canvas */}
          <div className="flex flex-1 flex-col min-h-0 bg-[#F8F7F5]">
            {/* Canvas Toolbar */}
            <div className="shrink-0 flex items-center justify-between border-b border-border bg-card px-4 py-2">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground px-2">100%</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                Drag components from the left panel to add steps
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 min-h-0 overflow-auto">
              <WorkflowCanvas
                nodes={workflowNodes}
                selectedNodeId={selectedNodeId}
                onSelectNode={setSelectedNodeId}
                onAddNode={handleAddNode}
                onRemoveNode={handleRemoveNode}
              />
            </div>
          </div>

          {/* Right Panel - Configuration */}
          <div className="w-80 shrink-0 min-h-0">
            <WorkflowConfigPanel
              workflowName={workflowName}
              workflowDescription={workflowDescription}
              workflowState={workflowState}
              onNameChange={setWorkflowName}
              onDescriptionChange={setWorkflowDescription}
              onStateChange={(state) => setWorkflowState(state)}
            />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
