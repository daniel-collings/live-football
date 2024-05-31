

import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import React from "react";
import Tabs from "@/app/_components/Tabs";
// import PlayerStatsTable from "@/app/leagues/[slug]/PlayerStatsTable";
import LeagueTable from "@/app/leagues/[slug]/LeagueTable";

export interface PageProps {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Page({params}: PageProps) {

    // const [activeTab, setActiveTab] = useState<string>("Table")
    // const handleTabChange = (tab: string) => {
    //     setActiveTab(tab);
    // };




    return(
        <div className="">
            <ConstraintLayoutTemplate>

                {/*<Tabs tabs={['Overview', 'Table', 'Player Stats']} onTabChange={handleTabChange} />*/}
                {/*<div className="mt-4">*/}
                {/*    {activeTab === "Overview" ? (*/}
                {/*            <div className="">*/}
                {/*                <h2 className="text-2xl font-bold my-4">League Overview</h2>*/}

                {/*            </div>*/}
                {/*        ) :*/}
                {/*        activeTab === "Table" ? (*/}
                   <LeagueTable params={params}  />
{/*                        ) : activeTab === "Player Stats" ? (*/}
{/*                            <></>*/}
{/*// <PlayerStatsTable/>*/}
{/*                    ) : (<div>Loading...</div>)}*/}
{/*                </div>*/}


</ConstraintLayoutTemplate>

</div>
)
}
