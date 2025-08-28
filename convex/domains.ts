import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return [
      { name: "survival.example.com", status: "verified", claimedAt: "2024-01-15" },
      { name: "play.minecraft-server.net", status: "pending", claimedAt: "2024-01-20" },
      { name: "lobby.gameworld.io", status: "verified", claimedAt: "2024-01-18" },
      { name: "pvp.battlecraft.com", status: "failed", claimedAt: "2024-01-22" },
    ]
  },
});