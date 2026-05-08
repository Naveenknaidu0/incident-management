"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, ThumbsUp, Layers, ChevronRight } from "lucide-react"

interface SuggestedResolutionCardProps {
  articleId: string
  title: string
  confidence: number
  estimatedTime: string
  successRate: number
  affectedServices: string[]
  onApply?: () => void
}

export function SuggestedResolutionCard({
  articleId,
  title,
  confidence,
  estimatedTime,
  successRate,
  affectedServices,
  onApply,
}: SuggestedResolutionCardProps) {
  const getConfidenceColor = () => {
    if (confidence >= 90) return "bg-green-50 text-green-700 border-green-200"
    if (confidence >= 75) return "bg-amber-50 text-amber-700 border-amber-200"
    return "bg-slate-100 text-slate-700 border-slate-200"
  }

  return (
    <Card className="overflow-hidden transition-all hover:border-[#E69F50]/50 hover:shadow-sm">
      <div className={`h-1 ${confidence >= 90 ? "bg-green-500" : confidence >= 75 ? "bg-amber-500" : "bg-slate-400"}`} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0D3133]/5">
            <FileText className="h-5 w-5 text-[#0D3133]" />
          </div>
          <Badge variant="outline" className={getConfidenceColor()}>
            {confidence}% confidence
          </Badge>
        </div>

        <Link href={`/knowledge/articles/${articleId}`}>
          <h4 className="mt-3 line-clamp-2 text-sm font-semibold text-[#0D3133] hover:underline">
            {title}
          </h4>
        </Link>

        <p className="mt-1 text-xs text-muted-foreground">
          Article ID: {articleId}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>Est. {estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-green-600">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{successRate}% success</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Layers className="h-3.5 w-3.5" />
            <span>Affected Services:</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {affectedServices.slice(0, 3).map((service) => (
              <Badge key={service} variant="secondary" className="text-[10px]">
                {service}
              </Badge>
            ))}
            {affectedServices.length > 3 && (
              <Badge variant="secondary" className="text-[10px]">
                +{affectedServices.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
            asChild
          >
            <Link href={`/knowledge/articles/${articleId}`}>
              View Article
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 gap-1 bg-[#0D3133] text-xs hover:bg-[#0D3133]/90"
            onClick={onApply}
          >
            Apply Resolution
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
