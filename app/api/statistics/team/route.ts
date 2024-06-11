import { footballApi } from "@/app/api/api";
import { NextRequest, NextResponse } from "next/server";
import { redisInstance } from "@/app/api/redisUtils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const teamId = searchParams.get("id");
  const seasonYear = 2023;

  const cacheKey = `team-${teamId}-stats/${seasonYear}`;

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

  const leagueCacheId = `team-${teamId}-league-id/${seasonYear}`;
  let leagueId = await redisInstance.get(leagueCacheId);

  if (leagueId === null) {
    const count = await redisInstance.get<number>("daily-api-limit");

    // @ts-ignore
    if (count > 100) {
      return NextResponse.json(null, {
        status: 302,
        statusText: "Request limit has been reached.",
      });
    }

    const options = {
      params: {
        team: teamId,
        season: seasonYear,
      },
    };

    const { data } = await footballApi.get("/v3/leagues", options);

    // @ts-ignore
    leagueId = data.response.filter((f) => f.league.type === "League")[0].league
      .id;

    await redisInstance.set(leagueCacheId, leagueId);
  }

  const options = {
    params: {
      team: teamId,
      season: seasonYear,
      league: leagueId,
    },
  };

  const lengthOfCache =
    seasonYear < new Date().getFullYear() - 1 ? 31536000 : 86400;

  const { data } = await footballApi.get("/v3/teams/statistics", options);

  const {
    league,
    fixtures,
    lineups,
    goals,
    biggest,
    clean_sheet,
    cards,
    penalty,
  } = data.response;

  await redisInstance.set(
    cacheKey,
    JSON.stringify({
      league,
      fixtures,
      lineups,
      goals,
      biggest,
      clean_sheet,
      cards,
      penalty,
    }),
    { ex: lengthOfCache },
  );

  return NextResponse.json(
    { league, fixtures, lineups, goals, biggest, clean_sheet, cards, penalty },
    { status: 200 },
  );
}
