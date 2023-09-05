"use client";
import React, { useState, useEffect } from "react";

export default function Weather() {
  const [data, setData] = useState({ daily: {} }); // Initialize data with an empty daily object

  // Reusable fetch function
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setData(responseData); // Update the entire data object
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const CovidDataPerDay =
      "https://api.open-meteo.com/v1/forecast?latitude=37.9838&longitude=23.7278&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum&timezone=auto";

    // Use the fetchData function to make the fetch request
    fetchData(CovidDataPerDay);
  }, []);

  //console.log(data);

  // Check if data.daily.temperature_2m_max, data.daily.temperature_2m_min, and data.daily.time are available
  const maxTemperatures = data.daily.temperature_2m_max || [];
  const minTemperatures = data.daily.temperature_2m_min || [];
  const tempDays = data.daily.time || [];

  // Function to format the date as "Tuesday 5/9"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[date.getUTCDay()];
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const dayOfMonth = date.getUTCDate();
    return `${dayOfWeek} ${dayOfMonth}/${month}`;
  };

  return (
    <div className='rounded-md bg-slate-200 m-4 shadow-lg'>
      {maxTemperatures.map((maxTemp, index) => (
        <li className='list-none p-4 flex items-center justify-between' key={index}>
          <div>
            <p className="font-light">
              {formatDate(tempDays[index])}: {minTemperatures[index]}°C - {maxTemp}°C
            </p>
          </div>
        </li>
      ))}
    </div>
  );
}
