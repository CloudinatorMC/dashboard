import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import type { User } from '@workos-inc/node';


export function UserAvatar({user}: {user: User | null}) {
  if (!user) {
    return null;
  }

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = (!user.firstName || !user.lastName) ? "UN" : `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={user.profilePictureUrl || ""} alt={fullName} />
      <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
    </Avatar>
  )
}