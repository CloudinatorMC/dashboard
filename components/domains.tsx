"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Globe, CheckCircle, Clock, AlertCircle, Plus } from "lucide-react"
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api"

export function DomainsPage() {
  const [newDomain, setNewDomain] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const domains = useQuery(api.domains.get) || []

  const handleClaimDomain = async () => {
    if (!newDomain.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setNewDomain("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Domain Ownership</h2>
        <p className="text-muted-foreground">Claim and verify domain ownership for your Minecraft proxy</p>
      </div>

      {/* Claim New Domain */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Claim New Domain
          </CardTitle>
          <CardDescription>
            Add a new domain to your proxy configuration. You&lsquo;ll need to verify ownership through DNS records.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="domain">Domain Name</Label>
            <Input
              id="domain"
              placeholder="survival.yourdomain.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <Alert>
            <Globe className="h-4 w-4" />
            <AlertDescription>
              After claiming, you&lsquo;ll receive DNS records to add to your domain&lsquo;s DNS configuration for verification.
            </AlertDescription>
          </Alert>

          <Button onClick={handleClaimDomain} disabled={!newDomain.trim() || isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Claiming Domain...
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 mr-2" />
                Claim Domain
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Domains */}
      <Card>
        <CardHeader>
          <CardTitle>Your Domains</CardTitle>
          <CardDescription>Manage your claimed domains and their verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {domains.map((domain) => (
              <div key={domain.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{domain.name}</p>
                    <p className="text-sm text-muted-foreground">Claimed on {domain.claimedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(domain.status)}
                  <Button variant="outline" size="sm">
                    {domain.status === "failed" ? "Retry" : "Manage"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Verification</CardTitle>
          <CardDescription>How to verify domain ownership</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <p className="font-medium">Add DNS Record</p>
                <p className="text-sm text-muted-foreground">
                  Add the provided TXT record to your domain&lsquo;s DNS settings
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <p className="font-medium">Wait for Propagation</p>
                <p className="text-sm text-muted-foreground">
                  DNS changes can take up to 24 hours to propagate globally
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <p className="font-medium">Automatic Verification</p>
                <p className="text-sm text-muted-foreground">
                  Our system will automatically verify your domain once the record is detected
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
