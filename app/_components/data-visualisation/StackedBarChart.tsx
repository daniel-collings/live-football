"use client"

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart, CategoryScale, BarElement} from 'chart.js'
Chart.register(CategoryScale,BarElement)

interface StackedBarChartProps {
    homeWins: number;
    homeDraws: number;
    homeLosses: number;
    awayWins: number;
    awayDraws: number;
    awayLosses: number;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
                                                             homeWins,
                                                             homeDraws,
                                                             homeLosses,
                                                             awayWins,
                                                             awayDraws,
                                                             awayLosses,
                                                         }) => {
    const data = {
        labels: ['Home', 'Away'],
        datasets: [
            {
                label: 'Wins',
                data: [homeWins, awayWins],
                backgroundColor: '#2ecc71',
            },
            {
                label: 'Draws',
                data: [homeDraws, awayDraws],
                backgroundColor: '#3498db',
            },
            {
                label: 'Losses',
                data: [homeLosses, awayLosses],
                backgroundColor: '#e74c3c',
            },
        ],

    };

    const options = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            {/*// @ts-ignore*/}
            <Bar data={data} options={options} />
        </div>
    );
};

export default StackedBarChart;