// src/components/charts/SuggestionAcceptanceRate.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SuggestionAcceptanceRate = ({ rate }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const textColor = isDarkMode ? '#F9FAFB' : '#1F2937';

    const data = {
        labels: ['Accepted', 'Rejected'],
        datasets: [{
            data: [rate, 100 - rate],
            backgroundColor: ['rgba(16, 185, 129, 0.8)', 'rgba(239, 68, 68, 0.8)'],
            borderColor: [isDarkMode ? '#1F2937' : '#FFFFFF'],
            borderWidth: 4,
        }],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { color: textColor } },
            title: { display: true, text: 'AI Fix Acceptance', font: { size: 18 }, color: textColor },
        },
        cutout: '70%',
    };
    return <Doughnut data={data} options={options} />;
};

export default SuggestionAcceptanceRate;