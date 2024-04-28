"use client"

import DrawerTemplate from "@/app/_components/template/DrawerTemplate";
import React from "react";
import FixtureGroupTemplate from "@/app/_components/template/FixtureGroupTemplate";
import _fixtures from "@/data/fixtures.json"

export default function Page(){
    const [statisticsInFocus, setStatisticsInFocus] = React.useState<any>(null);
    const { response } = _fixtures
    return(
        <DrawerTemplate focus={statisticsInFocus}>
            <div className="">
                Page Fixture
                {/*// @ts-ignore*/}
                <FixtureGroupTemplate fixtureSet={response} />
            </div>
        </DrawerTemplate>

    )
}