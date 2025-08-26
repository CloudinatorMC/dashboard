"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Route, Users, Server, Shield, Settings } from "lucide-react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage: "overview" | "domains" | "routes" | "team"
}

export function DashboardLayout({ children, currentPage }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Server className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">CloudinatorMC</h1>
                <p className="text-sm text-muted-foreground">Multi-tenant Minecraft Proxy Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                <Shield className="w-3 h-3 mr-1" />
                Tenant: minecraft-pro
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-4 text-sm font-medium ${
                currentPage === "overview"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Server className="w-4 h-4" />
              Overview
            </Link>
            <Link
              href="/domains"
              className={`flex items-center gap-2 px-3 py-4 text-sm font-medium ${
                currentPage === "domains"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe className="w-4 h-4" />
              Domains
            </Link>
            <Link
              href="/routes"
              className={`flex items-center gap-2 px-3 py-4 text-sm font-medium ${
                currentPage === "routes"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Route className="w-4 h-4" />
              Routes
            </Link>
            <Link
              href="/team"
              className={`flex items-center gap-2 px-3 py-4 text-sm font-medium ${
                currentPage === "team"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              Team
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
