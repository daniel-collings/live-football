"use client"

import React from "react";
import _teamInformation from "@/data/team-info/aston-villa.json";
import _teamStats from "@/data/team-info/aston-villa-stats.json";
import _lastFive from "@/data/team-info/fixture-last5.json";
import _nextFive from "@/data/team-info/fixture-next5.json";
import PieChart from "@/app/_components/data-visualisation/PieChart";
import StackedBarChart from "@/app/_components/data-visualisation/StackedBarChart";
import HorizontalBarChart from "@/app/_components/data-visualisation/HorizontalLineChart";
import Fixtures from "@/app/teams/[slug]/FixtureCard";
import GeneralStatCard from "@/app/teams/[slug]/GeneralStatCard";

interface StatisticsProps {
    data: any;
}

const LastFixtures: React.FC = () => {
    const lastFiveFixtures = _lastFive.response;

    return (
            <Fixtures data={lastFiveFixtures} title="Last 5 Results" />
    );
};

const NextFixtures: React.FC = () => {
    const nextFixtures = _nextFive.response;

    return (
            <Fixtures data={nextFixtures} title="Upcoming Fixtures" />
    );
};

const TeamStatisticData: React.FC<StatisticsProps> = ({ data }:any) => {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Basic Info */}
                    <div className="col-span-full rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Info</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-flow-row justify-between gap-4">
                            <p>Stadium: {_teamInformation.response[0].venue.name}</p>
                            <p>Capacity: {_teamInformation.response[0].venue.capacity}</p>
                            <p>Surface: {_teamInformation.response[0].venue.surface}</p>
                            <address>Address: {_teamInformation.response[0].venue.address}, {_teamInformation.response[0].venue.city}</address>
                        </div>

                    </div>

                    <div className="col-span-full p-6">
                        <div className="flex flex-col items-center justify-center mb-4">
                            <img src={data.league.logo} alt="League Logo" className="w-10 h-10 mr-4"/>
                            <h2 className="text-2xl font-bold text-primary">{data.league.name}</h2>
                            <p className="text-gray-600">Country: {data.league.country}</p>
                            <p className="text-gray-600">Season: {data.league.season}</p>
                        </div>

                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <LastFixtures/>

                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <NextFixtures/>
                    </div>

                    {/*<div className="bg-white rounded-lg shadow-md p-6">*/}
                        <GeneralStatCard data={_teamStats.response}/>
                    {/*</div>*/}


                    {/* Goals */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Goals</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Total Scored: {data.goals.for.total.total}</p>
                                <p className="text-gray-600">Average Scored: {data.goals.for.average.total}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Total Conceded: {data.goals.against.total.total}</p>
                                <p className="text-gray-600">Average Conceded: {data.goals.against.average.total}</p>
                            </div>
                        </div>
                    </div>

                    {/* Biggest */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Biggest</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Wins Streak: {data.biggest.streak.wins}</p>
                                <p className="text-gray-600">Draws Streak: {data.biggest.streak.draws}</p>
                                <p className="text-gray-600">Losses Streak: {data.biggest.streak.loses}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Home Win: {data.biggest.wins.home}</p>
                                <p className="text-gray-600">Away Win: {data.biggest.wins.away}</p>
                                <p className="text-gray-600">Home Loss: {data.biggest.loses.home}</p>
                                <p className="text-gray-600">Away Loss: {data.biggest.loses.away}</p>
                            </div>
                        </div>
                    </div>

                    {/* Clean Sheet */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Clean Sheet</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <p className="text-gray-600">Home: {data.clean_sheet.home}</p>
                            <p className="text-gray-600">Away: {data.clean_sheet.away}</p>
                            <p className="text-gray-600">Total: {data.clean_sheet.total}</p>
                        </div>
                    </div>

                    {/* Fixtures */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Fixtures</h2>
                        <PieChart
                            wins={data.fixtures.wins.total}
                            draws={data.fixtures.draws.total}
                            losses={data.fixtures.loses.total}
                            options={{
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                    },
                                },
                            }}/>
                    </div>

                    {/* Home vs Away */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Home vs Away</h2>
                        <StackedBarChart
                            homeWins={data.fixtures.wins.home}
                            homeDraws={data.fixtures.draws.home}
                            homeLosses={data.fixtures.loses.home}
                            awayWins={data.fixtures.wins.away}
                            awayDraws={data.fixtures.draws.away}
                            awayLosses={data.fixtures.loses.away}
                        />
                    </div>

                    {/* Lineups */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Lineups</h2>
                        <HorizontalBarChart lineups={data.lineups}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamStatisticData
