import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DataGraph = ({ values, text }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;
    if (!values || values.length === 0) return;
    const labels = values.map((values) => values.date).reverse();
    const data = values.map((values) => values.aqi).reverse();
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance) {
      chartInstance.destroy();
    }
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "AQI",
            data: data,
            backgroundColor: "#ecfeff",
            borderColor: "",
            borderWidth: 0,
            barThickness: 20,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "white",
            },
          },
          x: {
            ticks: {
              color: "white",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
      },
    });
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [values]);

  return (
    <div className="bg-slate-900 rounded-xl md:mt-6 md:p-12 md:py-10 md:mb-0 p-5 md:block hidden">
      <div className="text-2xl md:mb-4 mb-4 md:text-center text-center text-slate-200">
        {text}
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DataGraph;
