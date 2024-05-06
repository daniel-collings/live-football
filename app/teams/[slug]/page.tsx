import React from 'react';
import Image from 'next/image';
import _teamInformation from "@/data/team-info/aston-villa.json"
import _teamStats from "@/data/team-info/aston-villa-stats.json"
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import {stringToSlug} from "@/utils/urlSlugger";
import Link from "next/link";

interface TeamData {
    get: string;
    parameters: {
        id: string;
    };
    errors: any[];
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: {
        team: {
            id: number;
            name: string;
            code: string;
            country: string;
            founded: number;
            national: boolean;
            logo: string;
        };
        venue: {
            id: number;
            name: string;
            address: string;
            city: string;
            capacity: number;
            surface: string;
            image: string;
        };
    }[];
}

const TeamInfo: React.FC<{ teamData: TeamData }> = ({ teamData }) => {
    const { response } = _teamInformation;
    const { team, venue } = response[0];

    return (
        <ConstraintLayoutTemplate>
            <div className="flex flex-wrap gap-4">

            <div className="shadow p-8 w-full md:w-fit justify-center lg:justify-between rounded-md items-center flex">
                <div className="flex flex-col flex-wrap space-y-4">
                    <div className="w-full md:w-auto flex flex-wrap items-center gap-4 justify-evenly">
                        <Image
                            className="aspect-auto h-auto w-auto"
                            src={team.logo}
                            width={200}
                            height={200}
                            alt="Background"
                        />
                        <div className="flex flex-col">
                            <h1>{team.name} ({team.code})</h1>
                            <Link href={`/competitions/domestic/league/${stringToSlug(team.name)}-${team.name}`}>
                                <p>Premier League</p></Link>
                            <p>Founded {team.founded}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="shadow p-8 w-full md:w-fit justify-center lg:justify-between rounded-md flex items-center">
                <div className="flex flex-col lg:flex-row flex-wrap items-center space-y-4 lg:gap-4">

                    <div className="w-full lg:w-fit flex flex-col flex-wrap items-center gap-4 xl:justify-evenly">
                        <div className="flex flex-col">
                            <p>Stadium: {venue.name}</p>
                            <p>Capacity: {venue.capacity}</p>
                            <p>Surface: {venue.surface}</p>
                            <address>{venue.address}, {venue.city}</address>
                        </div>
                    </div>
                        <Image
                            className="aspect-auto h-auto w-auto rounded-box"
                            src={venue.image}
                            width={200}
                            height={200}
                            alt="Background"
                        />

                </div>
            </div>
            </div>


            <TeamStatistics statistics={_teamStats.response} />

            </ConstraintLayoutTemplate>
    );
};

export default TeamInfo;

