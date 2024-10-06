
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data }) => {
  const pieData = {
    labels: ['Cases', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'COVID-19 Data',
        data: data,
        backgroundColor: ['#f39c12', '#2ecc71', '#e74c3c'],
        hoverBackgroundColor: ['#f1c40f', '#27ae60', '#c0392b'],
      },
    ],
  };

  return (
    <div>
      <h3>COVID-19 Data Distribution</h3>
      <Pie data={pieData} width={300} height={300} />
    </div>
  );
};

export default PieChartComponent;
