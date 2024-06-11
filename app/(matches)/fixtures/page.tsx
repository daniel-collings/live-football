"use client";

import DrawerTemplate from "@/app/_components/template/DrawerTemplate";
import React from "react";
import FixtureGroupTemplate from "@/app/_components/template/FixtureGroupTemplate";
import _fixtures from "@/data/fixtures.json";
import DailyTab from "@/app/_components/DailyTab";

export default function Page() {
  const [statisticsInFocus, setStatisticsInFocus] = React.useState<any>(null);
  const { response } = _fixtures;
  return (
    <DrawerTemplate focus={statisticsInFocus}>
      <div className="">
        <DailyTab selectedDate={new Date()} onChange={() => null} />
        {/*// @ts-ignore*/}
        <FixtureGroupTemplate fixtureSet={response} />
      </div>
    </DrawerTemplate>
  );
}
