"use client"

import React, {useState} from "react";
import {ILiveScoreProps, IMatchData} from "@/app/(matches)/live/page";
import Link from "next/link";

interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
    matches: IMatchData[]
}

export default function Page({params, searchParams, matches}: PageProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const groupedMatches = matches.reduce((acc: { [key: string]: IMatchData[] }, match) => {
        const { league } = match;
        if (!acc[league.name]) {
            acc[league.name] = [];
        }
        acc[league.name].push(match);
        return acc;
    }, {});

    const filteredMatches = Object.entries(groupedMatches)
        .filter(([leagueName, leagueMatches]) => {
            const isLeagueMatch = leagueName.toLowerCase().includes(searchTerm.toLowerCase());
            const isTeamMatch = leagueMatches.some(
                (match) =>
                    match.teams.home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    match.teams.away.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return isLeagueMatch || isTeamMatch;
        })
        .slice(0, 5);

    return (
        <div>

            <div className="space-y-4">
                {filteredMatches.map(([leagueName, leagueMatches]) => (
                    <div key={leagueName}>
                        <div className="flex items-center mb-2">
                            <Link href={`/international/teams/${leagueMatches[0].league.country}`}>
                                <img src={leagueMatches[0].league.flag} alt="" className="w-6 h-4 mr-2" />
                            </Link>
                            <Link href={`/leagues/${leagueName}-${leagueMatches[0].league.id}`}>
                                <h2 className="text-md font-bold text-primary">{leagueName}</h2>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                            {leagueMatches.map((match) => (
                                <div key={match.fixture.id} className="card bg-base-100 p-2 border-l-base-300 border-[1px] rounded-md">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex items-center space-x-2 w-1/3 md:min-w-44">
                                            <Link href={`/teams/aston-villa-66`}>
                                                <img src={match.teams.home.logo} alt=""
                                                     className="w-6 h-6"/>
                                            </Link>
                                            <div className="truncate text-sm">{match.teams.home.name}</div>
                                        </div>
                                        <Link href={`/matches/live/${match.fixture.id}`} className="w-1/3">
                                            <div className="grow text-center items-center  mx-4">
                                                {match.goals.home} - {match.goals.away}<small className="animate-pulse opacity-5">{' '}<sup>({match.fixture.status.elapsed})</sup></small>
                                            </div>
                                        </Link>
                                        <div className="flex items-center space-x-2 w-1/3 md:min-w-44 justify-end">
                                            <div className="truncate text-sm">{match.teams.away.name}</div>
                                            <Link href={`/`}>
                                                <img src={match.teams.away.logo} alt="" className="w-6 h-6" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center">
                <Link href="/matches/live" className="text-primary font-bold">
                    View All Live Matches
                </Link>
            </div>
        </div>
    );
};
