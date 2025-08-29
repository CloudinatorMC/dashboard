import DashboardLayout from "@/components/dashboard-layout"
import { TeamsPage } from "@/components/pages/teams"
import { WorkOSProvider } from "@/components/identity/workos-provider";

export default function Page() {
  return (
    <WorkOSProvider>
      <DashboardLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}>
        <TeamsPage/>
      </DashboardLayout>
    </WorkOSProvider>
  )
}
