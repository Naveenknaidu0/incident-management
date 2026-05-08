"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Sparkles,
  FileText,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  ChevronRight,
  Send,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react"

interface AIRecommendation {
  id: string
  type: "article" | "resolution" | "assignment" | "escalation"
  title: string
  confidence: number
  reason: string
}

interface SimilarIncident {
  id: string
  title: string
  similarity: number
  resolution: string
}

const mockRecommendations: AIRecommendation[] = [
  {
    id: "1",
    type: "article",
    title: "KB0012847 - VPN Connection Timeout Resolution",
    confidence: 94,
    reason: "Matches symptoms: connection timeout, certificate errors",
  },
  {
    id: "2",
    type: "resolution",
    title: "Restart VPN service and clear cached credentials",
    confidence: 89,
    reason: "Resolved 847 similar incidents this month",
  },
  {
    id: "3",
    type: "assignment",
    title: "Network Operations Team",
    confidence: 92,
    reason: "Best fit based on service, priority, and availability",
  },
  {
    id: "4",
    type: "escalation",
    title: "Consider escalation to L2",
    confidence: 76,
    reason: "SLA at risk, similar incidents required L2 involvement",
  },
]

const mockSimilarIncidents: SimilarIncident[] = [
  {
    id: "INC0041234",
    title: "VPN disconnects intermittently for remote users",
    similarity: 92,
    resolution: "Certificate renewal resolved the issue",
  },
  {
    id: "INC0040987",
    title: "Unable to connect to VPN from specific locations",
    similarity: 87,
    resolution: "Firewall rule adjustment fixed connectivity",
  },
  {
    id: "INC0040756",
    title: "VPN timeout errors during peak hours",
    similarity: 84,
    resolution: "Load balancer configuration updated",
  },
]

const mockInsights = [
  { label: "Recurring VPN issues this week", value: "12", trend: "+40%" },
  { label: "Network team workload", value: "High", trend: "87% capacity" },
  { label: "Similar incidents resolved", value: "847", trend: "94% success" },
  { label: "Predicted resolution time", value: "45 min", trend: "Based on history" },
]

export function AICopilotPanel() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("recommendations")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return FileText
      case "resolution":
        return Target
      case "assignment":
        return Users
      case "escalation":
        return AlertTriangle
      default:
        return Lightbulb
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-50"
    if (confidence >= 75) return "text-amber-600 bg-amber-50"
    return "text-slate-600 bg-slate-100"
  }

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="shrink-0 border-b border-border bg-gradient-to-r from-[#0D3133] to-[#1A4A4D] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E69F50]/20">
            <Brain className="h-4 w-4 text-[#E69F50]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Operations Copilot</h3>
            <p className="text-xs text-white/70">Powered by operational intelligence</p>
          </div>
        </div>
      </div>

      {/* Query Input */}
      <div className="shrink-0 border-b border-border p-3">
        <div className="relative">
          <Input
            placeholder="Ask the copilot anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10 text-sm"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col min-h-0">
        <TabsList className="mx-3 mt-3 grid h-8 w-auto grid-cols-3">
          <TabsTrigger value="recommendations" className="text-xs">
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="similar" className="text-xs">
            Similar
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-xs">
            Insights
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-3">
          <TabsContent value="recommendations" className="m-0 space-y-2">
            {mockRecommendations.map((rec) => {
              const Icon = getTypeIcon(rec.type)
              return (
                <Card key={rec.id} className="cursor-pointer transition-all hover:border-[#E69F50]/50">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-4 w-4 text-[#0D3133]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium text-[#0D3133] line-clamp-2">
                            {rec.title}
                          </p>
                          <Badge
                            variant="secondary"
                            className={`shrink-0 text-[10px] ${getConfidenceColor(rec.confidence)}`}
                          >
                            {rec.confidence}%
                          </Badge>
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground line-clamp-1">
                          {rec.reason}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button size="sm" variant="ghost" className="h-6 gap-1 text-xs text-[#E69F50]">
                        Apply
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="similar" className="m-0 space-y-2">
            {mockSimilarIncidents.map((incident) => (
              <Card key={incident.id} className="cursor-pointer transition-all hover:border-[#E69F50]/50">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-medium text-[#0D3133]">
                      {incident.id}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${getConfidenceColor(incident.similarity)}`}
                    >
                      {incident.similarity}% match
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs font-medium text-[#0D3133] line-clamp-2">
                    {incident.title}
                  </p>
                  <div className="mt-2 rounded bg-green-50 p-2">
                    <p className="text-[10px] font-medium text-green-700">Resolution:</p>
                    <p className="text-[10px] text-green-600">{incident.resolution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="m-0 space-y-2">
            {mockInsights.map((insight, idx) => (
              <Card key={idx}>
                <CardContent className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{insight.label}</p>
                    <p className="text-lg font-semibold text-[#0D3133]">{insight.value}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {insight.trend}
                  </Badge>
                </CardContent>
              </Card>
            ))}
            
            <Card className="bg-[#0D3133]/5">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#E69F50]" />
                  <span className="text-xs font-medium text-[#0D3133]">AI Prediction</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Based on current patterns, there&apos;s an 78% chance this incident will require 
                  L2 escalation if not resolved within the next 30 minutes.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
