import React from 'react';

interface CardStatsProps {
    data: any;
}

const CardStats: React.FC<CardStatsProps> = ({ data }) => {
    const { cards, penalty } = data;

    const totalYellowCards = Object.values(cards.yellow)
        .map((item: any) => item.total)
        .reduce((sum: number, value: number) => sum + value, 0);

    const totalRedCards = Object.values(cards.red)
        .map((item: any) => item.total)
        .reduce((sum: number, value: number | null) => (value ? sum + value : sum), 0);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center text-primary mb-4">Card & Penalty Stats</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-600 font-bold">Yellow Cards:</p>
                    <p className="text-3xl text-yellow-500">{totalYellowCards}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-bold">Red Cards:</p>
                    <p className="text-3xl text-red-600">{totalRedCards}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-bold">Penalties Scored:</p>
                    <p className="text-3xl text-green-600">{penalty.scored.total}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-bold">Penalties Missed:</p>
                    <p className="text-3xl text-red-600">{penalty.missed.total}</p>
                </div>
            </div>
        </div>
    );
};

export default CardStats;