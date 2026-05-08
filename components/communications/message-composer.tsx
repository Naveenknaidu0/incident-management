"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Clock,
  Paperclip,
  Eye,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Bell,
  X,
} from "lucide-react"

const channels = [
  { id: "email", label: "Email", icon: Mail },
  { id: "slack", label: "Slack", icon: MessageSquare },
  { id: "teams", label: "Teams", icon: MessageSquare },
  { id: "sms", label: "SMS", icon: Phone },
  { id: "push", label: "Push", icon: Bell },
]

const templates = [
  { id: "major-incident", label: "Major Incident Alert" },
  { id: "sla-breach", label: "SLA Breach Warning" },
  { id: "executive-update", label: "Executive Update" },
  { id: "service-restoration", label: "Service Restoration" },
  { id: "maintenance", label: "Maintenance Notification" },
  { id: "customer-outage", label: "Customer Outage Alert" },
]

interface MessageComposerProps {
  incidentId?: string
  onClose?: () => void
  onSend?: () => void
}

export function MessageComposer({ incidentId, onClose, onSend }: MessageComposerProps) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["email"])
  const [priority, setPriority] = useState("informational")
  const [audience, setAudience] = useState("")
  const [activeTab, setActiveTab] = useState("compose")

  const toggleChannel = (channelId: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId)
        ? prev.filter((c) => c !== channelId)
        : [...prev, channelId]
    )
  }

  return (
    <Card className="border-[#E69F50]/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-[#0D3133]">
            Compose Message
          </CardTitle>
          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-8">
                <TabsTrigger value="compose" className="text-xs px-3 h-6">Compose</TabsTrigger>
                <TabsTrigger value="preview" className="text-xs px-3 h-6">Preview</TabsTrigger>
              </TabsList>
            </Tabs>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="compose" className="mt-0 space-y-4">
            {/* Template Selection */}
            <div className="space-y-1.5">
              <Label className="text-xs">Template</Label>
              <Select>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select a template..." />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <Label className="text-xs">Subject *</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter message subject..."
                className="h-8 text-sm"
              />
            </div>

            {/* Priority & Audience */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informational">Informational</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="executive-critical">Executive Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select audience..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-stakeholders">All Stakeholders</SelectItem>
                    <SelectItem value="executives">Executives</SelectItem>
                    <SelectItem value="service-owners">Service Owners</SelectItem>
                    <SelectItem value="operations">Operations Team</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Channels */}
            <div className="space-y-1.5">
              <Label className="text-xs">Delivery Channels</Label>
              <div className="flex flex-wrap gap-2">
                {channels.map((channel) => {
                  const Icon = channel.icon
                  const isSelected = selectedChannels.includes(channel.id)
                  return (
                    <button
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-colors ${
                        isSelected
                          ? "border-[#E69F50] bg-[#E69F50]/10 text-[#0D3133]"
                          : "border-border bg-background text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {channel.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <Label className="text-xs">Message *</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message... Markdown supported."
                className="min-h-[120px] text-sm resize-none"
              />
            </div>

            {/* Attachments */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                <Paperclip className="h-3.5 w-3.5" />
                Attach Files
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                Insert Variable
              </Button>
            </div>

            {/* Schedule Option */}
            <div className="flex items-center gap-2">
              <Checkbox id="schedule" />
              <Label htmlFor="schedule" className="text-xs text-muted-foreground">
                Schedule for later delivery
              </Label>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div className="rounded-lg border bg-muted/30 p-4 min-h-[200px]">
              <h4 className="font-medium text-[#0D3133]">{subject || "No subject"}</h4>
              <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                {message || "No message content"}
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Schedule
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Button>
            <Button
              size="sm"
              className="h-8 gap-1.5 bg-[#0D3133] hover:bg-[#0D3133]/90"
              onClick={onSend}
            >
              <Send className="h-3.5 w-3.5" />
              Send Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