const TeamStatistics: React.FC<{ statistics: TeamStatistics }> = ({ statistics }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
                <Image src={statistics.team.logo} alt={statistics.team.name} width={80} height={80} className="mr-4" />
                <div>
                    <h2 className="text-2xl font-bold">{statistics.team.name}</h2>
                    <p className="text-gray-500">{statistics.league.name} - {statistics.league.season}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-bold mb-2">Fixtures</h3>
                    <p><strong>Played:</strong> {statistics.fixtures.played.total}</p>
                    <p><strong>Wins:</strong> {statistics.fixtures.wins.total}</p>
                    <p><strong>Draws:</strong> {statistics.fixtures.draws.total}</p>
                    <p><strong>Loses:</strong> {statistics.fixtures.loses.total}</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Goals</h3>
                    <p><strong>For:</strong> {statistics.goals.for.total.total}</p>
                    <p><strong>Against:</strong> {statistics.goals.against.total.total}</p>
                    <p><strong>Clean Sheets:</strong> {statistics.clean_sheet.total}</p>
                    <p><strong>Failed to Score:</strong> {statistics.failed_to_score.total}</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Biggest</h3>
                    <p><strong>Wins (Home):</strong> {statistics.biggest.wins.home}</p>
                    <p><strong>Wins (Away):</strong> {statistics.biggest.wins.away}</p>
                    <p><strong>Loses (Home):</strong> {statistics.biggest.loses.home}</p>
                    <p><strong>Loses (Away):</strong> {statistics.biggest.loses.away}</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Lineups</h3>
                    {statistics.lineups.map((lineup, index) => (
                        <p key={index}>{lineup.formation} ({lineup.played} played)</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface TeamStatistics {
    league: {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
    };
    team: {
        id: number;
        name: string;
        logo: string;
    };
    form: string;
    fixtures: {
        played: {
            home: number;
            away: number;
            total: number;
        };
        wins: {
            home: number;
            away: number;
            total: number;
        };
        draws: {
            home: number;
            away: number;
            total: number;
        };
        loses: {
            home: number;
            away: number;
            total: number;
        };
    };
    goals: {
        for: {
            total: {
                home: number;
                away: number;
                total: number;
            };
            average: {
                home: string;
                away: string;
                total: string;
            };
            minute: {
                '0-15': {
                    total: number;
                    percentage: string;
                };
                '16-30': {
                    total: number;
                    percentage: string;
                };
                '31-45': {
                    total: number;
                    percentage: string;
                };
                '46-60': {
                    total: number;
                    percentage: string;
                };
                '61-75': {
                    total: number;
                    percentage: string;
                };
                '76-90': {
                    total: number;
                    percentage: string;
                };
                '91-105': {
                    total: number;
                    percentage: string;
                };
                '106-120': {
                    total: null;
                    percentage: null;
                };
            };
        };
        against: {
            total: {
                home: number;
                away: number;
                total: number;
            };
            average: {
                home: string;
                away: string;
                total: string;
            };
            minute: {
                '0-15': {
                    total: number;
                    percentage: string;
                };
                '16-30': {
                    total: number;
                    percentage: string;
                };
                '31-45': {
                    total: number;
                    percentage: string;
                };
                '46-60': {
                    total: number;
                    percentage: string;
                };
                '61-75': {
                    total: number;
                    percentage: string;
                };
                '76-90': {
                    total: number;
                    percentage: string;
                };
                '91-105': {
                    total: number;
                    percentage: string;
                };
                '106-120': {
                    total: null;
                    percentage: null;
                };
            };
        };
    };
    biggest: {
        streak: {
            wins: number;
            draws: number;
            loses: number;
        };
        wins: {
            home: string;
            away: string;
        };
        loses: {
            home: string;
            away: string;
        };
        goals: {
            for: {
                home: number;
                away: number;
            };
            against: {
                home: number;
                away: number;
            };
        };
    };
    clean_sheet: {
        home: number;
        away: number;
        total: number;
    };
    failed_to_score: {
        home: number;
        away: number;
        total: number;
    };
    penalty: {
        scored: {
            total: number;
            percentage: string;
        };
        missed: {
            total: number;
            percentage: string;
        };
        total: number;
    };
    lineups: {
        formation: string;
        played: number;
    }[];
    cards: {
        yellow: {
            '0-15': {
                total: number;
                percentage: string;
            };
            '16-30': {
                total: number;
                percentage: string;
            };
            '31-45': {
                total: number;
                percentage: string;
            };
            '46-60': {
                total: number;
                percentage: string;
            };
            '61-75': {
                total: number;
                percentage: string;
            };
            '76-90': {
                total: number;
                percentage: string;
            };
            '91-105': {
                total: number;
                percentage: string;
            };
            '106-120': {
                total: null;
                percentage: null;
            };
        };
        red: {
            '0-15': {
                total: null;
                percentage: null;
            };
            '16-30': {
                total: null;
                percentage: null;
            };
            '31-45': {
                total: null;
                percentage: null;
            };
            '46-60': {
                total: null;
                percentage: null;
            };
            '61-75': {
                total: number;
                percentage: string;
            };
            '76-90': {
                total: null;
                percentage: null;
            };
            '91-105': {
                total: number;
                percentage: string;
            };
            '106-120': {
                total: null;
                percentage: null;
            };
        };
    };
}