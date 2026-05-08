"use client"

import { cn } from "@/lib/utils"
import { 
  Wifi, Mail, Shield, Database, Cloud, Server, 
  AlertTriangle, Zap, FileText 
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface IncidentTemplate {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: string
  subcategory: string
  priority: string
  impact: string
  urgency: string
  service: string
  tags: string[]
  titleTemplate: string
  descriptionTemplate: string
}

export const incidentTemplates: IncidentTemplate[] = [
  {
    id: "tpl-001",
    name: "Network Outage",
    description: "Complete or partial network connectivity failure",
    icon: Wifi,
    category: "Infrastructure",
    subcategory: "Network",
    priority: "critical",
    impact: "1",
    urgency: "1",
    service: "svc-007",
    tags: ["network", "outage", "infrastructure"],
    titleTemplate: "Network Outage - [Location/Segment]",
    descriptionTemplate: "## Issue Summary\nNetwork connectivity failure detected.\n\n## Affected Area\n- Location: \n- Network Segment: \n\n## Symptoms\n- \n\n## Business Impact\n- ",
  },
  {
    id: "tpl-002",
    name: "Email Service Issue",
    description: "Email delivery or access problems",
    icon: Mail,
    category: "Communication",
    subcategory: "Email",
    priority: "high",
    impact: "2",
    urgency: "2",
    service: "svc-005",
    tags: ["email", "communication"],
    titleTemplate: "Email Service Issue - [Description]",
    descriptionTemplate: "## Issue Summary\nEmail service experiencing issues.\n\n## Symptoms\n- Unable to send/receive emails\n- Delays in delivery\n\n## Affected Users\n- Department: \n- User Count: \n\n## Error Messages\n- ",
  },
  {
    id: "tpl-003",
    name: "VPN Connection Failure",
    description: "VPN connectivity or authentication issues",
    icon: Shield,
    category: "Security",
    subcategory: "VPN",
    priority: "high",
    impact: "2",
    urgency: "1",
    service: "svc-003",
    tags: ["vpn", "connectivity", "remote-access"],
    titleTemplate: "VPN Connection Failure - [Region/Pool]",
    descriptionTemplate: "## Issue Summary\nVPN connectivity failure reported.\n\n## VPN Details\n- VPN Pool: \n- Region: \n\n## Symptoms\n- Connection timeout\n- Authentication failure\n\n## Affected Users\n- Estimated Count: ",
  },
  {
    id: "tpl-004",
    name: "Database Performance",
    description: "Database latency or performance degradation",
    icon: Database,
    category: "Infrastructure",
    subcategory: "Database",
    priority: "critical",
    impact: "1",
    urgency: "2",
    service: "svc-002",
    tags: ["database", "performance", "latency"],
    titleTemplate: "Database Performance Degradation - [Cluster Name]",
    descriptionTemplate: "## Issue Summary\nDatabase performance degradation detected.\n\n## Database Details\n- Cluster: \n- Instance: \n\n## Metrics\n- Response Time: \n- CPU Usage: \n- Connection Count: \n\n## Impact\n- Affected Applications: ",
  },
  {
    id: "tpl-005",
    name: "Cloud Service Degradation",
    description: "Cloud provider service issues",
    icon: Cloud,
    category: "Infrastructure",
    subcategory: "Cloud",
    priority: "high",
    impact: "2",
    urgency: "2",
    service: "svc-006",
    tags: ["cloud", "aws", "azure", "gcp"],
    titleTemplate: "Cloud Service Degradation - [Provider] [Service]",
    descriptionTemplate: "## Issue Summary\nCloud service degradation detected.\n\n## Provider Details\n- Provider: AWS/Azure/GCP\n- Service: \n- Region: \n\n## Status Page\n- Provider Status: \n\n## Impact\n- Affected Services: ",
  },
  {
    id: "tpl-006",
    name: "Application Error",
    description: "Application crash or error condition",
    icon: AlertTriangle,
    category: "Application",
    subcategory: "Error",
    priority: "high",
    impact: "3",
    urgency: "2",
    service: "svc-004",
    tags: ["application", "error", "crash"],
    titleTemplate: "Application Error - [App Name] - [Error Type]",
    descriptionTemplate: "## Issue Summary\nApplication error reported.\n\n## Application\n- Name: \n- Version: \n- Environment: \n\n## Error Details\n- Error Type: \n- Error Message: \n\n## Steps to Reproduce\n1. \n2. \n3. ",
  },
  {
    id: "tpl-007",
    name: "API Failure",
    description: "API endpoint failures or timeouts",
    icon: Server,
    category: "Infrastructure",
    subcategory: "API",
    priority: "critical",
    impact: "2",
    urgency: "1",
    service: "svc-007",
    tags: ["api", "integration", "timeout"],
    titleTemplate: "API Failure - [Endpoint/Service]",
    descriptionTemplate: "## Issue Summary\nAPI endpoint failure detected.\n\n## API Details\n- Endpoint: \n- Method: GET/POST/PUT/DELETE\n- Response Code: \n\n## Error Response\n```\n\n```\n\n## Impact\n- Dependent Services: ",
  },
  {
    id: "tpl-008",
    name: "Payment Processing",
    description: "Payment gateway or transaction issues",
    icon: Zap,
    category: "Business Services",
    subcategory: "Payment",
    priority: "critical",
    impact: "1",
    urgency: "1",
    service: "svc-001",
    tags: ["payment", "transaction", "revenue"],
    titleTemplate: "Payment Processing Issue - [Gateway/Type]",
    descriptionTemplate: "## Issue Summary\nPayment processing failure detected.\n\n## Payment Details\n- Gateway: \n- Transaction Type: \n- Error Code: \n\n## Business Impact\n- Failed Transactions: \n- Revenue Impact: \n\n## Customer Reports\n- ",
  },
]

interface IncidentTemplatesProps {
  selectedTemplate: string | null
  onSelectTemplate: (template: IncidentTemplate) => void
}

export function IncidentTemplates({ selectedTemplate, onSelectTemplate }: IncidentTemplatesProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Quick Templates</span>
      </div>
      <ScrollArea className="h-auto">
        <div className="grid grid-cols-2 gap-2 pb-2 sm:grid-cols-4">
          {incidentTemplates.map((template) => {
            const Icon = template.icon
            const isSelected = selectedTemplate === template.id
            
            return (
              <Card
                key={template.id}
                className={cn(
                  "cursor-pointer border transition-all hover:border-[#E69F50]",
                  isSelected && "border-[#E69F50] bg-[#E69F50]/5"
                )}
                onClick={() => onSelectTemplate(template)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      isSelected ? "bg-[#E69F50] text-white" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{template.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {template.category}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
