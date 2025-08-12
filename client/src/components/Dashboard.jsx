import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

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

const Dashboard = () => {
  // State for chart data
  const [mistakeFrequencyData, setMistakeFrequencyData] = useState(null);
  const [progressOverTimeData, setProgressOverTimeData] = useState(null);
  const [suggestionAcceptanceRate, setSuggestionAcceptanceRate] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        // This is a placeholder for a real stats endpoint.
        // For now, we generate random data.
        // const response = await axios.get('http://localhost:8000/services/stats/', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const stats = response.data;

        // --- MOCK DATA GENERATION ---
        // In a real app, you would process `stats` here.
        const mockMistakeLabels = ['Base Case', 'Off-by-one', 'Null Pointer', 'Logic', 'API Misuse'];
        setMistakeFrequencyData({
          labels: mockMistakeLabels,
          datasets: [
            {
              label: 'Errors',
              data: Array.from({ length: mockMistakeLabels.length }, () => Math.floor(Math.random() * 20) + 1),
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1,
              borderRadius: 5,
            },
          ],
        });

        const mockProgressLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
        setProgressOverTimeData({
          labels: mockProgressLabels,
          datasets: [
            {
              label: 'Issues',
              data: Array.from({ length: mockProgressLabels.length }, () => Math.floor(Math.random() * 10) + 1),
              fill: true,
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 1)',
              tension: 0.4,
            },
          ],
        });

        setSuggestionAcceptanceRate(Math.floor(Math.random() * 100) + 1);

      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);


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
    maintainAspectRatio: false,
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
        {/* Main Chart Card */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 p-6 bg-white dark:bg-secondary-dark rounded-xl shadow-md border border-gray-200 dark:border-border-dark hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="flex items-center text-xl font-semibold mb-4">
            <PresentationChartLineIcon className="w-6 h-6 mr-2 text-red-500" /> Progress Over Time
          </h2>
          <div className="h-96">
            {progressOverTimeData ? <Line data={progressOverTimeData} options={chartOptions} /> : <p>Loading chart...</p>}
          </div>
        </motion.div>

        {/* Side Cards */}
        <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-6">
          {/* Mistake Frequency Card */}
          <div className="p-6 bg-white dark:bg-secondary-dark rounded-xl shadow-md border border-gray-200 dark:border-border-dark hover:shadow-xl transition-shadow duration-300">
            <h2 className="flex items-center text-xl font-semibold mb-4">
              <ChartBarIcon className="w-6 h-6 mr-2 text-accent" /> Mistake Frequency
            </h2>
            <div className="h-48">
              {mistakeFrequencyData ? <Bar data={mistakeFrequencyData} options={chartOptions} /> : <p>Loading chart...</p>}
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