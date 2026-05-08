"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Server,
  Database,
  Globe,
  Cloud,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface GraphNode {
  id: string
  name: string
  type: "service" | "application" | "database" | "api" | "infrastructure" | "cloud"
  status: "operational" | "degraded" | "outage"
  x: number
  y: number
}

interface GraphEdge {
  source: string
  target: string
  type: "depends-on" | "hosted-on" | "connected-to"
}

interface DependencyGraphProps {
  nodes: GraphNode[]
  edges: GraphEdge[]
  selectedNodeId?: string
  onNodeSelect?: (nodeId: string) => void
  className?: string
}

const nodeTypeIcons = {
  service: Globe,
  application: Globe,
  database: Database,
  api: Server,
  infrastructure: Server,
  cloud: Cloud,
}

const statusColors = {
  operational: "bg-green-500",
  degraded: "bg-amber-500",
  outage: "bg-red-500",
}

const statusBorders = {
  operational: "border-green-200",
  degraded: "border-amber-200",
  outage: "border-red-300 shadow-red-100 shadow-lg",
}

export function DependencyGraph({ 
  nodes, 
  edges, 
  selectedNodeId,
  onNodeSelect,
  className 
}: DependencyGraphProps) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5))
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }, [pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    }
  }, [isDragging, dragStart])

  const handleMouseUp = () => setIsDragging(false)

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 py-3">
        <CardTitle className="text-sm font-semibold">Service Dependency Graph</CardTitle>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="w-12 text-center text-xs text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleReset}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          className="relative h-[400px] cursor-grab overflow-hidden bg-muted/10 active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* SVG for edges */}
          <svg 
            className="absolute inset-0 h-full w-full pointer-events-none"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#73847B"
                />
              </marker>
            </defs>
            {edges.map((edge, idx) => {
              const sourceNode = nodes.find((n) => n.id === edge.source)
              const targetNode = nodes.find((n) => n.id === edge.target)
              if (!sourceNode || !targetNode) return null
              
              return (
                <line
                  key={idx}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="#73847B"
                  strokeWidth={1.5}
                  strokeDasharray={edge.type === "connected-to" ? "4,4" : "0"}
                  markerEnd="url(#arrowhead)"
                  opacity={0.6}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            {nodes.map((node) => {
              const Icon = nodeTypeIcons[node.type]
              const isSelected = selectedNodeId === node.id
              
              return (
                <TooltipProvider key={node.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          "absolute flex flex-col items-center gap-1 rounded-lg border-2 bg-card p-3 shadow-sm transition-all hover:shadow-md",
                          statusBorders[node.status],
                          isSelected && "ring-2 ring-[#E69F50] ring-offset-2"
                        )}
                        style={{
                          left: node.x - 40,
                          top: node.y - 30,
                        }}
                        onClick={() => onNodeSelect?.(node.id)}
                      >
                        <div className="relative">
                          <Icon className="h-5 w-5 text-[#0D3133]" />
                          <span 
                            className={cn(
                              "absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white",
                              statusColors[node.status],
                              node.status === "outage" && "animate-pulse"
                            )}
                          />
                        </div>
                        <span className="max-w-[80px] truncate text-xs font-medium text-[#0D3133]">
                          {node.name}
                        </span>
                        {node.status === "outage" && (
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-medium">{node.name}</p>
                        <p className="text-xs capitalize text-muted-foreground">{node.type}</p>
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-xs capitalize",
                            node.status === "operational" && "bg-green-100 text-green-700",
                            node.status === "degraded" && "bg-amber-100 text-amber-700",
                            node.status === "outage" && "bg-red-100 text-red-700"
                          )}
                        >
                          {node.status}
                        </Badge>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex items-center gap-4 rounded-lg border bg-card/90 px-3 py-2 text-xs backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span>Operational</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Degraded</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>Outage</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
