"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { SLAPolicyTable } from "@/components/sla/sla-policy-table"
import { Plus, Download, Upload } from "lucide-react"

// Mock data
const policies = [
  {
    id: "1",
    name: "P1 Critical Resolution",
    slaType: "Resolution",
    priorityMapping: ["P1"],
    businessHours: "24x7",
    escalationRule: "3-level, 30min intervals",
    status: "active" as const,
  },
  {
    id: "2",
    name: "P2 High Resolution",
    slaType: "Resolution",
    priorityMapping: ["P2"],
    businessHours: "24x7",
    escalationRule: "3-level, 1hr intervals",
    status: "active" as const,
  },
  {
    id: "3",
    name: "P3 Medium Resolution",
    slaType: "Resolution",
    priorityMapping: ["P3"],
    businessHours: "Business Hours",
    escalationRule: "2-level, 2hr intervals",
    status: "active" as const,
  },
  {
    id: "4",
    name: "P4 Low Resolution",
    slaType: "Resolution",
    priorityMapping: ["P4"],
    businessHours: "Business Hours",
    escalationRule: "1-level, 4hr intervals",
    status: "active" as const,
  },
  {
    id: "5",
    name: "Standard Response SLA",
    slaType: "Response",
    priorityMapping: ["P1", "P2", "P3", "P4"],
    businessHours: "24x7",
    escalationRule: "2-level, 15min intervals",
    status: "active" as const,
  },
  {
    id: "6",
    name: "VIP Customer SLA",
    slaType: "Resolution",
    priorityMapping: ["P1", "P2"],
    businessHours: "24x7",
    escalationRule: "4-level, 15min intervals",
    status: "active" as const,
  },
  {
    id: "7",
    name: "Update SLA - Standard",
    slaType: "Update",
    priorityMapping: ["P1", "P2", "P3"],
    businessHours: "Business Hours",
    escalationRule: "1-level, 1hr intervals",
    status: "active" as const,
  },
  {
    id: "8",
    name: "New Critical Policy (Draft)",
    slaType: "Resolution",
    priorityMapping: ["P1"],
    businessHours: "24x7",
    escalationRule: "5-level, 15min intervals",
    status: "draft" as const,
  },
  {
    id: "9",
    name: "Legacy Response SLA",
    slaType: "Response",
    priorityMapping: ["P3", "P4"],
    businessHours: "Business Hours",
    escalationRule: "1-level, 2hr intervals",
    status: "inactive" as const,
  },
]

export default function SLAPoliciesPage() {
  return (
    <AppShell>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">SLA Policies</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage SLA policy configurations and escalation rules
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Upload className="mr-1.5 h-3.5 w-3.5" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Export
              </Button>
              <Button size="sm" className="h-8 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                New Policy
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <SLAPolicyTable policies={policies} />
        </div>
      </div>
    </AppShell>
  )
}
