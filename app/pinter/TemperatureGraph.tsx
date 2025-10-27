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
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Sales Data",
    },
  },
};

const TemperatureGraph = (props: Props) => {
  const [data2, setData2] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (props.startDate && props.brewingDays) {
      getGraphTemperatureData(props.startDate, props.brewingDays).then(
        (res) => {
          const tempDataResult = {
            //labels: ["January", "February", "March", "April", "May"],
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

          setData2(tempDataResult);
        }
      );
    }
  }, [props.startDate, props.brewingDays]);

  return (
    <>
      <Line data={data2} options={options} />;
    </>
  );
};

export default TemperatureGraph;
