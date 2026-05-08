"use client"

import { Siren, Users, MessageSquare, Clock, AlertTriangle } from "lucide-react"
import { StatusBadge } from "@/components/ui/status-badge"

interface MajorIncident {
  id: string
  title: string
  severity: "critical" | "high"
  affectedServices: string[]
  startTime: string
  duration: string
  commander: string
  commStatus: "sent" | "pending" | "drafting"
}

const activeMajorIncident: MajorIncident = {
  id: "MAJOR-0089",
  title: "Payment Gateway Outage - Multiple Regions Affected",
  severity: "critical",
  affectedServices: ["Payment API", "Checkout Service", "Order Processing"],
  startTime: "14:32 UTC",
  duration: "01:28:45",
  commander: "Sarah Chen",
  commStatus: "sent",
}

export function MajorIncidentPanel() {
  return (
    <div className="rounded-lg border-2 border-red-200 bg-red-50/30 p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
          <Siren className="h-4 w-4 text-red-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-red-900">Active Major Incident</h3>
            <StatusBadge status="critical" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 font-mono text-xs font-bold text-red-700">
          <Clock className="h-3 w-3" />
          {activeMajorIncident.duration}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <a
            href={`/major-incidents/${activeMajorIncident.id}`}
            className="font-medium text-red-900 hover:text-red-700 hover:underline"
          >
            {activeMajorIncident.id}: {activeMajorIncident.title}
          </a>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {activeMajorIncident.affectedServices.map((service) => (
            <span
              key={service}
              className="rounded border border-red-200 bg-white px-2 py-0.5 text-xs font-medium text-red-800"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-red-200 pt-3 text-xs">
          <div className="flex items-center gap-1.5 text-red-800">
            <Users className="h-3.5 w-3.5" />
            <span className="font-medium">Commander:</span>
            <span>{activeMajorIncident.commander}</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-800">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="font-medium">Comms:</span>
            <span className="rounded bg-green-100 px-1.5 py-0.5 text-green-700">Sent</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-800">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-medium">Started:</span>
            <span>{activeMajorIncident.startTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
