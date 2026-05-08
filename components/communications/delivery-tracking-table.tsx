"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DeliveryStatusBadge } from "./delivery-status-badge"
import { ChannelBadge } from "./channel-badge"
import { MessagePriorityBadge } from "./message-priority-badge"
import { RotateCw, Eye, MoreHorizontal, ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface DeliveryRecord {
  id: string
  subject: string
  recipient: string
  channel: "email" | "slack" | "teams" | "sms" | "push" | "webhook" | "status-page"
  status: "queued" | "sending" | "delivered" | "failed" | "read" | "acknowledged"
  priority: "informational" | "warning" | "critical" | "executive-critical"
  sentAt: string
  deliveredAt?: string
  incidentId?: string
}

interface DeliveryTrackingTableProps {
  records: DeliveryRecord[]
}

export function DeliveryTrackingTable({ records }: DeliveryTrackingTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? records.map((r) => r.id) : [])
  }

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/30">
            <th className="w-10 px-4 py-3">
              <Checkbox
                checked={selectedIds.length === records.length && records.length > 0}
                onCheckedChange={toggleAll}
              />
            </th>
            <th className="px-3 py-3 text-left font-medium text-muted-foreground">
              <div className="flex items-center gap-1">
                Subject
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="px-3 py-3 text-left font-medium text-muted-foreground">Recipient</th>
            <th className="px-3 py-3 text-left font-medium text-muted-foreground">Channel</th>
            <th className="px-3 py-3 text-left font-medium text-muted-foreground">Priority</th>
            <th className="px-3 py-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="px-3 py-3 text-left font-medium text-muted-foreground">Sent</th>
            <th className="px-3 py-3 text-left font-medium text-muted-foreground">Delivered</th>
            <th className="w-10 px-3 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr
              key={record.id}
              className="group border-b hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3">
                <Checkbox
                  checked={selectedIds.includes(record.id)}
                  onCheckedChange={(checked) => toggleRow(record.id, checked as boolean)}
                />
              </td>
              <td className="px-3 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-[#0D3133] truncate max-w-[200px]">
                    {record.subject}
                  </span>
                  {record.incidentId && (
                    <Link
                      href={`/incidents/${record.incidentId}`}
                      className="text-xs text-[#E69F50] hover:underline"
                    >
                      {record.incidentId}
                    </Link>
                  )}
                </div>
              </td>
              <td className="px-3 py-3 text-muted-foreground">{record.recipient}</td>
              <td className="px-3 py-3">
                <ChannelBadge channel={record.channel} />
              </td>
              <td className="px-3 py-3">
                <MessagePriorityBadge priority={record.priority} />
              </td>
              <td className="px-3 py-3">
                <DeliveryStatusBadge status={record.status} />
              </td>
              <td className="px-3 py-3 text-muted-foreground text-xs">{record.sentAt}</td>
              <td className="px-3 py-3 text-muted-foreground text-xs">
                {record.deliveredAt || "-"}
              </td>
              <td className="px-3 py-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </DropdownMenuItem>
                    {record.status === "failed" && (
                      <DropdownMenuItem className="gap-2">
                        <RotateCw className="h-3.5 w-3.5" />
                        Retry Delivery
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
