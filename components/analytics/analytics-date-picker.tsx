"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { format } from "date-fns"

type DateRange = "today" | "7d" | "30d" | "quarter" | "custom"

interface AnalyticsDatePickerProps {
  onRangeChange?: (range: DateRange, dates?: { from: Date; to: Date }) => void
}

const presets: { label: string; value: DateRange }[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last Quarter", value: "quarter" },
  { label: "Custom Range", value: "custom" },
]

export function AnalyticsDatePicker({ onRangeChange }: AnalyticsDatePickerProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange>("30d")
  const [customDates, setCustomDates] = useState<{ from?: Date; to?: Date }>({})
  const [isOpen, setIsOpen] = useState(false)

  const handleRangeSelect = (range: DateRange) => {
    setSelectedRange(range)
    if (range !== "custom") {
      setIsOpen(false)
      onRangeChange?.(range)
    }
  }

  const getDisplayLabel = () => {
    if (selectedRange === "custom" && customDates.from && customDates.to) {
      return `${format(customDates.from, "MMM d")} - ${format(customDates.to, "MMM d, yyyy")}`
    }
    return presets.find(p => p.value === selectedRange)?.label || "Select range"
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <CalendarIcon className="h-3.5 w-3.5" />
          {getDisplayLabel()}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="flex">
          {/* Presets */}
          <div className="border-r border-border p-2 space-y-1">
            {presets.map((preset) => (
              <Button
                key={preset.value}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start text-xs",
                  selectedRange === preset.value && "bg-muted"
                )}
                onClick={() => handleRangeSelect(preset.value)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          
          {/* Calendar (for custom range) */}
          {selectedRange === "custom" && (
            <div className="p-2">
              <Calendar
                mode="range"
                selected={{ from: customDates.from, to: customDates.to }}
                onSelect={(range) => {
                  setCustomDates({ from: range?.from, to: range?.to })
                  if (range?.from && range?.to) {
                    onRangeChange?.("custom", { from: range.from, to: range.to })
                    setIsOpen(false)
                  }
                }}
                numberOfMonths={2}
              />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
