import Fixture from "@/app/_components/Fixture";
import React from "react";

interface FixtureProps {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
    };
  };
  teams: {
    home: {
      name: string;
      logo: string;
    };
    away: {
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number;
    away: number;
  };
}

interface FixtureGroupTemplateProps<T> {
  fixtureSet: T[];
}

export default function FixtureGroupTemplate<T extends FixtureProps>({
  fixtureSet,
}: FixtureGroupTemplateProps<T>) {
  return (
    <div className="overflow-hidden shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {fixtureSet.map((item: FixtureProps) => (
          // @ts-ignore
          <Fixture
            key={item.fixture.id}
            fixture={item.fixture}
            goals={item.goals}
            teams={item.teams}
          />
        ))}
      </ul>
    </div>
  );
}
