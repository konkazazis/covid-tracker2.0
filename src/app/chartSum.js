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
      chart: {
        type: 'donut',
      },
      labels: ['Cases', 'Deaths', 'Recovered'], 
    },
    series: [data.cases, data.deaths, data.recovered], // Set series data outside of the 'options' object
  };
  
  
  return (
    <div>
      <div className='rounded-md bg-zinc-50 w-[450px] m-4 shadow-lg'>
        <div className='p-4 text-center'>
          <h1 className="mb-4 font-light">Covid-19 Cases/Deaths/Recovered Worldwide</h1>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type='donut'
            width={"350"}
          />
        </div>
      </div>
      <div className='rounded-md bg-zinc-50 w-[450px] m-4 shadow-lg'>
        <div className='p-6'>
          <h1 className='text-3xl font-semibold mb-4'>Statistics Today </h1>
          <h3>Cases Today: {data.todayCases}</h3>
          <h3>Deaths Today: {data.todayDeaths}</h3>
          <h3>Recovered Today: {data.todayRecovered}</h3>
        </div>
      </div>
      
    </div>
  );
}
