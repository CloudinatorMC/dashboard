"use client"

import { RoutesPage } from "@/components/routes"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function RoutesPageRoute() {
  return (
    <DashboardLayout currentPage="routes">
      <RoutesPage />
    </DashboardLayout>
  )
}
