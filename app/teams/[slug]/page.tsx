import React from 'react';
import _teamInformation from "@/data/team-info/aston-villa.json"
import _teamStats from "@/data/team-info/aston-villa-stats.json"
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import {notFound} from "next/navigation";
import TeamStatisticData from "@/app/teams/[slug]/TeamData";

interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({params, searchParams}: PageProps) {
    const { response } = _teamInformation;
    const { team, venue } = response[0];

    if(!params.slug.includes("aston-villa")){
        notFound()
    }

    return (
        <ConstraintLayoutTemplate>
            <div className="flex items-center mb-6">
                <img src={team.logo} alt={`${team.name} Logo`} className="w-20 h-20 mr-6"/>
                <div>
                    <h1 className="text-4xl font-bold text-primary">{team.name}</h1>
                    <p className="text-gray-600">{team.country}</p>
                    <small className="text-gray-600">Founded: {team.founded}</small>

                </div>
            </div>
            {/*<TeamInfo data={_teamInformation}/>*/}
            <TeamStatisticData data={_teamStats.response}/>
        </ConstraintLayoutTemplate>
    );
};


// const Statistics: React.FC<StatisticsProps> = ({ data }:any) => {
//     return (
//         <div className="min-h-screen">
//             <div className="container mx-auto py-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//
//                     {/* Basic Info */}
//                     <div className="col-span-full rounded-lg shadow-md p-6">
//                         <h2 className="text-2xl font-bold text-primary mb-4">Info</h2>
//                         <div className="grid grid-cols-2 md:grid-cols-4 md:grid-flow-row justify-between gap-4">
//                                 <p>Stadium: {_teamInformation.response[0].venue.name}</p>
//                                 <p>Capacity: {_teamInformation.response[0].venue.capacity}</p>
//                                 <p>Surface: {_teamInformation.response[0].venue.surface}</p>
//                                 <address>Address: {_teamInformation.response[0].venue.address}, {_teamInformation.response[0].venue.city}</address>
//
//                         </div>
//                     </div>
//
//
//                     {/* League */}
//                     <div className="rounded-lg shadow-md p-6">
//                         <div className="flex items-center mb-4">
//                             <img src={data.league.logo} alt="League Logo" className="w-10 h-10 mr-4"/>
//                             <h2 className="text-2xl font-bold text-primary">{data.league.name}</h2>
//                         </div>
//                         <p className="text-gray-600">Country: {data.league.country}</p>
//                         <p className="text-gray-600">Season: {data.league.season}</p>
//                     </div>
//
//                     {/* Fixtures */}
//                     <div className="bg-white rounded-lg shadow-md p-6">
//                         <h2 className="text-2xl font-bold text-primary mb-4">Fixtures</h2>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <p className="text-gray-600">Played: {data.fixtures.played.total}</p>
//                                 <p className="text-gray-600">Wins: {data.fixtures.wins.total}</p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Draws: {data.fixtures.draws.total}</p>
//                                 <p className="text-gray-600">Losses: {data.fixtures.loses.total}</p>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Goals */}
//                     <div className="bg-white rounded-lg shadow-md p-6">
//                         <h2 className="text-2xl font-bold text-primary mb-4">Goals</h2>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <p className="text-gray-600">Total Scored: {data.goals.for.total.total}</p>
//                                 <p className="text-gray-600">Average Scored: {data.goals.for.average.total}</p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Total Conceded: {data.goals.against.total.total}</p>
//                                 <p className="text-gray-600">Average Conceded: {data.goals.against.average.total}</p>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Biggest */}
//                     <div className="bg-white rounded-lg shadow-md p-6">
//                         <h2 className="text-2xl font-bold text-primary mb-4">Biggest</h2>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <p className="text-gray-600">Wins Streak: {data.biggest.streak.wins}</p>
//                                 <p className="text-gray-600">Draws Streak: {data.biggest.streak.draws}</p>
//                                 <p className="text-gray-600">Losses Streak: {data.biggest.streak.loses}</p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Home Win: {data.biggest.wins.home}</p>
//                                 <p className="text-gray-600">Away Win: {data.biggest.wins.away}</p>
//                                 <p className="text-gray-600">Home Loss: {data.biggest.loses.home}</p>
//                                 <p className="text-gray-600">Away Loss: {data.biggest.loses.away}</p>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Clean Sheet */}
//                     <div className="bg-white rounded-lg shadow-md p-6">
//                         <h2 className="text-2xl font-bold text-primary mb-4">Clean Sheet</h2>
//                         <div className="grid grid-cols-3 gap-4">
//                             <p className="text-gray-600">Home: {data.clean_sheet.home}</p>
//                             <p className="text-gray-600">Away: {data.clean_sheet.away}</p>
//                             <p className="text-gray-600">Total: {data.clean_sheet.total}</p>
//                         </div>
//                     </div>
//
//                     {/* Lineups */}
//                     <div className="bg-white rounded-lg shadow-md p-6">
//                         <h2 className="text-2xl font-bold text-primary mb-4">Lineups</h2>
//                         <div className="grid grid-cols-2 gap-4">
//                             {data.lineups.map((lineup: any, index: number) => (
//                                 <div key={index}>
//                                     <p className="text-gray-600">{lineup.formation}</p>
//                                     <p className="text-sm text-gray-500">Played: {lineup.played}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
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