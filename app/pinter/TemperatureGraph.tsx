"use-client";
import React, { Suspense, useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TimeScale,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { getGraphTemperatureData } from "../lib/pinterInfo";

interface Props {
  startDate?: string;
  brewingDays?: number;
}

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);
import "chartjs-adapter-moment";

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Temperatures",
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "DD MMM YYYY HH:mm",
      },
      title: {
        display: true,
        text: "Time",
      },
    },
    y: {
      ticks: {
        // forces step size to be 50 units
        stepSize: 0.5,
      },
      suggestedMin: 16,
      suggestedMax: 20,

      display: true,
      title: {
        display: true,
        text: "Temperatire °C",
      },
    },
  },
};

const TemperatureGraph = (props: Props) => {
  const [graphTemperatureData, setgraphTemperatureData] =
    useState<ChartData<"line">>();

  useEffect(() => {
    if (props.startDate && props.brewingDays) {
      getGraphTemperatureData(props.startDate, props.brewingDays).then(
        (res) => {
          const tempDataResult = {
            labels: res.map((row: { date_time: string }) => row.date_time),
            datasets: [
              {
                label: "Temperatures",
                data: res.map((row: { temp: string }) => row.temp),
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          };

          setgraphTemperatureData(tempDataResult);
        }
      );
    }
  }, [props.startDate, props.brewingDays]);

  return (
    <>
      {graphTemperatureData ? (
        <Line data={graphTemperatureData} options={options} />
      ) : (
        <>Loading chart...</>
      )}
    </>
  );
};

export default TemperatureGraph;
