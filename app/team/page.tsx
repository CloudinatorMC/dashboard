"use client"

import { TeamsPage } from "@/components/teams"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function TeamPageRoute() {
  return (
    <DashboardLayout currentPage="team">
      <TeamsPage />
    </DashboardLayout>
  )
}
