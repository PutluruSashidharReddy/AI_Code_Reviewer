import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { motion } from 'framer-motion';
import { ChartBarIcon, ChartPieIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

// --- DEFINE THE CHART DATA OUTSIDE THE COMPONENT ---

// Data for the Bar chart
const mistakeFrequencyData = {
  labels: ['Base Case', 'Off-by-one', 'Null Pointer', 'Logic', 'API Misuse'],
  datasets: [
    {
      label: 'Errors',
      data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1),
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};

// Data for the Line chart
const progressOverTimeData = {
  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
  datasets: [
    {
      label: 'Issues',
      data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 10) + 1),
      fill: true,
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 1)',
      tension: 0.4,
    },
  ],
};

const Dashboard = () => {
  const suggestionAcceptanceRate = Math.floor(Math.random() * 100) + 1;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows us to control height better
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#888' },
        grid: { color: 'rgba(136, 136, 136, 0.1)' }
      },
      x: {
        ticks: { color: '#888' },
        grid: { display: false }
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
      >
        Dashboard
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Chart Card (takes up 2/3 of the width) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 p-6 bg-white dark:bg-secondary-dark rounded-xl shadow-md border border-gray-200 dark:border-border-dark hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="flex items-center text-xl font-semibold mb-4">
            <PresentationChartLineIcon className="w-6 h-6 mr-2 text-red-500" /> Progress Over Time
          </h2>
          <div className="h-96"> {/* Set a fixed height for the chart container */}
            <Line data={progressOverTimeData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Side Cards (takes up 1/3 of the width and stacks vertically) */}
        <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-6">
          {/* Mistake Frequency Card */}
          <div className="p-6 bg-white dark:bg-secondary-dark rounded-xl shadow-md border border-gray-200 dark:border-border-dark hover:shadow-xl transition-shadow duration-300">
            <h2 className="flex items-center text-xl font-semibold mb-4">
              <ChartBarIcon className="w-6 h-6 mr-2 text-accent" /> Mistake Frequency
            </h2>
            <div className="h-48"> {/* Set height for consistency */}
              <Bar data={mistakeFrequencyData} options={chartOptions} />
            </div>
          </div>

          {/* Suggestion Rate Card */}
          <div className="p-6 bg-white dark:bg-secondary-dark rounded-xl shadow-md border border-gray-200 dark:border-border-dark hover:shadow-xl transition-shadow duration-300 flex-grow flex flex-col">
            <h2 className="flex items-center text-xl font-semibold mb-2">
              <ChartPieIcon className="w-6 h-6 mr-2 text-green-500" /> Suggestion Acceptance
            </h2>
            <div className="flex-grow flex items-center justify-center">
              <p className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                {suggestionAcceptanceRate}%
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;