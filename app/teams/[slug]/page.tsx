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
