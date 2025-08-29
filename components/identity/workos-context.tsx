"use client"

import { UserInfo } from "@workos-inc/authkit-nextjs"
import { OrganizationMembership } from "@workos-inc/node";
import React, { createContext, useContext } from "react"

export interface WorkOSContext {
  token: string;
  userInfo: UserInfo
  organisations: OrganizationMembership[]
}

const WorkOSContext = createContext<WorkOSContext | null>(null)

export function WorkOSContextProvider({
  value,
  children,
}: {
  value: WorkOSContext
  children: React.ReactNode
}) {
  return (
    <WorkOSContext.Provider value={value}>
      {children}
    </WorkOSContext.Provider>
  )
}

export function useWorkOSToken() {
  return useContext(WorkOSContext)?.token
}

export function useWorkOSUser() {
  return useContext(WorkOSContext)?.userInfo
}

export function useWorkOSOrganizations() {
  return useContext(WorkOSContext)?.organisations
}