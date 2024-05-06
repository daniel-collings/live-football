"use client"

import React, {useMemo, useState} from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';
import {getPaginationRowModel} from "@tanstack/table-core";


interface Player {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
        date: string;
        place: string;
        country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
}

interface Team {
    id: number;
    name: string;
    logo: string;
}

interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
}

interface Games {
    appearences: number;
    lineups: number;
    minutes: number;
    number: null;
    position: string;
    rating: string;
    captain: boolean;
}

interface Substitutes {
    in: number;
    out: number;
    bench: number;
}

interface Shots {
    total: number;
    on: number;
}

interface Goals {
    total: number;
    conceded: number;
    assists: number | null;
    saves: null;
}

interface Passes {
    total: number;
    key: number;
    accuracy: number;
}

interface Tackles {
    total: number;
    blocks: number;
    interceptions: number;
}

interface Duels {
    total: number;
    won: number;
}

interface Dribbles {
    attempts: number;
    success: number;
    past: null;
}

interface Fouls {
    drawn: number;
    committed: number;
}

interface Cards {
    yellow: number;
    yellowred: number;
    red: number;
}

interface Penalty {
    won: null;
    commited: null;
    scored: number;
    missed: number;
    saved: null;
}

interface Statistics {
    team: Team;
    league: League;
    games: Games;
    substitutes: Substitutes;
    shots: Shots;
    goals: Goals;
    passes: Passes;
    tackles: Tackles;
    duels: Duels;
    dribbles: Dribbles;
    fouls: Fouls;
    cards: Cards;
    penalty: Penalty;
}

export interface PlayerStats {
    player: Player;
    statistics: Statistics[];
}

interface TableProps {
    data: PlayerStats[];
    columns: ColumnDef<PlayerStats>[];
}

interface TableProps {
    data: PlayerStats[];
    columns: ColumnDef<PlayerStats>[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        initialState: {
            pagination: {
                pageSize: 20,      },
        },
    });

    const teamOptions = useMemo(() => {
        const uniqueTeams = new Set(data.map((player) => player.statistics[0].team.name));
        return Array.from(uniqueTeams);
    }, [data]);

    return (
        <div className="overflow-x-auto">
            <div className="mb-4">
                <label htmlFor="team-filter" className="block mb-2 font-bold text-gray-700">
                    Filter by Team:
                </label>
                <select
                    id="team-filter"
                    onChange={(e) => table.setColumnFilters([{id: 'statistics[0].team.name', value: e.target.value}])}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Teams</option>
                    {teamOptions.map((team) => (
                        <option key={team} value={team}>
                            {team}
                        </option>
                    ))}
                </select>
            </div>
            <table className="w-full text-left table-auto border-collapse">
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className="px-4 py-2 bg-gray-100 border-b"
                                colSpan={header.colSpan}
                            >
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : '',
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-2 border-b">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
                <span className="mx-4">
          Page{' '}
                    <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="px-2 py-1 border border-gray-300 rounded-md"
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Table;