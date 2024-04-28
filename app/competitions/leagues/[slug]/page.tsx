import _league_standing from "@/data/league-standings.json"
import LeagueStandings from "@/app/_components/LeagueStanding";
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";

export default function Page(slug: string) {
    return(
        <div className="">
            <ConstraintLayoutTemplate>
                {_league_standing.response[0].league.standings.map((o:any, i:number) => (
                    <LeagueStandings key={i} standings={o}/>
                ))}
            </ConstraintLayoutTemplate>

        </div>
    )
}