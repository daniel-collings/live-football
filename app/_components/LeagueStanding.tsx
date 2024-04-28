import React from 'react';
import Image from 'next/image';

interface StandingsProps {
    standings: {
        rank: number;
        team: {
            id: number;
            name: string;
            logo: string;
        };
        points: number;
        goalsDiff: number;
        form: string;
        all: {
            played: number;
            win: number;
            draw: number;
            lose: number;
        };
    }[];
}

const LeagueStandings: React.FC<StandingsProps> = ({ standings }) => {
    return (
        <div className="shadow-md sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Team
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Played
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        GD
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Pts
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Form
                    </th>

                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {standings.map((team) => (
                    <tr key={team.team.id}>
                        <td className="px-4 py-2 whitespace-nowrap">
                            <span className="text-sm ">{team.rank}</span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <Image
                                        className="h-10 w-10 rounded-full"
                                        src={team.team.logo}
                                        alt={team.team.name}
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium ">
                                        {team.team.name}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                            <span className="text-sm ">{team.all.played}</span>
                        </td>

                        <td className="px-4 py-2 whitespace-nowrap">
                            <span className="text-sm ">{team.goalsDiff}</span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                            <span className="text-sm font-extrabold">{team.points}</span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
<span className="text-sm flex">
  {team.form.split('').map((result, index) => (
      <span
          key={index}
          className={`mr-1 w-4 text-center ${
              result === 'W' ? 'bg-green-400 text-base-200' : result === 'L' ? 'bg-red-400 text-base-200' : 'bg-base-content text-base-300'
          }`}
      >
      {result}
    </span>
  ))}
</span>                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeagueStandings;