import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { NextRequest, NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function hashIp(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return `ip_${Math.abs(hash).toString(36)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { loadoutId, vote } = body;

    if (!loadoutId || !vote || !["up", "down"].includes(vote)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const ip =
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    const voterIp = hashIp(ip);

    const result = await convex.mutation(api.votes.cast, {
      loadoutId: loadoutId as Id<"loadouts">,
      voterIp,
      vote: vote as "up" | "down",
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
