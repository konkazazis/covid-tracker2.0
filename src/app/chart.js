"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


// fetch('https://disease.sh/v3/covid-19/all')
//   .then(response => {
//     if (response.ok) {
//       return response.json(); // Parse the response data as JSON
//     } else {
//       throw new Error('API request failed');
//     }
//   })
//   .then(data => {
//     // Process the response data here
//     console.log(data); // Example: Logging the data to the console
//   })
//   .catch(error => {
//     // Handle any errors here
//     console.error(error); // Example: Logging the error to the console
//   });



export default function ChartSample() {

  const [data, setData] = useState({});
  const [dates, setDates] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const dates = Object.keys(data.cases);
        const cases = Object.values(data.cases);

        setData(data);
        setDates(dates);
        setCases(cases);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  //console.log(Object.keys(data.cases))

  
  

  const dataSample = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: dates,
      },
    },
    series: [
      {
        name: "series-1",
        data: cases,
      },
    ],
  };

  return (
    <div>
      <Chart
        options={dataSample.options}
        series={dataSample.series}
        type="line"
        width="500"
      />
    </div>
  );
}
