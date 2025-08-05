import axios from 'axios';

// Mock fetching dashboard data
export const getDashboardData = async (token) => {
  console.log('Fetching dashboard data with token:', token);
  // In a real app, you would send the token in the Authorization header:
  // const { data } = await axios.get('/api/dashboard', { headers: { Authorization: `Bearer ${token}` } });
  // return data;

  // Return random data for mock purposes
  return Promise.resolve({
    mistakeFrequency: {
      labels: ['Missing Base Case', 'Off-by-one Loop', 'Infinite Loop', 'Wrong Edge-Case', 'TLE'],
      data: [32, 25, 18, 12, 8],
    },
    progressOverTime: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      data: [15, 12, 10, 7, 4],
    },
    suggestionAcceptanceRate: Math.floor(Math.random() * (85 - 50 + 1)) + 50, // Random %
  });
};