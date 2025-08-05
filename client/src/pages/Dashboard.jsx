import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDashboardData } from '../api/dashboard';
import Header from '../components/layout/Header';
import Spinner from '../components/common/Spinner';
import MistakeFrequencyChart from '../components/charts/MistakeFrequencyChart';
import ProgressOverTimeChart from '../components/charts/ProgressOverTimeChart';
import SuggestionAcceptanceRate from '../components/charts/SuggestionAcceptanceRate';

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const dashboardData = await getDashboardData(token);
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen"><Spinner /></div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Analytics Dashboard
        </motion.h1>
        {data ? (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="lg:col-span-2 h-96 bg-card dark:bg-dark-card p-4 rounded-xl shadow-lg" variants={itemVariants}>
              <MistakeFrequencyChart chartData={data.mistakeFrequency} />
            </motion.div>
            <motion.div className="lg:col-span-2 h-96 bg-card dark:bg-dark-card p-4 rounded-xl shadow-lg" variants={itemVariants}>
              <ProgressOverTimeChart chartData={data.progressOverTime} />
            </motion.div>
            <motion.div className="lg:col-span-1 h-96 bg-card dark:bg-dark-card p-4 rounded-xl shadow-lg flex items-center justify-center" variants={itemVariants}>
              <SuggestionAcceptanceRate rate={data.suggestionAcceptanceRate} />
            </motion.div>
          </motion.div>
        ) : (
          <p className="text-center text-red-500">Could not load dashboard data.</p>
        )}
      </main>
    </>
  );
};

export default DashboardPage;