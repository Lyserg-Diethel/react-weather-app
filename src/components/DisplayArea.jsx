import React from 'react';
import {useState} from 'react';
import weatherCodes from '../data/weather_codes';
import TemperatureGraphs from './TemperatureGraphs';

function DisplayArea(props) {

const [viewMode, setViewMode] = useState("current");

    const weatherCode = props.cityWeatherData.current.weather_code;
    const weatherCodeText = weatherCodes[weatherCode];
    const weatherCodeImage = `./assets/icons/wi-day-${props.cityWeatherData.current.weather_code}.svg`;
    const currentTemp = props.cityWeatherData.current.temperature_2m;
    const currentTempUnit = props.cityWeatherData.current_units.temperature_2m;
    const currentWindSpeed = props.cityWeatherData.current.wind_speed_10m;
    const currentWindSpeedUnit = props.cityWeatherData.current_units.wind_speed_10m;
    const currentTime = new Date(props.cityWeatherData.current.time);

    function handleViewOption(option) {
        setViewMode(option);
    }


    return (
        <>
            <div className="viewMenu">
                {<button className={`currentOption ${viewMode === "current" ? "selected" : ""}`} onClick={() => {handleViewOption("current")}}>Current</button>}
                {<button className={`weeklyOption ${viewMode === "weekly" ? "selected" : ""}`} onClick={() => {handleViewOption("weekly")}}>Week view</button>}
            </div>
            {viewMode === "current" && 
            <div className="displayArea">
                <div className="weatherIconContainer">
                    {<img className="weatherIcon" src={weatherCodeImage} alt="" />}
                </div>
                <div className="today">
                    <div className="weatherText">{`Weather: ${weatherCodeText}`}</div>
                    <div className="temperature">{`🌡️Temperature: ${currentTemp}${currentTempUnit}`}</div>
                    <div className="windSpeed"> {`💨 Wind speed: ${currentWindSpeed}${currentWindSpeedUnit}`}</div>
                </div>
            </div>
            }

            { viewMode === "weekly" && <TemperatureGraphs cityWeatherData={props.cityWeatherData} hourlyData={props.hourlyData} currentTime={currentTime}/>}
        </>
    )
}

export default DisplayArea;