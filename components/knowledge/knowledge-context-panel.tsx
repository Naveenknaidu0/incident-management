"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  AlertTriangle,
  Server,
  Link as LinkIcon,
  Lightbulb,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

interface RelatedArticle {
  id: string
  title: string
  relevance: number
}

interface KnowledgeContextPanelProps {
  relatedArticles?: RelatedArticle[]
  impactedServices?: string[]
  knownErrors?: { id: string; title: string }[]
  relatedIncidents?: { id: string; title: string }[]
  tips?: string[]
}

const defaultArticles: RelatedArticle[] = [
  { id: "KB0012847", title: "VPN Connection Troubleshooting Guide", relevance: 95 },
  { id: "KB0012654", title: "Network Timeout Resolution Steps", relevance: 87 },
  { id: "KB0012432", title: "Remote Access Configuration", relevance: 82 },
]

const defaultServices = ["VPN Gateway", "Authentication Service", "Network Core"]

const defaultKnownErrors = [
  { id: "KE0000234", title: "VPN disconnection during peak hours" },
  { id: "KE0000189", title: "Certificate expiration issues" },
]

const defaultIncidents = [
  { id: "INC0042678", title: "Similar VPN timeout reported" },
  { id: "INC0042543", title: "Network latency affecting VPN" },
]

const defaultTips = [
  "Check if the user has the latest VPN client version",
  "Verify network connectivity before troubleshooting VPN",
  "Review recent changes to firewall rules",
]

export function KnowledgeContextPanel({
  relatedArticles = defaultArticles,
  impactedServices = defaultServices,
  knownErrors = defaultKnownErrors,
  relatedIncidents = defaultIncidents,
  tips = defaultTips,
}: KnowledgeContextPanelProps) {
  return (
    <div className="space-y-4">
      {/* Related Articles */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <FileText className="h-4 w-4 text-[#E69F50]" />
            Related Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {relatedArticles.map((article) => (
            <div
              key={article.id}
              className="flex items-start justify-between gap-2 rounded-md p-2 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#0D3133]">{article.title}</p>
                <p className="text-[10px] text-muted-foreground">{article.id}</p>
              </div>
              <Badge variant="secondary" className="shrink-0 text-[10px]">
                {article.relevance}%
              </Badge>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
            View all articles
            <ChevronRight className="h-3 w-3" />
          </Button>
        </CardContent>
      </Card>

      {/* Impacted Services */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Server className="h-4 w-4 text-[#0D3133]" />
            Impacted Services
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {impactedServices.map((service) => (
              <Badge key={service} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Known Errors */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Known Errors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {knownErrors.map((error) => (
            <div
              key={error.id}
              className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#0D3133]">{error.title}</p>
                <p className="text-[10px] text-muted-foreground">{error.id}</p>
              </div>
              <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Related Incidents */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <LinkIcon className="h-4 w-4 text-[#73847B]" />
            Related Incidents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {relatedIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#0D3133]">{incident.title}</p>
                <p className="font-mono text-[10px] text-muted-foreground">{incident.id}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Operational Tips */}
      <Card className="bg-[#0D3133]/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="h-4 w-4 text-[#E69F50]" />
            Operational Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E69F50]/20 text-[10px] font-medium text-[#E69F50]">
                  {idx + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
