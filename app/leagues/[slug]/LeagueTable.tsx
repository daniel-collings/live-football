import LeagueStandings from "@/app/_components/LeagueStanding";
import React from "react";
import { PageProps } from "@/app/leagues/[slug]/page";
import extractIdFromUrl from "@/utils/extractIdFromUrl";
import axios from "axios";
import { notFound, redirect } from "next/navigation";

async function getLeagueStandings(slug: string) {
  const leagueId = extractIdFromUrl(slug);

  const { data, status, statusText } = await axios
    .get(
      `${process.env.LIVE_FOOTBALL_URL}/api/leagues/standings?id=${leagueId}`,
    )
    .then((res) => res)
    .catch((err) => {
      return err.response;
    });

  if (data === null) {
    return { status, statusText };
  }
  const { league } = data;
  return { league };
}

export default async function LeagueTable({ params }: PageProps) {
  const { league, status, statusText } = await getLeagueStandings(params.slug);

  switch (status) {
    case 302:
      console.error(statusText);
      return redirect("/limit-reached");
    case 404:
      console.error(statusText);
      return notFound();
  }

  if (!league) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">League Standings</h2>

      {league.standings.map((o: any, i: number) => (
        <LeagueStandings key={i} standings={o} />
      ))}
    </div>
  );
}
