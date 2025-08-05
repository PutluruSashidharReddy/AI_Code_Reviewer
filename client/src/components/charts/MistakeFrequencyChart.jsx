// src/components/charts/MistakeFrequencyChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MistakeFrequencyChart = ({ chartData }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const textColor = isDarkMode ? '#F9FAFB' : '#1F2937';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const data = {
        labels: chartData.labels,
        datasets: [{
            label: 'Occurrences',
            data: chartData.data,
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1,
            borderRadius: 5,
        }],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Most Common Logic Errors', font: { size: 18 }, color: textColor },
        },
        scales: {
            y: { beginAtZero: true, ticks: { color: textColor }, grid: { color: gridColor } },
            x: { ticks: { color: textColor }, grid: { display: false } },
        },
    };
    return <Bar options={options} data={data} />;
};

export default MistakeFrequencyChart;