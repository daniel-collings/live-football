import {footballApi} from "@/app/api/api";
import {NextRequest, NextResponse} from "next/server";
import {redisInstance} from "@/app/api/redisUtils";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const fixtureId = searchParams.get('id');

    const cacheKey = `result-statistics-${fixtureId}`

    const cachedData = await redisInstance.get(cacheKey);

    if (cachedData) {
        return NextResponse.json(cachedData, {status: 200});
    }

    const count = await redisInstance.incr("daily-api-limit")

    if(count > 100){
        return NextResponse.json(null, {status: 302, statusText: "Request limit has been reached."});
    }


    const options = {
        params: {
            fixture: fixtureId,
        },
    };

    const lengthOfCache = 7884000

    const data = await footballApi.get("/v3/fixtures/statistics", options)
        .then(res => res.data.response);


    // Store the data in the Redis cache with an expiration of 1 day
    await redisInstance.set(cacheKey, JSON.stringify({ data }), {ex: lengthOfCache});

    return NextResponse.json({data }, { status: 200 });

}