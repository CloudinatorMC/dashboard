import { ReactNode } from "react"
import { WorkOS } from "@workos-inc/node"
import { withAuth } from "@workos-inc/authkit-nextjs"
import { WorkOSContextProvider } from "./workos-context"

export const workos = new WorkOS(process.env.WORKOS_API_KEY!)

export type WidgetScope = 'widgets:users-table:manage' | 'widgets:sso:manage' | 'widgets:domain-verification:manage';

interface WorkOSTokenProviderProps {
  children: ReactNode;
  scopes?: [WidgetScope];
}

export async function WorkOSProvider({ children, scopes }: WorkOSTokenProviderProps) {
  const info = await withAuth({
    ensureSignedIn: true,
  })

  if (!info.organizationId) {
    return <p>User does not belong to an organization</p>
  }

  const authToken = await workos.widgets.getToken({
    userId: info.user.id,
    organizationId: info.organizationId,
    scopes
  })

  const organisations = (await workos.userManagement.listOrganizationMemberships({
    userId: info.user.id,
  })).data;

  const context = {
    token: authToken,
    userInfo: info,
    organisations
  }

  // Pass the token down via context or props
  return (
    <WorkOSContextProvider value={context}>
      {children}
    </WorkOSContextProvider>
  )
}
