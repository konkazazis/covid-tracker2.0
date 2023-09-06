"use client";
import React, { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';

export default function Map() {
  const [data, setData] = useState({});

  // Reusable fetch function
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
    const allCountriesDataUrl = "https://disease.sh/v3/covid-19/countries";
    fetchData(allCountriesDataUrl);
  }, []);

  console.log(data);

  return (
    <div className='container'>
      
    </div>
  );
}
