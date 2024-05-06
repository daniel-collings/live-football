import _league_standing from "@/data/league-standings.json"
import LeagueStandings from "@/app/_components/LeagueStanding";
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import LeagueStatisticTable, {PlayerStats} from "@/app/_components/LeagueStatisticTable";
import _yellowCardStats from '@/data/top-yellow-cards.json'
import _topRedCardStats from '@/data/top-red-cards.json'
import _topAssists from '@/data/top-assists.json'
import _topScores from '@/data/top-scorers.json'
import {ColumnDef} from "@tanstack/react-table";

interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({params, searchParams}: PageProps) {
    // Assuming you have the four datasets imported or defined as separate variables
    const topYellowCards = _yellowCardStats
    const topScorers = _topScores
    const topRedCards = _topRedCardStats
    const topAssists = _topAssists

    const yellowCardsColumns: ColumnDef<PlayerStats>[] = [
        {
            header: 'Player',
            columns: [
                {
                    header: 'Image',
                    accessorKey: 'player.photo',
                    cell: (info) => (
                        <img src={info.getValue()} alt="Player" className="w-12 h-12 rounded-full" />
                    ),
                },
                {
                    header: 'Name',
                    accessorKey: 'player.name',
                },
            ],
        },
        {
            header: 'Team',
            accessorKey: 'statistics[0].team.name',
        },
        {
            header: 'Yellow Cards',
            accessorKey: 'statistics[0].cards.yellow',
        },
        {
            header: 'Games Played',
            accessorKey: 'statistics[0].games.appearences',
        },
    ];

    const topScorersColumns: ColumnDef<PlayerStats>[] = [
        {
            header: 'Player',
            columns: [
                {
                    header: 'Image',
                    accessorKey: 'player.photo',
                    cell: (info) => (
                        <img src={info.getValue()} alt="Player" className="w-12 h-12 rounded-full" />
                    ),
                },
                {
                    header: 'Name',
                    accessorKey: 'player.name',
                },
            ],
        },
        {
            header: 'Team',
            accessorKey: 'statistics[0].team.name',
        },
        {
            header: 'Goals',
            accessorKey: 'statistics[0].goals.total',
        },
        {
            header: 'Games Played',
            accessorKey: 'statistics[0].games.appearences',
        },
    ];

    const redCardsColumns: ColumnDef<PlayerStats>[] = [
        {
            header: 'Player',
            columns: [
                {
                    header: 'Image',
                    accessorKey: 'player.photo',
                    cell: (info) => (
                        <img src={info.getValue()} alt="Player" className="w-12 h-12 rounded-full" />
                    ),
                },
                {
                    header: 'Name',
                    accessorKey: 'player.name',
                },
            ],
        },
        {
            header: 'Team',
            accessorKey: 'statistics[0].team.name',
        },
        {
            header: 'Red Cards',
            accessorKey: 'statistics[0].cards.red',
        },
        {
            header: 'Games Played',
            accessorKey: 'statistics[0].games.appearences',
        },
    ];

    const assistsColumns: ColumnDef<PlayerStats>[] = [
        {
            header: 'Player',
            columns: [
                {
                    header: 'Image',
                    accessorKey: 'player.photo',
                    cell: (info) => (
                        <img src={info.getValue()} alt="Player" className="w-12 h-12 rounded-full" />
                    ),
                },
                {
                    header: 'Name',
                    accessorKey: 'player.name',
                },
            ],
        },
        {
            header: 'Team',
            accessorKey: 'statistics[0].team.name',
        },
        {
            header: 'Assists',
            accessorKey: 'statistics[0].goals.assists',
        },
        {
            header: 'Games Played',
            accessorKey: 'statistics[0].games.appearences',
        },
    ];


    return(
        <div className="">
            <ConstraintLayoutTemplate>
                {/*<LeagueStatisticTable data={_topRedCardStats} columns={redCardsColumns} />*/}
                {/*<LeagueStatisticTable data={_topScores} columns={topScorersColumns} />*/}
                {/*<LeagueStatisticTable data={_yellowCardStats} columns={yellowCardsColumns} />*/}
                {/*<LeagueStatisticTable data={_topAssists} columns={assistsColumns} />*/}


                {_league_standing.response[0].league.standings.map((o:any, i:number) => (
                    <LeagueStandings key={i} standings={o}/>
                ))}
            </ConstraintLayoutTemplate>

        </div>
    )
}