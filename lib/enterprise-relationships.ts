// Enterprise relationship components for cross-module visibility
// These are reusable UI components that create linked records and relationship intelligence

export interface RelationshipRecord {
  id: string
  type: 'incident' | 'problem' | 'change' | 'asset' | 'request' | 'service' | 'ci' | 'knowledge'
  number: string
  title: string
  status: string
  severity?: 'critical' | 'high' | 'medium' | 'low'
  relationship: string // Root Cause, Related, Mitigation, Impact, etc.
  href?: string
}

export interface RelationshipWidget {
  type: string
  title: string
  count: number
  icon: React.ElementType
  color: string // For badges
  records: RelationshipRecord[]
  createAction?: {
    label: string
    href: string
  }
  linkAction?: {
    label: string
    handler: () => void
  }
}

// Color coding by module
export const MODULE_COLORS = {
  incident: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  problem: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  change: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  asset: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  request: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  service: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  ci: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
  knowledge: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
}

// Quick action types for incidents
export const INCIDENT_QUICK_ACTIONS = [
  { id: 'create-problem', label: 'Create Problem', icon: 'Wrench' },
  { id: 'link-problem', label: 'Link Problem', icon: 'Link2' },
  { id: 'create-change', label: 'Create Change', icon: 'GitBranch' },
  { id: 'link-change', label: 'Link Change', icon: 'Link2' },
  { id: 'add-asset', label: 'Add Affected Asset', icon: 'HardDrive' },
  { id: 'link-request', label: 'Link Service Request', icon: 'FileText' },
  { id: 'open-ci', label: 'Open CI', icon: 'Database' },
  { id: 'view-dependencies', label: 'View Dependency Map', icon: 'GitBranch' },
]

// Quick action types for problems
export const PROBLEM_QUICK_ACTIONS = [
  { id: 'link-incident', label: 'Link Incident', icon: 'AlertCircle' },
  { id: 'create-fix', label: 'Create Permanent Fix', icon: 'Wrench' },
  { id: 'add-known-error', label: 'Add Known Error', icon: 'Bug' },
  { id: 'view-rca', label: 'View RCA', icon: 'FileText' },
  { id: 'view-impact', label: 'View Impact Analysis', icon: 'Layers' },
]

// Quick action types for changes
export const CHANGE_QUICK_ACTIONS = [
  { id: 'link-incident', label: 'Link Incident', icon: 'AlertCircle' },
  { id: 'link-problem', label: 'Link Problem', icon: 'Wrench' },
  { id: 'add-service', label: 'Add Service', icon: 'Server' },
  { id: 'assess-risk', label: 'Assess Risk', icon: 'AlertTriangle' },
  { id: 'schedule-cab', label: 'Schedule CAB', icon: 'Calendar' },
]

// Demo relationship data
export const DEMO_RELATIONSHIPS = {
  // Incident INC0042789 relationships
  'INC0042789': {
    problems: [
      {
        id: '1',
        type: 'problem',
        number: 'PRB0001847',
        title: 'Payment Service Database Connection Pool Exhaustion',
        status: 'RCA In Progress',
        relationship: 'Root Cause',
        href: '/operations/problems/PRB0001847',
      },
    ],
    changes: [
      {
        id: '1',
        type: 'change',
        number: 'CHG0045231',
        title: 'Database Migration to v14.2',
        status: 'Implementing',
        severity: 'high',
        relationship: 'Resolution',
        href: '/operations/changes/CHG0045231',
      },
    ],
    assets: [
      {
        id: '1',
        type: 'asset',
        number: 'AST-0001234',
        title: 'prod-db-cluster-01',
        status: 'Active',
        relationship: 'Impacted',
        href: '/assets/inventory/AST-0001234',
      },
      {
        id: '2',
        type: 'asset',
        number: 'AST-0001235',
        title: 'payment-api-server-02',
        status: 'Active',
        relationship: 'Impacted',
        href: '/assets/inventory/AST-0001235',
      },
    ],
    services: [
      {
        id: '1',
        type: 'service',
        number: 'SVC-0042',
        title: 'Payment Processing Gateway',
        status: 'Degraded',
        severity: 'high',
        relationship: 'Primary Service',
        href: '/assets/services/SVC-0042',
      },
    ],
    requests: [
      {
        id: '1',
        type: 'request',
        number: 'REQ0089234',
        title: 'Emergency Database Capacity Increase',
        status: 'In Progress',
        relationship: 'Fulfillment',
        href: '/operations/requests/REQ0089234',
      },
    ],
    knowledge: [
      {
        id: '1',
        type: 'knowledge',
        number: 'KB0012345',
        title: 'Troubleshooting Payment Service Timeouts',
        status: 'Published',
        relationship: 'Reference Guide',
        href: '/knowledge/KB0012345',
      },
    ],
  },
  // Problem PRB0001847 relationships
  'PRB0001847': {
    incidents: [
      {
        id: '1',
        type: 'incident',
        number: 'INC0042789',
        title: 'Payment Processing Timeout',
        status: 'In Progress',
        severity: 'critical',
        relationship: 'Active Incident',
        href: '/operations/incidents/INC0042789',
      },
      {
        id: '2',
        type: 'incident',
        number: 'INC0042756',
        title: 'Database Connection Issues',
        status: 'Resolved',
        severity: 'high',
        relationship: 'Related',
        href: '/operations/incidents/INC0042756',
      },
    ],
    changes: [
      {
        id: '1',
        type: 'change',
        number: 'CHG0045231',
        title: 'Database Migration to v14.2',
        status: 'Implementing',
        severity: 'high',
        relationship: 'Permanent Fix',
        href: '/operations/changes/CHG0045231',
      },
    ],
    services: [
      {
        id: '1',
        type: 'service',
        number: 'SVC-0042',
        title: 'Payment Processing Gateway',
        status: 'Degraded',
        severity: 'high',
        relationship: 'Impacted Service',
        href: '/assets/services/SVC-0042',
      },
    ],
  },
  // Change CHG0045231 relationships
  'CHG0045231': {
    incidents: [
      {
        id: '1',
        type: 'incident',
        number: 'INC0042789',
        title: 'Payment Processing Timeout',
        status: 'In Progress',
        severity: 'critical',
        relationship: 'Related Incident',
        href: '/operations/incidents/INC0042789',
      },
    ],
    problems: [
      {
        id: '1',
        type: 'problem',
        number: 'PRB0001847',
        title: 'Payment Service Database Connection Pool Exhaustion',
        status: 'RCA In Progress',
        relationship: 'Addresses',
        href: '/operations/problems/PRB0001847',
      },
    ],
    services: [
      {
        id: '1',
        type: 'service',
        number: 'SVC-0042',
        title: 'Payment Processing Gateway',
        status: 'Degraded',
        relationship: 'Impacted Service',
        href: '/assets/services/SVC-0042',
      },
    ],
  },
}

export function getRelationships(recordType: string, recordId: string) {
  return DEMO_RELATIONSHIPS[recordId as keyof typeof DEMO_RELATIONSHIPS] || {}
}
