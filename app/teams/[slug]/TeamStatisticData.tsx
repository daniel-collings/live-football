import React from "react";
import PieChart from "@/app/_components/data-visualisation/PieChart";
import StackedBarChart from "@/app/_components/data-visualisation/StackedBarChart";
import HorizontalBarChart from "@/app/_components/data-visualisation/HorizontalLineChart";
import Fixtures from "@/app/teams/[slug]/FixtureCard";
import axios from "axios";
import InGameStatsCard from "@/app/teams/[slug]/InGameStatsCard";
import extractIdFromUrl from "@/utils/extractIdFromUrl";

async function getTeamStatistics(slug: string){
    const teamId = extractIdFromUrl(slug)

    const {data, status, statusText} = await axios.get(`${process.env.LIVE_FOOTBALL_URL}/api/statistics/team?id=${teamId}`)
        .then(res =>res)
        .catch(err =>{
            return err.response;
        })
    if(data === null){
        return {status, statusText}
    }
    const {league,fixtures,lineups, goals, biggest, clean_sheet, cards, penalty} = data
    return {league,fixtures,lineups, goals, biggest, clean_sheet, cards, penalty}
}

export default async function TeamStatisticData({ venue, teamId }: {
    teamId: string;
    venue: {
        name:string,
        capacity:string,
        surface:string,
        address:string,
        city:string,
    }}) {
    const {league,fixtures,lineups, goals, biggest, clean_sheet, cards, penalty} = await getTeamStatistics(teamId)

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Basic Info */}
                    {venue && (<div className="col-span-full rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Info</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-flow-row justify-between gap-4">
                            <p>Stadium: {venue.name}</p>
                            <p>Capacity: {venue.capacity}</p>
                            <p>Surface: {venue.surface}</p>
                            <address>Address: {venue.address}, {venue.city}</address>
                        </div>
                    </div>)}

                    {league && (<div className="col-span-full p-6">
                        <div className="flex flex-col items-center justify-center mb-4">
                            <img src={league.logo} alt="League Logo" className="w-10 h-10 mr-4"/>
                            <h2 className="text-2xl font-bold text-primary">{league.name}</h2>
                            <p className="text-gray-600">Country: {league.country}</p>
                            <p className="text-gray-600">Season: {league.season}</p>
                        </div>
                    </div>)}

                    {/*{previousResults && (<div className="bg-white rounded-lg shadow-md p-6">*/}
                    {/*    <Fixtures data={previousResults} title="Last 5 Results" />*/}

                    {/*</div>)}*/}

                    {/*{upcomingFixtures && (<div className="bg-white rounded-lg shadow-md p-6">*/}
                    {/*    <Fixtures data={upcomingFixtures} title="Upcoming Fixtures" />*/}
                    {/*</div>)}*/}

                    {(cards && penalty)  && (<InGameStatsCard cards={cards} penalty={penalty} />)}


                    {/* Goals */}
                    {goals && (<div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Goals</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Total Scored: {goals.for.total.total}</p>
                                <p className="text-gray-600">Average Scored: {goals.for.average.total}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Total Conceded: {goals.against.total.total}</p>
                                <p className="text-gray-600">Average Conceded: {goals.against.average.total}</p>
                            </div>
                        </div>
                    </div>)}

                    {/* Biggest */}
                    {biggest && (<div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Biggest</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Wins Streak: {biggest.streak.wins}</p>
                                <p className="text-gray-600">Draws Streak: {biggest.streak.draws}</p>
                                <p className="text-gray-600">Losses Streak: {biggest.streak.loses}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Home Win: {biggest.wins.home}</p>
                                <p className="text-gray-600">Away Win: {biggest.wins.away}</p>
                                <p className="text-gray-600">Home Loss: {biggest.loses.home}</p>
                                <p className="text-gray-600">Away Loss: {biggest.loses.away}</p>
                            </div>
                        </div>
                    </div>)}

                    {/* Clean Sheet */}
                    {/*{clean_sheet && (<div className="bg-white rounded-lg shadow-md p-6">*/}
                    {/*    <h2 className="text-2xl font-bold text-primary mb-4">Clean Sheet</h2>*/}
                    {/*    <div className="grid grid-cols-3 gap-4">*/}
                    {/*        <p className="text-gray-600">Home: {clean_sheet.home}</p>*/}
                    {/*        <p className="text-gray-600">Away: {clean_sheet.away}</p>*/}
                    {/*        <p className="text-gray-600">Total: {clean_sheet.total}</p>*/}
                    {/*    </div>*/}
                    {/*</div>)}*/}

                    {/* Fixtures */}
                    {fixtures && (<div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Fixtures</h2>
                        <PieChart
                            wins={fixtures.wins.total}
                            draws={fixtures.draws.total}
                            losses={fixtures.loses.total}
                            options={{
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                    },
                                },
                            }}/>
                    </div>)}

                    {/* Home vs Away */}
                    {fixtures && (<div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Home vs Away</h2>
                        <StackedBarChart
                            homeWins={fixtures.wins.home}
                            homeDraws={fixtures.draws.home}
                            homeLosses={fixtures.loses.home}
                            awayWins={fixtures.wins.away}
                            awayDraws={fixtures.draws.away}
                            awayLosses={fixtures.loses.away}
                        />
                    </div>)}

                    {/* Lineups */}
                    {lineups && (<div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">Lineups</h2>
                        <HorizontalBarChart lineups={lineups}/>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

