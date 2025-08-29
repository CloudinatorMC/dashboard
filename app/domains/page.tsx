import DashboardLayout from "@/components/dashboard-layout"
import { DomainsPage } from "@/components/pages/domains"
import { WorkOSProvider } from "@/components/identity/workos-provider";

export default async function Page() {
  return (
    <WorkOSProvider>
      <DashboardLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Domains" }]}>
        <DomainsPage/>
      </DashboardLayout>
    </WorkOSProvider>
  )
}
