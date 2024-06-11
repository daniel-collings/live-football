import React from "react";
import Image from "next/image";
import Link from "next/link";
import { stringToSlug } from "@/utils/urlSlugger";

export interface ILeagueProps {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
}

export default function LeagueCard({ league, country }: ILeagueProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-accent-content/5 border-[1px]">
      <div className="flex items-center justify-center h-48 overflow-clip">
        <Link
          href={`/competitions/domestic/leagues/${stringToSlug(league.name)}-${league.id}`}
        >
          <Image
            src={league.logo}
            alt={league.name}
            width={150}
            height={150}
            className="transition duration-300 ease-in-out transform hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-4 bg-base-200 text-base-content h-full">
        <h2 className="text-xl font-semibold">{league.name}</h2>
        <div className="items-center mb-2 hidden md:flex">
          <Image
            src={country.flag}
            alt={country.name}
            width={20}
            height={20}
            className="mr-2"
          />
          <span className="text-sm ">{country.name}</span>
        </div>
        {/*<p className="">{league.type}</p>*/}
      </div>
    </div>
  );
}
