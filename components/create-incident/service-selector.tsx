"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Search, Server, Globe, Database, Cloud, Shield, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Service {
  id: string
  name: string
  category: string
  status: "operational" | "degraded" | "outage"
  criticality: "high" | "medium" | "low"
  icon: React.ElementType
}

const services: Service[] = [
  { id: "svc-001", name: "Payment Gateway", category: "Business Services", status: "operational", criticality: "high", icon: Globe },
  { id: "svc-002", name: "Core Database", category: "Infrastructure", status: "degraded", criticality: "high", icon: Database },
  { id: "svc-003", name: "User Authentication", category: "Security", status: "operational", criticality: "high", icon: Shield },
  { id: "svc-004", name: "Order Management", category: "Business Services", status: "operational", criticality: "high", icon: Server },
  { id: "svc-005", name: "Email Service", category: "Communication", status: "operational", criticality: "medium", icon: Globe },
  { id: "svc-006", name: "Cloud Storage", category: "Infrastructure", status: "operational", criticality: "medium", icon: Cloud },
  { id: "svc-007", name: "API Gateway", category: "Infrastructure", status: "operational", criticality: "high", icon: Server },
  { id: "svc-008", name: "Analytics Platform", category: "Business Services", status: "operational", criticality: "low", icon: Globe },
  { id: "svc-009", name: "CDN", category: "Infrastructure", status: "operational", criticality: "medium", icon: Cloud },
  { id: "svc-010", name: "Search Service", category: "Business Services", status: "outage", criticality: "medium", icon: Server },
]

interface ServiceSelectorProps {
  selectedServices: string[]
  onSelectionChange: (services: string[]) => void
  maxSelections?: number
}

export function ServiceSelector({ selectedServices, onSelectionChange, maxSelections = 5 }: ServiceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const groupedServices = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = []
    acc[service.category].push(service)
    return acc
  }, {} as Record<string, Service[]>)

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onSelectionChange(selectedServices.filter(id => id !== serviceId))
    } else if (selectedServices.length < maxSelections) {
      onSelectionChange([...selectedServices, serviceId])
    }
  }

  const statusColors = {
    operational: "bg-green-500",
    degraded: "bg-amber-500",
    outage: "bg-red-500",
  }

  const criticalityBadges = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium text-muted-foreground">
          Affected Services ({selectedServices.length}/{maxSelections})
        </Label>
        {selectedServices.length > 0 && (
          <button
            onClick={() => onSelectionChange([])}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Selected Services */}
      {selectedServices.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedServices.map(id => {
            const service = services.find(s => s.id === id)
            if (!service) return null
            return (
              <Badge
                key={id}
                variant="secondary"
                className="gap-1 pr-1"
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", statusColors[service.status])} />
                {service.name}
                <button
                  onClick={() => toggleService(id)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted"
                >
                  <span className="sr-only">Remove</span>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Badge>
            )
          })}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-8 pl-8 text-sm"
        />
      </div>

      {/* Service List */}
      <ScrollArea className="h-[200px] rounded-lg border border-border">
        <div className="p-2 space-y-3">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category}>
              <p className="mb-1.5 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {category}
              </p>
              <div className="space-y-0.5">
                {categoryServices.map(service => {
                  const isSelected = selectedServices.includes(service.id)
                  const Icon = service.icon
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      disabled={!isSelected && selectedServices.length >= maxSelections}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        isSelected
                          ? "bg-[#0D3133]/10 text-[#0D3133]"
                          : "hover:bg-muted",
                        !isSelected && selectedServices.length >= maxSelections && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1 truncate">{service.name}</span>
                      <span className={cn("h-2 w-2 rounded-full", statusColors[service.status])} />
                      <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", criticalityBadges[service.criticality])}>
                        {service.criticality}
                      </Badge>
                      {isSelected && (
                        <CheckCircle2 className="h-4 w-4 text-[#E69F50]" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export { services }
