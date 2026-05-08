"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Send,
  Clock,
  FileText,
  Users,
  Building2,
  Globe,
  AlertTriangle,
  CheckCircle,
  Zap,
} from "lucide-react"

type CommunicationType = "internal" | "stakeholder" | "executive" | "customer" | "status-page"

interface Communication {
  id: string
  type: CommunicationType
  title: string
  content: string
  author: {
    name: string
    avatar?: string
  }
  timestamp: string
  severity?: "info" | "warning" | "critical"
  status?: "sent" | "scheduled" | "draft"
}

interface CommunicationCenterProps {
  communications: Communication[]
  className?: string
  onSendUpdate?: (type: CommunicationType, content: string) => void
}

const templates = [
  { id: "initial", label: "Initial Notification", content: "We are currently investigating an issue affecting..." },
  { id: "update", label: "Status Update", content: "Update: Our team is actively working on..." },
  { id: "mitigation", label: "Mitigation Started", content: "We have identified the root cause and are implementing..." },
  { id: "resolved", label: "Incident Resolved", content: "The incident has been resolved. Services are now operating normally..." },
]

const audienceConfig: Record<CommunicationType, { icon: typeof Users; label: string; color: string }> = {
  internal: { icon: Users, label: "Internal Teams", color: "text-blue-600" },
  stakeholder: { icon: Building2, label: "Stakeholders", color: "text-purple-600" },
  executive: { icon: AlertTriangle, label: "Executives", color: "text-orange-600" },
  customer: { icon: Users, label: "Customers", color: "text-green-600" },
  "status-page": { icon: Globe, label: "Status Page", color: "text-[#0D3133]" },
}

export function CommunicationCenter({
  communications,
  className,
  onSendUpdate,
}: CommunicationCenterProps) {
  const [activeTab, setActiveTab] = useState<CommunicationType>("internal")
  const [message, setMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [updateType, setUpdateType] = useState<string>("update")

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setMessage(template.content)
      setSelectedTemplate(templateId)
    }
  }

  const filteredCommunications = communications.filter((c) => c.type === activeTab)

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CommunicationType)} className="flex flex-col h-full">
        <TabsList className="shrink-0 w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
          {(Object.keys(audienceConfig) as CommunicationType[]).map((type) => {
            const config = audienceConfig[type]
            const count = communications.filter((c) => c.type === type).length

            return (
              <TabsTrigger
                key={type}
                value={type}
                className="relative rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent text-xs"
              >
                <span className="flex items-center gap-1.5">
                  <config.icon className="h-3 w-3" />
                  {config.label}
                  {count > 0 && (
                    <Badge variant="secondary" className="h-4 min-w-4 px-1 text-[10px]">
                      {count}
                    </Badge>
                  )}
                </span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Composer */}
          <Card className="shrink-0 m-3 mb-0">
            <CardHeader className="py-2 px-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium">Quick Compose</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger className="h-7 w-[140px] text-[10px]">
                      <SelectValue placeholder="Use Template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id} className="text-xs">
                          {template.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={updateType} onValueChange={setUpdateType}>
                    <SelectTrigger className="h-7 w-[100px] text-[10px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info" className="text-xs">Info</SelectItem>
                      <SelectItem value="update" className="text-xs">Update</SelectItem>
                      <SelectItem value="warning" className="text-xs">Warning</SelectItem>
                      <SelectItem value="critical" className="text-xs">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-3 pb-3 pt-0">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your update message..."
                className="min-h-[60px] text-xs resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 text-[10px]">
                    <FileText className="h-3 w-3 mr-1" />
                    Attach
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-[10px]">
                    <Clock className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                </div>
                <Button
                  size="sm"
                  className="h-7 bg-[#E69F50] hover:bg-[#d18f40] text-[#0D3133]"
                  onClick={() => onSendUpdate?.(activeTab, message)}
                  disabled={!message.trim()}
                >
                  <Send className="h-3 w-3 mr-1" />
                  Send Update
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Communication Timeline */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
            {filteredCommunications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <Send className="h-8 w-8 mb-2 opacity-50" />
                <span className="text-xs">No communications sent yet</span>
              </div>
            ) : (
              filteredCommunications.map((comm) => (
                <Card key={comm.id} className="border-border">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={comm.author.avatar} />
                          <AvatarFallback className="text-[8px] bg-[#0D3133] text-white">
                            {comm.author.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">{comm.title}</span>
                            {comm.severity && (
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-[10px] px-1 py-0",
                                  comm.severity === "critical" && "border-red-200 text-red-600",
                                  comm.severity === "warning" && "border-amber-200 text-amber-600",
                                  comm.severity === "info" && "border-blue-200 text-blue-600"
                                )}
                              >
                                {comm.severity}
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                            {comm.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] text-muted-foreground">{comm.timestamp}</span>
                        {comm.status && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] px-1.5 py-0",
                              comm.status === "sent" && "bg-green-100 text-green-700",
                              comm.status === "scheduled" && "bg-blue-100 text-blue-700",
                              comm.status === "draft" && "bg-slate-100 text-slate-700"
                            )}
                          >
                            {comm.status === "sent" && <CheckCircle className="h-2.5 w-2.5 mr-0.5" />}
                            {comm.status === "scheduled" && <Clock className="h-2.5 w-2.5 mr-0.5" />}
                            {comm.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
