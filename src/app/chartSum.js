"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartSum() {

   const [data, setData] = useState({});
  // const [dates, setDates] = useState([]);
  // const [cases, setCases] = useState([]);

  //reusable fetch function
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const CovidDataSums = 'https://disease.sh/v3/covid-19/all';

    fetchData(CovidDataSums)
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
   
  }, []);

  // console.log(targetDates);
  // console.log(selectedCases);
 
  //Apexchart data options
  const chartData = {
    options: {
    },
    series: [
    ],
   
  };
  
  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        width="500"
      />
      <h1>Statistics Today </h1>
      <h3>Cases Today: {data.todayCases}</h3>
      <h3>Deaths Today: {data.todayDeaths}</h3>
      <h3>Recovered Today: {data.todayRecovered}</h3>
    </div>
  );
}
