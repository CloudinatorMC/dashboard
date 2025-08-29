import DashboardLayout from "@/components/dashboard-layout"
import { TeamsPage } from "@/components/pages/teams"

export default function Page() {
  return (
    <DashboardLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}>
      <TeamsPage/>
    </DashboardLayout>
  )
}
