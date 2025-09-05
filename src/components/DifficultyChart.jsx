import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const DifficultyChart = ({ values }) => {
  const labels = ["easy", "normal", "hard", "not study"];
  const backgroundColors = ["#14B8A6", "#3B82F6", "#F59E0B", "#E5E7EB"];
 const data = {
   datasets: [
     {
       data: values,
       backgroundColor: backgroundColors.map((color) => `${color}7F`),
       borderColor: backgroundColors,
       borderWidth: 1,
     },
   ],
 };
  return (
    <>
      <Doughnut data={data} />
    </>
  );
};

export default DifficultyChart;