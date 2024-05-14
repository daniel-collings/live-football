"use client"

import _league_standing from "@/data/league-standings.json"
import LeagueStandings from "@/app/_components/LeagueStanding";
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import {PlayerStats} from "@/app/_components/LeagueStatisticTable";
import _topScores from '@/data/top-scorers.json'
import {CellContext, ColumnDef} from "@tanstack/react-table";
import {useState} from "react";
import CustomStatTable, {Player} from "@/app/_components/CustomStatTable";
import {restructureData} from "@/utils/restructurePlayerData";
import Tabs from "@/app/_components/Tabs";
import {notFound} from "next/navigation";

interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}
const topScorers = _topScores

const datasets = restructureData([topScorers]);

export default function Page({params, searchParams}: PageProps) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [activeTab, setActiveTab] = useState<string>("Table")
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    if(params.slug !== "premier-league"){
        notFound()
    }

    const playerImageCell = (info: CellContext<PlayerStats, string>) => {
        const imageUrl = info.getValue();
        return (
            <div className="flex items-center">
                {imageUrl ? (
                    <img src={imageUrl} alt="" className="w-12 h-12 rounded-full" />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                )}
            </div>
        );
    };

    const columns: ColumnDef<Player>[] = [
        {
          header: "",
          accessorKey: "photo",
            // @ts-ignore
            cell: (info) => playerImageCell(info)
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Team',
            accessorKey: 'team.name',
        },
        {
            header: 'Yellow Cards',
            accessorKey: 'yellowCards',
        },
        {
            header: 'Red Cards',
            accessorKey: 'redCards',
        },
        {
            header: 'Assists',
            accessorKey: 'assists',
        },
        {
            header: 'Goals',
            accessorKey: 'goals',
        },
    ];

    return(
        <div className="">
            <ConstraintLayoutTemplate>

                <Tabs tabs={['Table', 'Player Stats']} onTabChange={handleTabChange} />
                <div className="mt-4">
                    {activeTab === "Table" ? (
                        <div className="">
                            {_league_standing.response[0].league.standings.map((o: any, i: number) => (
                                <LeagueStandings key={i} standings={o}/>
                            ))}
                        </div>
                    ) : activeTab === "Player Stats" ? (
                        <div>
                            <h2 className="text-2xl font-bold my-4">Player Stats</h2>
                            <CustomStatTable data={datasets} columns={columns} pagination={pagination}
                                             setPagination={setPagination}/>
                        </div>
                    ) : (<div>Loading...</div>)}
                </div>


</ConstraintLayoutTemplate>

</div>
)
}