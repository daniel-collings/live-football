"use client"

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

interface HorizontalBarChartProps {
    lineups: { formation: string; played: number }[];
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ lineups }) => {
    const data = {
        labels: lineups.map((lineup) => lineup.formation),
        datasets: [
            {
                label: 'Played',
                data: lineups.map((lineup) => lineup.played),
                backgroundColor: '#3498db',
            },
        ],

    };

    const options = {
        indexAxis: 'y',
        plugins: {
            legend: null
        },
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            {/*// @ts-ignore*/}
            <Bar data={data} options={options} />
        </div>
    );
};

export default HorizontalBarChart;