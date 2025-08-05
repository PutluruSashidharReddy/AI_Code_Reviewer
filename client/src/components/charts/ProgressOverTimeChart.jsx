// src/components/charts/ProgressOverTimeChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ProgressOverTimeChart = ({ chartData }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const textColor = isDarkMode ? '#F9FAFB' : '#1F2937';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const primaryColor = isDarkMode ? '#818CF8' : '#6366F1';

    const data = {
        labels: chartData.labels,
        datasets: [{
            label: 'Issues Detected',
            data: chartData.data,
            fill: true,
            backgroundColor: isDarkMode ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.2)',
            borderColor: primaryColor,
            tension: 0.3,
            pointBackgroundColor: primaryColor,
        }],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Submission Quality Trend', font: { size: 18 }, color: textColor },
        },
        scales: {
            y: { ticks: { color: textColor }, grid: { color: gridColor } },
            x: { ticks: { color: textColor }, grid: { color: gridColor } },
        },
    };
    return <Line options={options} data={data} />;
};

export default ProgressOverTimeChart;