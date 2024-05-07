"use client"

import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import Image from "next/image";
import {stringToSlug} from "@/utils/urlSlugger";
import Link from "next/link";

const data: CountryLeagues = {
    "England": [
        {
            leagueName: "Premier League",
            leagueId: 1,
            leagueImage: "/league-logos/prem-league.jpg",
        },
        {
            leagueName: "Championship",
            leagueId: 1,
            leagueImage: "/league-logos/efl-championship.jpg",
        },
        {
            leagueName: "League One",
            leagueId: 1,
            leagueImage: "/league-logos/ligue-1-logo.png",
        },
        {
            leagueName: "League Two",
            leagueId: 1,
            leagueImage: "/league-logos/ligue-1-logo.png",
        },
        {
            leagueName: "National League",
            leagueId: 1,
            leagueImage: "/league-logos/ligue-1-logo.png",
        },
    ],
    "Germany": [
        {
            leagueName: "Bundesliga",
            leagueId: 1,
            leagueImage: "/league-logos/bundesliga-logo.jpg",
        },
        {
            leagueName: "2. Bundesliga",
            leagueId: 1,
            leagueImage: "/league-logos/ligue-1-logo.png",
        }
    ],
    "France": [
        {
            leagueName: "Ligue 1",
            leagueId: 1,
            leagueImage: "/league-logos/ligue-1-logo.png",
        },
        {
            leagueName: "Ligue 2",
            leagueId: 1,
            leagueImage: "/league-logos/mls-logo.jpg",
        }
    ],
    "Spain": [
        {
            leagueName: "La Liga",
            leagueId: 1,
            leagueImage: "/league-logos/la-liga-logo.jpg",
        },
        {
            leagueName: "La Liga 2",
            leagueId: 1,
            leagueImage: "/league-logos/mls-logo.jpg",
        }
    ],
    "Italy": [
        {
            leagueName: "Serie A",
            leagueId: 1,
            leagueImage: "/league-logos/Serie-A.png",
        },
        {
            leagueName: "Serie B",
            leagueId: 1,
            leagueImage: "/league-logos/mls-logo.jpg",
        }
    ],
    "Scotland": [
        {
            leagueName: "Scottish Premier League",
            leagueId: 1,
            leagueImage: "/league-logos/mls-logo.jpg",
        },
        {
            leagueName: "Scottish Championship",
            leagueId: 1,
            leagueImage: "/league-logos/mls-logo.jpg",
        },
        {
            leagueName: "Scottish League 1",
            leagueId: 1,
            leagueImage: "/league-logos/mls-logo.jpg",
        },
        {
            leagueName: "Scottish League 2",
            leagueId: 1,
            leagueImage: "/league-logos/mls-logo.jpg",
        }
    ],
    "United States": [
        {
            leagueName: "Major League Soccer",
            leagueId: 1,
            leagueImage: "/league-logos/mls-logo.jpg",
        }
    ],
}

interface League {
    leagueName: string;
    leagueId: number;
    leagueImage: string;
}

interface CountryLeagues {
    [country: string]: League[];
}

export default function Page(){
        return(
        <div className="">
            <ConstraintLayoutTemplate>
                <div className="space-y-8">
                    {Object.keys(data).map((country: string, i:number) => (
                        <div key={i}>
                            <p className="font-bold text-lg">{country}</p>

                            <div className="carousel carousel-end md:gap-x-4 p-4 bg-base-300 space-x-4 rounded-box">
                                {data[country].map((league: League, index: number) => (
                                    <div className="carousel-item" key={index}>
                                        <Link href={`/leagues/${stringToSlug(league.leagueName)}-${league.leagueId}`}>
                                        <Image src={league.leagueImage}
                                               width={300}
                                               height={300}
                                               className="rounded-box max-h-56 max-w-auto" alt=""/>
                                        </Link>
                                    </div>
                                ))}

                            </div>
                        </div>

                    ))}

                </div>

                {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-8">*/}
                {/*    {_leagues.response.map((o: ILeagueProps, i: number) => (*/}
                {/*        <LeagueCard key={i} league={o.league} country={o.country}/>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </ConstraintLayoutTemplate>

        </div>
        )
}

