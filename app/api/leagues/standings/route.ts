import { footballApi } from "@/app/api/api";
import { NextRequest, NextResponse } from "next/server";
import { redisInstance } from "@/app/api/redisUtils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const leagueId = searchParams.get("id");
  const seasonYear = 2023;

  const cacheKey = `league-${leagueId}-standings/${seasonYear}`;

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
    params: {
      league: leagueId,
      season: seasonYear,
    },
  };

  const lengthOfCache =
    seasonYear < new Date().getFullYear() - 1 ? 31536000 : 86400;

  const { data } = await footballApi.get("/v3/standings", options);

  const { league } = data.response[0];

  // Store the data in the Redis cache with an expiration of 1 day
  await redisInstance.set(cacheKey, JSON.stringify({ league }), {
    ex: lengthOfCache,
  });

  return NextResponse.json({ league }, { status: 200 });
}
