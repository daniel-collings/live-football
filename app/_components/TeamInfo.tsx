import React from 'react';
import Image from "next/image";

interface TeamInfoProps {
    data: any;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ data }) => {
    const team = data.response[0].team;
    const venue = data.response[0].venue;

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-8">
                <div className="rounded-lg p-6">
                    <div className="flex items-center mb-6">
                        <img src={team.logo} alt={`${team.name} Logo`} className="w-20 h-20 mr-6" />
                        <div>
                            <h1 className="text-4xl font-bold text-indigo-600">{team.name}</h1>
                            <p className="text-gray-600">{team.country}</p>
                            <small className="text-gray-600">Founded: {team.founded}</small>

                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div>

                                <div
                                    className="w-full lg:w-fit flex flex-col flex-wrap items-center gap-4 xl:justify-evenly">
                                    <div className="flex flex-col">
                                        <p>Stadium: {venue.name}</p>
                                        <p>Capacity: {venue.capacity}</p>
                                        <p>Surface: {venue.surface}</p>
                                        <address>{venue.address}, {venue.city}</address>
                                    </div>
                                </div>
                                {venue.image && (<Image
                                    className="aspect-auto h-auto w-auto rounded-box"
                                    src={venue.image}
                                    width={200}
                                    height={200}
                                    alt="Background"
                                />)}

                        </div>
                </div>

            </div>
        </div>
</div>
)
    ;
};

export default TeamInfo;