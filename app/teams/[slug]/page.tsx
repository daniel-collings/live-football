import React from 'react';
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import {notFound, redirect} from "next/navigation";
import axios from "axios";
import TeamStatisticData from "@/app/teams/[slug]/TeamStatisticData";
import extractIdFromUrl from "@/utils/extractIdFromUrl";

interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

async function getTeamData(slug:string){
    const teamId = extractIdFromUrl(slug)

    const {data, status, statusText} = await axios.get(`http://localhost:3000/api/teams?id=${teamId}`)
        .then(res =>res)
        .catch(err =>{
            return err.response;
        })
    if(data === null){
        return {status, statusText}
    }

    const { team, venue } = data

    return {team, venue, status, statusText}

}

export default async function TeamPage({params, searchParams}: PageProps) {
    const { team, venue, status, statusText } = await getTeamData(params.slug)

        switch (status){
            case 302:
                console.error(statusText)
                return redirect("/limit-reached")
            case 404:
                console.error(statusText)
                return notFound();
        }


    if (!team) {
        return <>Loading...</>;
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
            <TeamStatisticData teamId={params.slug} venue={venue}/>
        </ConstraintLayoutTemplate>
    );
};
