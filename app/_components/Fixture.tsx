import React from 'react';
import Link from "next/link";
import {stringToSlug} from "@/utils/urlSlugger";

export interface FixtureProps {
    fixture: {
        id: number;
        date: string;
        status: {
            short: string;
        };
    };
    teams: {
        home: {
            id: number;
            name: string;
            logo: string;
        };
        away: {
            id: number;
            name: string;
            logo: string;
        };
    };
    goals: {
        home: number;
        away: number;
    };
}

const Fixture: React.FC<FixtureProps> = ({ fixture, teams, goals }) => {
    const kickOffTime = new Date(fixture.date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Link href={`/fixtures/${fixture.id}`}>
        <li className="flex items-center justify-between p-4 rounded-sm shadow-md">
            <div className="flex items-center justify-end space-x-4 w-1/3">
                <Link href={`/teams/${stringToSlug(teams.home.name)}-${teams.home.id}`}>
                    <span className="font-semibold">{teams.home.name}</span></Link>
                <img src={teams.home.logo} alt={teams.home.name} className="w-8 h-8"/>
            </div>
            <div className="flex items-center space-x-4">
            {fixture.status.short === 'FT' ? (
                    <span className="font-semibold text-xl">
            {goals.home} - {goals.away}
          </span>
                ) : (
                    <span className="text-content">{kickOffTime}</span>
                )}
            </div>
            <div className="flex items-center space-x-4 w-1/3">
                <img src={teams.away.logo} alt={teams.away.name} className="w-8 h-8" />
                <Link href={`/teams/${stringToSlug(teams.away.name)}`}><span className="font-semibold">{teams.away.name}</span></Link>
            </div>
        </li>
        </Link>
    );
};

export default Fixture;