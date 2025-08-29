"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Route, Server, Plus, Edit, Trash2 } from "lucide-react"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api"

export function RoutesPage() {
  const routes = useQuery(api.routes.get) || [];

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingRoute, setEditingRoute] = useState<number | null>(null)
  const [newRoute, setNewRoute] = useState({
    subdomain: "",
    domain: "",
    target: "",
    useHaproxy: false,
  })

  const domains = ["example.com", "minecraft-server.net", "gameworld.io"]

  const handleAddRoute = () => {
    if (!newRoute.subdomain || !newRoute.domain || !newRoute.target) return

    const route = {
      id: routes.length + 1,
      ...newRoute,
      status: "active",
    }

    setNewRoute({ subdomain: "", domain: "", target: "", useHaproxy: false })
    setShowAddForm(false)
  }

  const handleEditRoute = (id: number) => {
    const route = routes.find((r) => r.id === id)
    if (route) {
      setNewRoute({
        subdomain: route.subdomain,
        domain: route.domain,
        target: route.target,
        useHaproxy: route.useHaproxy,
      })
      setEditingRoute(id)
      setShowAddForm(true)
    }
  }

  const handleUpdateRoute = () => {
    if (!newRoute.subdomain || !newRoute.domain || !newRoute.target || !editingRoute) return

    setNewRoute({ subdomain: "", domain: "", target: "", useHaproxy: false })
    setEditingRoute(null)
    setShowAddForm(false)
  }

  const cancelEdit = () => {
    setNewRoute({ subdomain: "", domain: "", target: "", useHaproxy: false })
    setEditingRoute(null)
    setShowAddForm(false)
  }

  const toggleRouteStatus = (id: number) => {

  }

  const deleteRoute = (id: number) => {
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Route Configuration</h2>
          <p className="text-muted-foreground">Configure proxy routes and HAProxy IP preservation settings</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Route
        </Button>
      </div>

      {/* Add/Edit Route Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingRoute ? "Edit Route" : "Add New Route"}</CardTitle>
            <CardDescription>
              {editingRoute
                ? "Update the proxy route configuration"
                : "Configure a new proxy route for your Minecraft server"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <Input
                  id="subdomain"
                  placeholder="lobby"
                  value={newRoute.subdomain}
                  onChange={(e) => setNewRoute({ ...newRoute, subdomain: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Select value={newRoute.domain} onValueChange={(value) => setNewRoute({ ...newRoute, domain: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target Server</Label>
              <Input
                id="target"
                placeholder="192.168.1.100:25565"
                value={newRoute.target}
                onChange={(e) => setNewRoute({ ...newRoute, target: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="haproxy"
                checked={newRoute.useHaproxy}
                onCheckedChange={(checked) => setNewRoute({ ...newRoute, useHaproxy: checked })}
              />
              <Label htmlFor="haproxy" className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                Use HAProxy for client IP preservation
              </Label>
            </div>

            {newRoute.useHaproxy && (
              <Alert>
                <Server className="h-4 w-4" />
                <AlertDescription>
                  HAProxy will preserve the original client IP addresses when forwarding connections to your Minecraft
                  server however, this requires a mod or plugin on your server to read the forwarded IPs.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button onClick={editingRoute ? handleUpdateRoute : handleAddRoute}>
                {editingRoute ? "Update Route" : "Add Route"}
              </Button>
              <Button variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Routes List */}
      <Card>
        <CardHeader>
          <CardTitle>Configured Routes</CardTitle>
          <CardDescription>Manage your existing proxy routes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route) => (
              <div key={route.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Route className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {route.subdomain}.{route.domain}
                      </p>
                      {route.useHaproxy && (
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          <Server className="w-3 h-3 mr-1" />
                          HAProxy
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">→ {route.target}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={route.status === "active" ? "default" : "destructive"}>{route.status}</Badge>
                  <Button variant="outline" size="sm" onClick={() => toggleRouteStatus(route.id)}>
                    {route.status === "active" ? "Disable" : "Enable"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditRoute(route.id)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteRoute(route.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
