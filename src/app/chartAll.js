"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartAll() {
  const [data, setData] = useState({});
  const [dates, setDates] = useState([]);
  const [cases, setCases] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedCases, setSelectedCases] = useState([]);
  const targetDates = ["1/22/20", "12/31/20", "12/31/21", "12/31/22", "3/9/23"];

  //reusable fetch function
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const CovidDataPerDay =
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all";

    // Use the fetchData function to make the fetch request
    fetchData(CovidDataPerDay)
      .then((data) => {
        const dates = Object.keys(data.cases);
        const cases = Object.values(data.cases);

        setData(data);
        setDates(dates);
        setCases(cases);

        const dateIndices = targetDates.map((date) => dates.indexOf(date));
        const selectedCases = dateIndices.map((index) =>
          index !== -1 ? cases[index] : null
        );

        setSelectedDates(targetDates);
        setSelectedCases(selectedCases);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // console.log(targetDates);
  // console.log(selectedCases);

  //Apexchart data options
  const dataSample = {
    options: {
      chart: {
        height: 280,
       
        animations: {
          enabled: true,
          easing: "linear",
          speed: 900,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      xaxis: {
        categories: targetDates,
        title: {
          text: "Date", // Set the label for the x-axis
        },
      },
      yaxis: {
        title: {
          text: "Cases", // Set the label for the y-axis
        },
      },
      stroke: {
        curve: "smooth",
        width: 4, // Adjust the width of the line as needed
        dashArray: 0, // Remove any dashed line style
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
    },
    series: [
      {
        name: "Cases",
        data: selectedCases,
      },
    ],
  };

  return (
    <div  className='rounded-md bg-zinc-50 m-4 shadow-lg' >
      <div className='p-6 text-center'>
        <h1 className="mb-4 font-light">Covid-19 cases across time</h1>
        <Chart
          options={dataSample.options}
          series={dataSample.series}
          type="area"
        />
      </div>
    </div>
  );
}
