import React from 'react';
import { motion } from 'framer-motion';
import { LightBulbIcon, ChartBarIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: <CodeBracketSquareIcon className="h-8 w-8 text-white" />,
    title: "AI-Powered Code Analysis",
    description: "Submit your code in Python, C++, Java, and more to receive instant, AI-driven feedback on logic, style, and potential bugs."
  },
  {
    icon: <ChartBarIcon className="h-8 w-8 text-white" />,
    title: "Track Your Progress",
    description: "Visualize your improvement over time with personalized dashboards tracking common errors and submission quality."
  },
  {
    icon: <LightBulbIcon className="h-8 w-8 text-white" />,
    title: "Learn and Improve",
    description: "Understand your mistakes, not just fix them. Our platform helps you learn the 'why' behind the errors to build better coding habits."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ProjectDescription = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary to-indigo-700 p-8 md:p-12 text-white flex flex-col justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          variants={itemVariants}
        >
          CodeAnalytics
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-indigo-200 mb-10"
          variants={itemVariants}
        >
          Analyze. Improve. Excel. Transform your code and accelerate your learning journey.
        </motion.p>
        
        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div key={index} className="flex items-start space-x-4" variants={itemVariants}>
              <div className="flex-shrink-0 bg-white/10 p-3 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-indigo-200 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDescription;