import _leagues from "@/data/leagues.json"
import LeagueCard, {ILeagueProps} from "@/app/_components/LeagueCard";
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";

export default function Page(){
    return(
        <div className="">
            <ConstraintLayoutTemplate>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-8">
                    {_leagues.response.map((o: ILeagueProps, i: number) => (
                        <LeagueCard key={i} league={o.league} country={o.country}/>
                    ))}
                </div>
            </ConstraintLayoutTemplate>
            League Page


        </div>
    )
}