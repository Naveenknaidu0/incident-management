"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScheduleSlot {
  date: string
  dayOfWeek: string
  dayNum: number
  isToday: boolean
  primary: { name: string; initials: string } | null
  secondary: { name: string; initials: string } | null
  hasOverride: boolean
}

interface ScheduleCalendarProps {
  slots: ScheduleSlot[]
  onSlotClick?: (date: string) => void
}

export function ScheduleCalendar({ slots, onSlotClick }: ScheduleCalendarProps) {
  const [view, setView] = useState<"week" | "month">("week")

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-[#0D3133]">On-Call Schedule</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-7 rounded-r-none", view === "week" && "bg-muted")}
                onClick={() => setView("week")}
              >
                Week
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-7 rounded-l-none", view === "month" && "bg-muted")}
                onClick={() => setView("month")}
              >
                Month
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-2">Jan 15 - 21, 2024</span>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {slots.map((slot) => (
            <div
              key={slot.date}
              className={cn(
                "p-2 rounded-lg border transition-colors cursor-pointer hover:border-[#E69F50]",
                slot.isToday ? "border-[#E69F50] bg-[#E69F50]/5" : "border-border"
              )}
              onClick={() => onSlotClick?.(slot.date)}
            >
              <div className="text-center mb-2">
                <p className="text-xs text-muted-foreground">{slot.dayOfWeek}</p>
                <p className={cn(
                  "text-lg font-semibold",
                  slot.isToday ? "text-[#E69F50]" : "text-[#0D3133]"
                )}>
                  {slot.dayNum}
                </p>
              </div>
              {slot.primary && (
                <div className="flex items-center gap-1.5 mb-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="bg-[#0D3133] text-white text-[8px]">
                      {slot.primary.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs truncate">{slot.primary.name}</span>
                </div>
              )}
              {slot.secondary && (
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="bg-[#73847B] text-white text-[8px]">
                      {slot.secondary.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground truncate">{slot.secondary.name}</span>
                </div>
              )}
              {slot.hasOverride && (
                <Badge variant="outline" className="text-[10px] mt-1 w-full justify-center">
                  Override
                </Badge>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#0D3133]" />
            Primary
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#73847B]" />
            Secondary
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded border border-[#E69F50] bg-[#E69F50]/20" />
            Today
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
