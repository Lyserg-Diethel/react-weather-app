import React from "react";
import TemperatureGraphInner from "./TemperatureGraphInner";

function TemperatureGraphs(props) {
    const dataByWeekDay = getDataByWeekDay(props.cityWeatherData.hourly);

    function getDataByWeekDay(hourlyData) {
        const week = [];

        for (let i = 0; i < 7; i++) {
            let day = {
                temperature_2m: [],
                hours: [],
                wind_speed_10m: [],
                relative_humidity_2m: [],
            };

            for (let j = 0; j < 24; j++) {
                day.hours.push(hourlyData.time[j + (i * 24)])
                day.temperature_2m.push(hourlyData.temperature_2m[j + (i * 24)])
                day.wind_speed_10m.push(hourlyData.wind_speed_10m[j + (i * 24)])
                day.relative_humidity_2m.push(hourlyData.relative_humidity_2m[j + (i * 24)])
            }

            week.push(day)
        }

        return week;
    }

    const minMaxGraphs = dataByWeekDay.map((day, index) => {
        return <TemperatureGraphInner
                key={`temp-graph-inner-${index}`}
                dayData={day}
                index={index}
                hourlyData={props.hourlyData}
                cityWeatherData={props.cityWeatherData}
                dataByWeekDay={dataByWeekDay}
                currentTime={props.currentTime}
                metricMode={props.metricMode}
                minMetric={Math.min(...day[props.metricMode])}
                maxMetric={Math.max(...day[props.metricMode])}
            />
        
    })

    return <div className="graphsContainer">
        {minMaxGraphs}
    </div> 
}

export default TemperatureGraphs;
