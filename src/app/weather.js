"use client";
import React, { useState, useEffect } from "react";

export default function Weather() {
  const [data, setData] = useState({ daily: {} });

  //Weather messages based on WMO codes in the API response
  const weatherMessages = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle (Light)",
    53: "Drizzle (Moderate)",
    55: "Drizzle (Dense)",
    56: "Freezing Drizzle (Light)",
    57: "Freezing Drizzle (Dense)",
    61: "Rain (Slight)",
    63: "Rain (Moderate)",
    65: "Rain (Heavy)",
    66: "Freezing Rain (Light)",
    67: "Freezing Rain (Heavy)",
    71: "Snowfall (Slight)",
    73: "Snowfall (Moderate)",
    75: "Snowfall (Heavy)",
    77: "Snow grains",
    80: "Rain Showers (Slight)",
    81: "Rain Showers (Moderate)",
    82: "Rain Showers (Violent)",
    85: "Snow Showers (Slight)",
    86: "Snow Showers (Heavy)",
    95: "Thunderstorm (Slight)",
    96: "Thunderstorm with Hail (Slight)",
    99: "Thunderstorm with Hail (Heavy)",
  };

  //Reusable fetch function
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const weatherDataUrl = "https://api.open-meteo.com/v1/forecast?latitude=37.9838&longitude=23.7278&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&timezone=auto";
    fetchData(weatherDataUrl);
  }, []);

  const maxTemperatures = data.daily.temperature_2m_max || [];
  const minTemperatures = data.daily.temperature_2m_min || [];
  const tempDays = data.daily.time || [];
  const weatherCodes = data.daily.weathercode || [];

  //Format date from API response
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[date.getUTCDay()];
    const month = date.getUTCMonth() + 1;
    const dayOfMonth = date.getUTCDate();
    return `${dayOfWeek} ${dayOfMonth}/${month}`;
  };

  return (
    <div className="rounded-md bg-zinc-50 m-4 shadow-lg">
  {maxTemperatures.map((maxTemp, index) => (
    <div className="p-4 flex justify-between items-center" key={index}>
      <div>
        <p className="font-medium">
          {formatDate(tempDays[index])}:
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">
          {minTemperatures[index]}°C - {maxTemp}°C
        </p>
        <p className="font-light">
          {weatherMessages[weatherCodes[index]]}
        </p>
      </div>
    </div>
  ))}
</div>

  );
}
