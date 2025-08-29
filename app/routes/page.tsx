import DashboardLayout from "@/components/dashboard-layout"
import { RoutesPage } from "@/components/pages/routes"

export default function Page() {
  return (
    <DashboardLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Routes" }]}>
      <RoutesPage/>
    </DashboardLayout>
  )
}
