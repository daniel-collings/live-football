"use client";

import React, { useState, useEffect } from "react";
import _liveScores from "@/data/live-scores.json";
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import Link from "next/link";

export interface IMatchData {
  fixture: {
    id: number;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: number;
      second: number | null;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: number;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };
  goals: {
    home: number;
    away: number;
  };
  score: {
    halftime: {
      home: number;
      away: number;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
  events: any[];
}

export interface ILiveScoreProps {
  matches: IMatchData[];
}

export default function LiveScoresPage() {
  const { response } = _liveScores;

  return (
    <ConstraintLayoutTemplate>
      {/*// @ts-ignore*/}
      <LiveScores matches={response} />
    </ConstraintLayoutTemplate>
  );
}

const LiveScores: React.FC<ILiveScoreProps> = ({ matches }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleLeagues, setVisibleLeagues] = useState<string[]>([]);
  const [leagueOffset, setLeagueOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        setLeagueOffset((prevOffset) => prevOffset + 4);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setVisibleLeagues((prevLeagues) => [
      ...prevLeagues,
      ...Object.keys(groupedMatches).slice(leagueOffset, leagueOffset + 5),
    ]);
  }, [leagueOffset]);

  const groupedMatches = matches.reduce(
    (acc: { [key: string]: IMatchData[] }, match) => {
      const { league } = match;
      if (!acc[league.name]) {
        acc[league.name] = [];
      }
      acc[league.name].push(match);
      return acc;
    },
    {},
  );

  const filteredMatches = Object.entries(groupedMatches).filter(
    ([leagueName, leagueMatches]) => {
      const isLeagueMatch = leagueName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isTeamMatch = leagueMatches.some(
        (match) =>
          match.teams.home.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          match.teams.away.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
      return isLeagueMatch || isTeamMatch;
    },
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by league or team"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full my-4"
      />

      {filteredMatches
        .filter(([leagueName]) => visibleLeagues.includes(leagueName))
        .map(([leagueName, leagueMatches]) => (
          <div key={leagueName} className="mb-8">
            <div className="flex items-center mb-4">
              <Link
                href={`/international/teams/${leagueMatches[0].league.country}`}
              >
                <img
                  src={leagueMatches[0].league.flag}
                  alt=""
                  className="w-6 h-4 mr-2"
                />
              </Link>
              <Link
                href={`/leagues/${leagueName}-${leagueMatches[0].league.id}`}
              >
                <h2 className="text-xl font-bold text-primary">{leagueName}</h2>
              </Link>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-1 md:gap-4">
              {leagueMatches.map((match) => (
                <div
                  key={match.fixture.id}
                  className="card bg-base-100 shadow-md p-2"
                >
                  <div className={"w-full flex justify-center"}>
                    <div className="badge badge-outline w-12">
                      {match.fixture.status.elapsed}&apos;
                    </div>
                  </div>

                  <div className="p-2 flex flex-col justify-between">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center space-x-2">
                        <Link href={`/teams/aston-villa-66`}>
                          <img
                            src={match.teams.home.logo}
                            alt=""
                            className="w-8 h-8 md:hidden lg:block"
                          />
                        </Link>
                        <div className="hidden md:block w-44 truncate">
                          <Link href={`/`}>{match.teams.home.name}</Link>
                        </div>
                      </div>

                      <div className="grow text-center items-center mx-4">
                        <Link href={`/matches/live/${match.fixture.id}`}>
                          <div className="text-lg font-bold">
                            {match.goals.home} - {match.goals.away}
                          </div>
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2 justify-end">
                        <div className="hidden md:block w-44 truncate text-right">
                          {" "}
                          <Link href={`/`}>{match.teams.away.name}</Link>
                        </div>
                        <Link href={`/`}>
                          <img
                            src={match.teams.away.logo}
                            alt=""
                            className="w-8 h-8 md:hidden lg:block"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
