"use client"

import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
Chart.register(ArcElement,  Tooltip, Legend);

interface PieChartProps {
    wins: number;
    draws: number;
    losses: number;
    options?: any;
}

const defaultOptions = {
    plugins: {
        legend: {
            position: 'bottom',
        },
    },
};


const PieChart: React.FC<PieChartProps> = ({ wins, draws, losses, options }) => {
    const data = {
        labels: ['Wins', 'Draws', 'Losses'],
        datasets: [
            {
                data: [wins, draws, losses],
                // backgroundColor: ['#55efc4', '#74b9ff', '#ff6b6b'],
                // backgroundColor: ['#00b894', '#0984e3', '#ff7675'],
                backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
            },
        ],

    };

    const chartOptions = {
        ...defaultOptions,
        ...options,
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <Pie data={data} options={chartOptions} />
        </div>
    );
};

export default PieChart;