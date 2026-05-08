"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceHealthBadge } from "./service-health-badge"
import { EnvironmentBadge } from "./environment-badge"
import { CITypeBadge } from "./ci-type-badge"
import {
  ExternalLink,
  GitBranch,
  AlertCircle,
  User,
  Calendar,
  Server,
  FileText,
} from "lucide-react"
import Link from "next/link"

interface Relationship {
  id: string
  name: string
  type: string
  relationshipType: "depends-on" | "hosted-on" | "connected-to" | "replicated-to" | "backed-by"
}

interface CIDetailsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ci: {
    id: string
    name: string
    type: "server" | "database" | "application" | "api" | "cloud" | "network" | "container" | "storage"
    environment: "production" | "staging" | "qa" | "development" | "dr"
    status: "operational" | "degraded" | "partial-outage" | "major-outage" | "maintenance"
    owner: string
    description?: string
    lastUpdated: string
    createdAt: string
    relationships: Relationship[]
    activeIncidents: { id: string; title: string }[]
    notes?: string
  } | null
}

const relationshipLabels: Record<string, string> = {
  "depends-on": "Depends On",
  "hosted-on": "Hosted On",
  "connected-to": "Connected To",
  "replicated-to": "Replicated To",
  "backed-by": "Backed By",
}

export function CIDetailsDrawer({ open, onOpenChange, ci }: CIDetailsDrawerProps) {
  if (!ci) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[480px] overflow-y-auto sm:max-w-[480px]">
        <SheetHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <SheetTitle className="text-lg font-semibold text-[#0D3133]">
                {ci.name}
              </SheetTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <CITypeBadge type={ci.type} />
                <EnvironmentBadge environment={ci.environment} />
                <ServiceHealthBadge status={ci.status} />
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/cmdb/ci/${ci.id}`}>
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Open
              </Link>
            </Button>
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="relationships" className="flex-1">Relationships</TabsTrigger>
            <TabsTrigger value="incidents" className="flex-1">Incidents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            {/* Description */}
            {ci.description && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Description</p>
                <p className="mt-1 text-sm">{ci.description}</p>
              </div>
            )}

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  Owner
                </div>
                <p className="mt-1 text-sm font-medium">{ci.owner}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Last Updated
                </div>
                <p className="mt-1 text-sm font-medium">{ci.lastUpdated}</p>
              </div>
            </div>

            {/* Notes */}
            {ci.notes && (
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  Operational Notes
                </div>
                <p className="mt-1 text-sm">{ci.notes}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="relationships" className="mt-4 space-y-3">
            {ci.relationships.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">No relationships defined</p>
            ) : (
              ci.relationships.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/cmdb/ci/${rel.id}`}
                  className="group flex items-center justify-between rounded-lg border px-3 py-2 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium group-hover:text-[#E69F50]">{rel.name}</p>
                      <p className="text-xs text-muted-foreground">{rel.type}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {relationshipLabels[rel.relationshipType]}
                  </Badge>
                </Link>
              ))
            )}
          </TabsContent>

          <TabsContent value="incidents" className="mt-4 space-y-3">
            {ci.activeIncidents.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">No active incidents</p>
            ) : (
              ci.activeIncidents.map((incident) => (
                <Link
                  key={incident.id}
                  href={`/incidents/${incident.id}`}
                  className="group flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors hover:bg-muted/50"
                >
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium group-hover:text-[#E69F50]">{incident.id}</p>
                    <p className="text-xs text-muted-foreground">{incident.title}</p>
                  </div>
                </Link>
              ))
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
