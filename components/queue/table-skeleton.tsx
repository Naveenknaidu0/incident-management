"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface TableSkeletonProps {
  rows?: number
  density?: "compact" | "comfortable"
}

export function TableSkeleton({ rows = 10, density = "compact" }: TableSkeletonProps) {
  const rowPadding = density === "compact" ? "py-2" : "py-3"

  return (
    <div className="w-full">
      {/* Header Skeleton */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center gap-4 px-4 py-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Row Skeletons */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 border-b border-border px-4 ${rowPadding}`}
        >
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-12 rounded" />
            <Skeleton className="h-5 w-12 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function FilterToolbarSkeleton() {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-card px-6 py-3">
      <Skeleton className="h-8 w-80" />
      <Skeleton className="h-6 w-px" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-28" />
      </div>
      <div className="ml-auto flex gap-2">
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}

export function SummaryStripSkeleton() {
  return (
    <div className="border-b border-border bg-muted/30 px-6 py-3">
      <div className="grid grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
            <Skeleton className="h-4 w-4" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function QueueHeaderSkeleton() {
  return (
    <div className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="mt-1 h-4 w-48" />
          </div>
          <Skeleton className="h-7 w-32 rounded-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    </div>
  )
}
