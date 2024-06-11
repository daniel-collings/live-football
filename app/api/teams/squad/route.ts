import { footballApi } from "@/app/api/api";
import { NextRequest, NextResponse } from "next/server";
import { redisInstance } from "@/app/api/redisUtils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const cacheKey = `team-squad-${id}`;

  const cachedData = await redisInstance.get(cacheKey);

  if (cachedData) {
    return NextResponse.json(cachedData, { status: 200 });
  }

  const count = await redisInstance.incr("daily-api-limit");

  if (count > 100) {
    return NextResponse.json(null, {
      status: 302,
      statusText: "Request limit has been reached.",
    });
  }

  const options = {
    params: { team: id },
  };

  const { data } = await footballApi.get("/v3/players/squad", options);

  const { team, players } = data.response[0];

  await redisInstance.set(cacheKey, JSON.stringify({ team, players }), {
    ex: 262800,
  });

  return NextResponse.json({ team, players }, { status: 200 });
}
