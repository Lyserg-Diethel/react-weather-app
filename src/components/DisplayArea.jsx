import React from 'react';
import {useState} from 'react';
import weatherCodes from '../data/weather_codes';
import TemperatureGraphs from './TemperatureGraphs';

function DisplayArea(props) {

const [viewMode, setViewMode] = useState("current");
const [metricMode, setMetricMode] = useState("temperature_2m");


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

            { viewMode === "weekly" && 
                <>
                    <div className="metricModeButtons">
                        <button className={`metricModeButton ${metricMode === "temperature_2m" ? "selected" : ""}`} onClick={()=>{setMetricMode("temperature_2m")}} title="Temperature">🌡️</button>
                        <button className={`metricModeButton ${metricMode === "wind_speed_10m" ? "selected" : ""}`} onClick={()=>{setMetricMode("wind_speed_10m")}} title="Wind">💨</button>
                        <button className={`metricModeButton ${metricMode === "relative_humidity_2m" ? "selected" : ""}`} onClick={()=>{setMetricMode("relative_humidity_2m")}} title="Humidity">💧</button>
                    </div>
                    <TemperatureGraphs cityWeatherData={props.cityWeatherData} hourlyData={props.hourlyData} currentTime={currentTime} metricMode={metricMode} />
                </>
            }
        </>
    )
}

export default DisplayArea;