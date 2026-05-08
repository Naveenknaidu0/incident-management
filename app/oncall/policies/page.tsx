"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { EscalationLevelBadge } from "@/components/oncall/escalation-level-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Settings,
  MoreHorizontal,
  Copy,
  Trash2,
  ArrowRight,
  Clock,
  Users,
  RefreshCw,
} from "lucide-react"

const policies = [
  {
    id: "1",
    name: "Critical Incident Escalation",
    description: "Escalation policy for P1/Critical incidents",
    isActive: true,
    services: ["Payment Gateway", "Core Database", "Auth Service"],
    steps: [
      { level: "L1" as const, timeout: "5 min", targets: [{ name: "On-Call Primary", initials: "OC" }], retries: 2 },
      { level: "L2" as const, timeout: "10 min", targets: [{ name: "Team Lead", initials: "TL" }], retries: 2 },
      { level: "L3" as const, timeout: "15 min", targets: [{ name: "Engineering Manager", initials: "EM" }], retries: 1 },
      { level: "executive" as const, timeout: "30 min", targets: [{ name: "VP Engineering", initials: "VP" }], retries: 1 },
    ],
  },
  {
    id: "2",
    name: "High Priority Escalation",
    description: "Escalation policy for P2/High priority incidents",
    isActive: true,
    services: ["API Gateway", "CDN", "Monitoring"],
    steps: [
      { level: "L1" as const, timeout: "15 min", targets: [{ name: "On-Call Primary", initials: "OC" }], retries: 3 },
      { level: "L2" as const, timeout: "30 min", targets: [{ name: "Team Lead", initials: "TL" }], retries: 2 },
      { level: "L3" as const, timeout: "60 min", targets: [{ name: "Engineering Manager", initials: "EM" }], retries: 1 },
    ],
  },
  {
    id: "3",
    name: "Standard Escalation",
    description: "Default escalation policy for medium/low priority",
    isActive: true,
    services: ["All Other Services"],
    steps: [
      { level: "L1" as const, timeout: "30 min", targets: [{ name: "On-Call Primary", initials: "OC" }], retries: 3 },
      { level: "L2" as const, timeout: "60 min", targets: [{ name: "Team Lead", initials: "TL" }], retries: 2 },
    ],
  },
  {
    id: "4",
    name: "Security Incident Escalation",
    description: "Special escalation for security-related incidents",
    isActive: false,
    services: ["Security Services", "IAM"],
    steps: [
      { level: "L1" as const, timeout: "5 min", targets: [{ name: "Security On-Call", initials: "SO" }], retries: 2 },
      { level: "L2" as const, timeout: "10 min", targets: [{ name: "Security Lead", initials: "SL" }], retries: 2 },
      { level: "executive" as const, timeout: "15 min", targets: [{ name: "CISO", initials: "CS" }], retries: 1 },
    ],
  },
]

export default function PoliciesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPolicies = policies.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0D3133]">Escalation Policies</h1>
              <p className="text-sm text-muted-foreground">Define escalation rules and responder order</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                New Policy
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredPolicies.length} policies
            </div>
          </div>

          <div className="space-y-4">
            {filteredPolicies.map((policy) => (
              <Card key={policy.id} className={!policy.isActive ? "opacity-60" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-base font-semibold text-[#0D3133]">
                        {policy.name}
                      </CardTitle>
                      {!policy.isActive && (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Active</span>
                        <Switch checked={policy.isActive} />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Edit Policy
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Applied to Services</p>
                    <div className="flex flex-wrap gap-1">
                      {policy.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Escalation Steps */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-3">Escalation Path</p>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {policy.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="p-3 bg-muted/50 rounded-lg min-w-[140px]">
                            <div className="flex items-center justify-between mb-2">
                              <EscalationLevelBadge level={step.level} />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{step.timeout} timeout</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <RefreshCw className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{step.retries} retries</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Users className="h-3 w-3 text-muted-foreground" />
                                <div className="flex -space-x-1">
                                  {step.targets.map((target) => (
                                    <Avatar key={target.initials} className="h-5 w-5 border border-background">
                                      <AvatarFallback className="bg-[#0D3133] text-white text-[8px]">
                                        {target.initials}
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          {idx < policy.steps.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
