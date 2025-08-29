import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null || !identity.org_id) {
      return null;
    }

    return [
      {
        id: 1,
        subdomain: "lobby",
        domain: "example.com",
        target: "192.168.1.100:25565",
        useHaproxy: true,
        status: "active",
      },
      {
        id: 2,
        subdomain: "survival",
        domain: "example.com",
        target: "192.168.1.101:25565",
        useHaproxy: false,
        status: "active",
      },
      {
        id: 3,
        subdomain: "creative",
        domain: "minecraft-server.net",
        target: "192.168.1.102:25565",
        useHaproxy: true,
        status: "inactive",
      },
    ]
  },
});