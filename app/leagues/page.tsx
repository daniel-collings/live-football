"use client"

import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import Image from "next/image";
import {stringToSlug} from "@/utils/urlSlugger";
import Link from "next/link";
import React, {useState} from "react";

const data: CountryLeagues = {
    "England": [
        {
            leagueName: "Premier League",
            leagueId: 39,
            leagueImage: "/league-logos/prem-league.jpg",
        },
        {
            leagueName: "Championship",
            leagueId: 40,
            leagueImage: "/league-logos/efl-championship.jpg",
        },
        {
            leagueName: "League One",
            leagueId: 41,
            leagueImage: "/league-logos/league1.jpg",
        },
        {
            leagueName: "League Two",
            leagueId: 42,
            leagueImage: "/league-logos/efl2.jpg",
        },
        {
            leagueName: "National League",
            leagueId: 43,
            leagueImage: "/league-logos/national-league.jpg",
        },
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
            leagueImage: "/league-logos/la-liga-2.jpg",
        }
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
            leagueImage: "/league-logos/bundesliga-2-logo.png",
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
            leagueImage: "/league-logos/ligue2.jpg",
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
            leagueImage: "/league-logos/serie-b.jpeg",
        }
    ],
    "Scotland": [
        {
            leagueName: "Scottish Premier League",
            leagueId: 1,
            leagueImage: "/league-logos/spl.jpg",
        },
        {
            leagueName: "Scottish Championship",
            leagueId: 1,
            leagueImage: "/league-logos/s-champ.png",
        },
        {
            leagueName: "Scottish League 1",
            leagueId: 1,
            leagueImage: "/league-logos/sl1.jpg",
        },
        {
            leagueName: "Scottish League 2",
            leagueId: 1,
            leagueImage: "/league-logos/sl2.png",
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
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = Object.entries(data).reduce((acc, [country, leagues]) => {
        const filteredLeagues = leagues.filter((league) =>
            league.leagueName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredLeagues.length > 0) {
            acc[country] = filteredLeagues;
        }
        return acc;
    }, {} as CountryLeagues);


    return(
        <div className="">
            <ConstraintLayoutTemplate>
                <div className="space-y-8">
                    <input
                        type="text"
                        placeholder="Search by league or country"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="input input-bordered w-full my-4"
                    />

                    {Object.keys(filteredData).map((country: string, i: number) => (
                        <div key={i}>
                            <p className="font-bold text-lg">{country}</p>

                            <div className="carousel carousel-end md:gap-x-4 p-4 bg-base-300 space-x-4 rounded-box">
                                {filteredData[country].map((league: League, index: number) => (

                                    <div className="carousel-item" key={index}>
                                        <Link href={`/leagues/${stringToSlug(league.leagueName)}`}>
                                            <div className="flex flex-col h-full space-y-4">
                                                <Image src={league.leagueImage}
                                                       width={200}
                                                       height={200}
                                                       className="bg-white rounded-box max-h-56 h-full w-auto" alt={league.leagueName}/>
<p>{league.leagueName}</p>
                                            </div>
                                                 </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                    ))}

                </div>

            </ConstraintLayoutTemplate>

        </div>
        )
}
