// import CustomStatTable, {Player} from "@/app/_components/CustomStatTable";
// import React, {useState} from "react";
// import {CellContext, ColumnDef} from "@tanstack/react-table";
// import {PlayerStats} from "@/app/_components/LeagueStatisticTable";
// import _topScores from "@/data/top-scorers.json";
// import {restructureData} from "@/utils/restructurePlayerData";
// import {PageProps} from "@/app/leagues/[slug]/page";
//
// const playerImageCell = (info: CellContext<PlayerStats, string>) => {
//     const imageUrl = info.getValue();
//     return (
//         <div className="flex items-center">
//             {imageUrl ? (
//                 <img src={imageUrl} alt="" className="w-12 h-12 rounded-full" />
//             ) : (
//                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
//                     <svg
//                         className="w-6 h-6 text-gray-400"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                     </svg>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// const columns: ColumnDef<Player>[] = [
//     {
//         header: "",
//         accessorKey: "photo",
//         // @ts-ignore
//         cell: (info) => playerImageCell(info)
//     },
//     {
//         header: 'Name',
//         accessorKey: 'name',
//     },
//     {
//         header: 'Team',
//         accessorKey: 'team.name',
//     },
//     {
//         header: 'Yellow Cards',
//         accessorKey: 'yellowCards',
//     },
//     {
//         header: 'Red Cards',
//         accessorKey: 'redCards',
//     },
//     {
//         header: 'Assists',
//         accessorKey: 'assists',
//     },
//     {
//         header: 'Goals',
//         accessorKey: 'goals',
//     },
// ];
//
// const topScorers = _topScores
//
// const datasets = restructureData([topScorers]);
//
//
// export default async function PlayerStatsTable({params, searchParams}: PageProps){
//     const data = await getPlayerStatsData()
//
//     const [pagination, setPagination] = useState({
//         pageIndex: 0,
//         pageSize: 10,
//     });
//
//     return (
//         <div>
//             <h2 className="text-2xl font-bold my-4">Player Stats</h2>
//             <CustomStatTable data={datasets} columns={columns} pagination={pagination}
//                              setPagination={setPagination}/>
//         </div>
//     )
// }