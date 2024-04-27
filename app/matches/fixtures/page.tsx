"use client"

import DrawerTemplate from "@/app/_components/template/DrawerTemplate";
import React from "react";
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";

export default function Page(){
    const [statisticsInFocus, setStatisticsInFocus] = React.useState<any>(null);
    return(
        <DrawerTemplate focus={statisticsInFocus}>
            <div className="">
                Page Fixture
                <label id="1" htmlFor="my-drawer-4" className="drawer-button btn btn-primary" onClick={(e) => setStatisticsInFocus(e.currentTarget.id)}>Open drawer</label>
                <label id="2" htmlFor="my-drawer-4" className="drawer-button btn btn-primary" onClick={(e) => setStatisticsInFocus(e.currentTarget.id)}>Open drawer 1</label>

            </div>
        </DrawerTemplate>

    )
}