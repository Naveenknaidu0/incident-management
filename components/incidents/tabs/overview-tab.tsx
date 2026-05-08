"use client"

import { Server, Tag, AlertCircle, CheckCircle2, FileText, Link2, Users } from "lucide-react"

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Incident Summary */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-card-foreground">Incident Summary</h3>
        </div>
        <div className="p-4">
          <div className="prose prose-sm max-w-none text-card-foreground">
            <p className="mb-3">
              Multiple customers reporting failed transactions across EU and APAC regions. Error rate spiked to 
              <strong> 34%</strong> starting at <strong>14:32 UTC</strong>. Initial investigation points to database 
              connection pool exhaustion in the payment processing cluster.
            </p>
            <p className="text-muted-foreground">
              Affected payment methods include credit cards, debit cards, and digital wallets. 
              Estimated revenue impact: <strong>$45,000/hour</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Service Impact */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Server className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-card-foreground">Service Impact</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { service: "Payment API", level: "Outage", users: "10,500+", color: "bg-red-500" },
            { service: "Checkout Service", level: "Degraded", users: "8,200+", color: "bg-amber-500" },
            { service: "Order Processing", level: "Degraded", users: "3,100+", color: "bg-amber-500" },
            { service: "Merchant Dashboard", level: "Operational", users: "450", color: "bg-green-500" },
          ].map((item) => (
            <div key={item.service} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${item.color}`} />
                <span className="text-sm text-card-foreground">{item.service}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">{item.level}</span>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item.users}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Root Cause */}
        <section className="rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Root Cause</h3>
          </div>
          <div className="p-4">
            <textarea
              defaultValue="Database connection pool exhaustion in prod-db-cluster. Max connections (500) reached due to a memory leak in payment-service v2.4.1 deployed at 14:15 UTC."
              className="min-h-[100px] w-full resize-none rounded-md border border-border bg-background p-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-[#E69F50] focus:outline-none focus:ring-1 focus:ring-[#E69F50]"
            />
            <p className="mt-2 text-xs text-muted-foreground">Last updated by Sarah Chen, 10 min ago</p>
          </div>
        </section>

        {/* Resolution Information */}
        <section className="rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-card-foreground">Resolution Information</h3>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Workaround</label>
              <p className="mt-1 text-sm text-card-foreground">
                Increased connection pool limit to 750 and restarted affected pods.
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Permanent Fix</label>
              <p className="mt-1 text-sm text-card-foreground">
                Hotfix deployed (payment-service v2.4.2) with connection pooling fix.
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Closure Notes</label>
              <p className="mt-1 text-sm text-muted-foreground italic">Pending resolution confirmation</p>
            </div>
          </div>
        </section>
      </div>

      {/* Configuration Items */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Link2 className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-card-foreground">Configuration Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">CI Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Environment</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: "prod-payment-01", type: "Server", env: "Production", status: "Impacted" },
                { name: "prod-db-cluster", type: "Database", env: "Production", status: "Impacted" },
                { name: "payment-gateway", type: "Application", env: "Production", status: "Recovered" },
                { name: "checkout-api", type: "Service", env: "Production", status: "Degraded" },
              ].map((ci) => (
                <tr key={ci.name} className="hover:bg-muted/20">
                  <td className="px-4 py-2 text-sm font-medium text-card-foreground">{ci.name}</td>
                  <td className="px-4 py-2 text-sm text-muted-foreground">{ci.type}</td>
                  <td className="px-4 py-2 text-sm text-muted-foreground">{ci.env}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex rounded px-1.5 py-0.5 text-xs font-medium ${
                      ci.status === "Impacted" ? "bg-red-100 text-red-700" :
                      ci.status === "Degraded" ? "bg-amber-100 text-amber-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {ci.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tags & Classification */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-card-foreground">Tags & Classification</h3>
        </div>
        <div className="p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <p className="mt-1 text-sm text-card-foreground">Payment Processing</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Subcategory</label>
              <p className="mt-1 text-sm text-card-foreground">Transaction Failures</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Impact</label>
              <p className="mt-1 text-sm text-card-foreground">High - Revenue Affecting</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Urgency</label>
              <p className="mt-1 text-sm text-card-foreground">Critical</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["payment", "database", "production", "customer-facing", "revenue-impact", "P1"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-card-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
