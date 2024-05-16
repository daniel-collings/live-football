import React from 'react';

interface FixtureProps<T> {
    fixture: T;
}

const Fixture = <T extends { fixture: any; teams: any; goals?: any }>(
    props: FixtureProps<T>
) => {
    const { fixture, teams, goals } = props.fixture;
    const isUpcoming = fixture.status.short === 'NS';

    return (
        <div className="flex items-center justify-evenly">
            <div className="text-gray-600">{new Date(fixture.date).toLocaleDateString().substring(0,5)}</div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <img src={teams.home.logo} alt={`${teams.home.name} Logo`} className="w-6 h-6 mr-2" />
                    {/*<div className="text-gray-800 font-bold">{teams.home.name}</div>*/}
                </div>
                <div className="text-gray-600 font-bold">
                    {isUpcoming ? '-' : `${goals?.home ?? ''} - ${goals?.away ?? ''}`}
                </div>
                <div className="flex items-center">
                    {/*<div className="text-gray-800 font-bold">{teams.away.name}</div>*/}
                    <img src={teams.away.logo} alt={`${teams.away.name} Logo`} className="w-6 h-6 ml-2" />
                </div>
            </div>
        </div>
    );
};

interface FixturesProps<T> {
    data: T[];
    title: string;
}

const Fixtures = <T extends { fixture: any; teams: any; goals?: any }>(
    props: FixturesProps<T>
) => {
    const { data, title } = props;

    return (
     <>
                <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
                <div className="space-y-4">
                    {data.map((fixture) => (
                        <Fixture key={fixture.fixture.id} fixture={fixture} />
                    ))}
                </div>
          </>
    );
};

export default Fixtures;