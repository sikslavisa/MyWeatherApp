import React, { useState, useEffect } from 'react';
import axios from 'axios';//test
import './App.css'; // Import custom CSS styles
import backgroundImage from './200w.gif'; // Import the image file

function Weather() {
  // State variables
  const [weatherData, setWeatherData] = useState(null); // Holds weather data
  const [location, setLocation] = useState(''); // Holds the location input
  const [error, setError] = useState(null); // Holds error object if API request fails
  const [loading, setLoading] = useState(false); // Tracks loading state

  useEffect(() => {
    // Fetch weather data when the location changes
    const fetchWeatherData = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=77907df79b1b4b039a5190356231506&q=${location}&days=1&aqi=no&alerts=no`
        );

        setWeatherData(response.data); // Update weather data state with the fetched data
        setError(null); // Reset the error state if the request is successful
      } catch (error) {
        setError(error); // Set error state if API request fails
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false); // Set loading state to false after the API request completes
      }
    };

    if (location) {
      fetchWeatherData(); // Call fetchWeatherData() only if a location is provided
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value); // Update the location state on input change
  };

  return (
    <div className="weather-container">
      <h1 className="weather-title">Weather App</h1> {/* Heading for the Weather App */}
      <div className="input-container">
        <label htmlFor="location" className="input-label">Enter Location:</label> {/* Label for the location input */}
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          placeholder="E.g., Banja Luka, Sarajevo, etc."
          className="input-field"
          aria-label="Location"
        />
      </div>
      {!location && <div className="message">Please enter a location.</div>} {/* Display a message if location is empty */}
      {loading && <div className="message">Loading weather data...</div>} {/* Display loading message while fetching data */}
      {error && <div className="message error">Error fetching weather data: {error.message}</div>} {/* Display error message if API request fails */}
      {weatherData && (
        <div className="weather-data">
          <h2 className="weather-location">Weather for {weatherData.location.name}</h2>
          <h3 className="weather-country">{weatherData.location.country}, {weatherData.location.region}</h3>
          <p className="weather-localtime">Current local time: {new Date(weatherData.location.localtime).toLocaleString()}</p> {/* Format the local time */}
          <p className="weather-temperature">Current temperature: {weatherData.current.temp_c.toFixed(1)}°C</p> {/* Format the temperature */}
          <p className="weather-condition">Current weather: {weatherData.current.condition.text}</p>
        </div>
      )}
      <img src={backgroundImage} alt="Slavisa" className="background-image" /> {/* Display the background image */}
      <p>&copy; 2023 Weather app. All rights reserved.</p>
    </div>
  );
}

export default Weather;  // Exporting the Weather component as the default export
