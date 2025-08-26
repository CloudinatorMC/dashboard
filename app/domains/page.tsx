"use client"

import { DomainsPage } from "@/components/domains"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DomainsPageRoute() {
  return (
    <DashboardLayout currentPage="domains">
      <DomainsPage />
    </DashboardLayout>
  )
}
