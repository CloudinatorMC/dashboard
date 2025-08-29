import DashboardLayout from "@/components/dashboard-layout"
import { DomainsPage } from "@/components/pages/domains"

export default function Page() {
  return (
    <DashboardLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Domains" }]}>
      <DomainsPage/>
    </DashboardLayout>
  )
}
