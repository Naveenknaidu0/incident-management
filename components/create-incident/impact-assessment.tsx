"use client"

import { cn } from "@/lib/utils"
import { Users, Globe, DollarSign, Eye, AlertTriangle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ImpactAssessmentProps {
  impactedUsers: string
  impactedRegions: string[]
  revenueImpact: string
  executiveVisibility: boolean
  outageScope: string
  onImpactedUsersChange: (value: string) => void
  onImpactedRegionsChange: (regions: string[]) => void
  onRevenueImpactChange: (value: string) => void
  onExecutiveVisibilityChange: (value: boolean) => void
  onOutageScopeChange: (value: string) => void
}

const regions = [
  { value: "na-east", label: "NA East" },
  { value: "na-west", label: "NA West" },
  { value: "eu-west", label: "EU West" },
  { value: "eu-central", label: "EU Central" },
  { value: "apac-south", label: "APAC South" },
  { value: "apac-north", label: "APAC North" },
]

const revenueImpactOptions = [
  { value: "none", label: "No Revenue Impact", icon: "bg-green-500" },
  { value: "low", label: "Low (<$10K/hr)", icon: "bg-yellow-500" },
  { value: "medium", label: "Medium ($10K-$100K/hr)", icon: "bg-orange-500" },
  { value: "high", label: "High (>$100K/hr)", icon: "bg-red-500" },
]

const outageScopeOptions = [
  { value: "none", label: "No Outage" },
  { value: "partial", label: "Partial Outage" },
  { value: "full", label: "Full Outage" },
  { value: "degraded", label: "Degraded Performance" },
]

export function ImpactAssessment({
  impactedUsers,
  impactedRegions,
  revenueImpact,
  executiveVisibility,
  outageScope,
  onImpactedUsersChange,
  onImpactedRegionsChange,
  onRevenueImpactChange,
  onExecutiveVisibilityChange,
  onOutageScopeChange,
}: ImpactAssessmentProps) {
  const toggleRegion = (region: string) => {
    if (impactedRegions.includes(region)) {
      onImpactedRegionsChange(impactedRegions.filter(r => r !== region))
    } else {
      onImpactedRegionsChange([...impactedRegions, region])
    }
  }

  // Calculate impact level indicator
  const getImpactLevel = () => {
    let score = 0
    if (parseInt(impactedUsers) > 1000) score += 2
    else if (parseInt(impactedUsers) > 100) score += 1
    if (impactedRegions.length > 3) score += 2
    else if (impactedRegions.length > 1) score += 1
    if (revenueImpact === "high") score += 2
    else if (revenueImpact === "medium") score += 1
    if (outageScope === "full") score += 2
    else if (outageScope === "partial") score += 1

    if (score >= 5) return { level: "Critical", color: "bg-red-500", text: "text-red-700" }
    if (score >= 3) return { level: "High", color: "bg-orange-500", text: "text-orange-700" }
    if (score >= 1) return { level: "Medium", color: "bg-yellow-500", text: "text-yellow-700" }
    return { level: "Low", color: "bg-green-500", text: "text-green-700" }
  }

  const impactLevel = getImpactLevel()

  return (
    <div className="space-y-4">
      {/* Impact Level Indicator */}
      <div className={cn(
        "flex items-center justify-between rounded-lg border p-3",
        impactLevel.level === "Critical" && "border-red-200 bg-red-50",
        impactLevel.level === "High" && "border-orange-200 bg-orange-50",
        impactLevel.level === "Medium" && "border-yellow-200 bg-yellow-50",
        impactLevel.level === "Low" && "border-green-200 bg-green-50"
      )}>
        <div className="flex items-center gap-2">
          <AlertTriangle className={cn("h-4 w-4", impactLevel.text)} />
          <span className="text-sm font-medium">Calculated Impact Level</span>
        </div>
        <Badge className={cn(impactLevel.color, "text-white")}>
          {impactLevel.level}
        </Badge>
      </div>

      {/* Impacted Users */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          Impacted Users (Estimated)
        </Label>
        <Input
          type="number"
          placeholder="0"
          value={impactedUsers}
          onChange={(e) => onImpactedUsersChange(e.target.value)}
          className="h-9"
        />
      </div>

      {/* Impacted Regions */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Globe className="h-3.5 w-3.5" />
          Impacted Regions
        </Label>
        <div className="flex flex-wrap gap-1.5">
          {regions.map((region) => {
            const isSelected = impactedRegions.includes(region.value)
            return (
              <button
                key={region.value}
                type="button"
                onClick={() => toggleRegion(region.value)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                  isSelected
                    ? "border-[#0D3133] bg-[#0D3133] text-white"
                    : "border-border hover:border-[#0D3133]/50"
                )}
              >
                {region.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Revenue Impact */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <DollarSign className="h-3.5 w-3.5" />
          Revenue Impact
        </Label>
        <Select value={revenueImpact} onValueChange={onRevenueImpactChange}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select revenue impact" />
          </SelectTrigger>
          <SelectContent>
            {revenueImpactOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", opt.icon)} />
                  {opt.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Outage Scope */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <AlertTriangle className="h-3.5 w-3.5" />
          Outage Scope
        </Label>
        <Select value={outageScope} onValueChange={onOutageScopeChange}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select outage scope" />
          </SelectTrigger>
          <SelectContent>
            {outageScopeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Executive Visibility */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
        <Checkbox
          id="executive-visibility"
          checked={executiveVisibility}
          onCheckedChange={(checked) => onExecutiveVisibilityChange(checked as boolean)}
          className="mt-0.5"
        />
        <div>
          <Label
            htmlFor="executive-visibility"
            className="flex cursor-pointer items-center gap-1.5 text-sm font-medium"
          >
            <Eye className="h-4 w-4 text-amber-600" />
            Executive Visibility
          </Label>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Flag this incident for executive dashboard and stakeholder notifications
          </p>
        </div>
      </div>
    </div>
  )
}
