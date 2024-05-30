import {footballApi} from "@/app/api/api";
import {NextRequest, NextResponse} from "next/server";
import {redisInstance} from "@/app/api/redisUtils";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const cacheKey = `team-info-${id}`

    const cachedData = await redisInstance.get(cacheKey);

    if (cachedData) {
        return NextResponse.json(cachedData, {status: 200});
    }

    const count = await redisInstance.incr("daily-api-limit");

    if(count > 100){
        return NextResponse.json(null, {status: 302, statusText: "Request limit has been reached."});
    }

    const options = {
        params: {id: id},
    };

    const { data } = await footballApi.get("/v3/teams", options);

    const { team, venue } = data.response[0]

    // Store the data in the Redis cache with an expiration of 1 year
    await redisInstance.set(cacheKey, JSON.stringify({ team, venue }), {ex: 31536000});

    return NextResponse.json({team, venue}, { status: 200 });

}