import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale, // For category scale
  LinearScale, // For linear scale
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceChartProps {
  labels: string[];
  data: number[];
  visibleHours: number;
}

const PriceChart: React.FC<PriceChartProps> = ({
  labels,
  data,
  visibleHours,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Price",
        data,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${visibleHours}h Price Chart`,
      },
    },
    scales: {
      x: {
        type: "category" as const,
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PriceChart;
