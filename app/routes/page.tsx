import DashboardLayout from "@/components/dashboard-layout"
import { RoutesPage } from "@/components/pages/routes"
import { WorkOSProvider } from "@/components/identity/workos-provider";

export default function Page() {
  return (
    <WorkOSProvider>
      <DashboardLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Routes" }]}>
        <RoutesPage/>
      </DashboardLayout>
    </WorkOSProvider>
  )
}
