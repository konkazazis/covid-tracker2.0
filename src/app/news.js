"use client";
import React, { useState, useEffect } from "react";

export default function News() {
  let [data, setData] = useState({ data: [] }); 
  let [errorCode, setErrorCode] = useState(null); 

  // Reusable fetch function
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text(); 
        const errorCode = `Error Code: ${response.status}.`;
        setErrorCode(errorCode); 
        throw new Error(errorCode); // Throw the error with the error information
      }

      const responseData = await response.json();
      setData(responseData); // Update the entire data object
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorInfo(error.message); // Set the errorInfo state to the error message
    }
  };

  useEffect(() => {
    const CovidDataPerDay =
      "http://api.mediastack.com/v1/news?access_key=760fa3ca53e7df13309a62c5a91dcb2c";
    
    // Use the fetchData function to make the fetch request
    fetchData(CovidDataPerDay);
  }, []);

  console.log(data);

  return (
    <div className='rounded-md bg-slate-200 m-4 shadow-lg'>
      {data.data.length > 0  ? data.data.slice(0, 5).map((newsItem, index) => (
        <li className='list-none p-4 flex items-center justify-between' key={index}>
          <a href={newsItem.url} className='flex items-center'>
            <div>
              <div className="flex items-center"> {/* Wrap h2 and image in a flex container */}
                <h2 className="font-semibold">{newsItem.title}</h2>
                <img className='w-6 ml-2' src='/hyperlink.png' alt="Hyperlink" />
              </div>
              <p className="font-light">{newsItem.description}</p>
            </div>
          </a>
        </li>
      )) : (
        <div className='p-4 text-center'>
          <h1 className="mb-4 font-light">{errorCode ? `Request Failed: ${errorCode}` : "Loading..."}</h1>
        </div>
      )}
    </div>
  );
}
