"use server";

import { refreshSession } from "@workos-inc/authkit-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { workos } from "@/components/identity/workos-provider";

interface SessionError {
  rawData: {
    authkit_redirect_url?: string;
  };
  error: string;
}

//custom backend switch has to accept some organizationId
export const switchToOrganization = async ({
  organizationId,
  pathname,
}: {
  organizationId: string;
  pathname: string;
}) => {
  try {
    await refreshSession({ organizationId, ensureSignedIn: true });
  } catch (errr) {
    const err = errr as SessionError;
    if (err.rawData.authkit_redirect_url) {
      redirect(err.rawData.authkit_redirect_url);
    } else {
      const args = {
        organizationId,
        clientId: process.env.WORKOS_CLIENT_ID!,
        provider: "authkit",
        redirectUri: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI!,
      };

      if (err.error === "sso_required" || err.error === "mfa_enrollment") {
        const url = workos.userManagement.getAuthorizationUrl({
          ...args,
        });
        redirect(url);
      }
      throw err;
    }
  }

  /**
   * Ensures the widget auth token is refreshed based on the updated
   * organization id.
   */
  revalidatePath(pathname);
  redirect(pathname);
};