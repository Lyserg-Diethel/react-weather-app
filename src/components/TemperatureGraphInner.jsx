import React from "react";
import { useState, useEffect } from 'react';

function TemperatureGraphInner(props) {
    const [selectedSlice, setSelectedSlice] = useState(null);

    function handleSliceClick(dayIndex, sliceIndex) {
        const day = props.dataByWeekDay[dayIndex];

        setSelectedSlice({
            temp: day.temp[sliceIndex],
            humidity: day.humidity[sliceIndex],
            windSpeed: day.windSpeed[sliceIndex],
            time: day.hours[sliceIndex],
            sliceIndex: sliceIndex
        })
    }

    function calculatePercentageInRange(min, single, max) {
        // Ensure x is the minimum value and z is the maximum value
        if (min > max) {
            let temp = min;
            min = max;
            max = temp;
        }

        // Calculate the range between x and z
        let range = max - min;

        // Calculate the distance between y and min
        let distanceFromMin = single - min;

        // Calculate the percentage
        let percentage = (distanceFromMin / range) * 100;

        // Ensure the percentage is within [0, 100] range
        percentage = Math.max(0, Math.min(percentage, 100));

        return percentage.toFixed(2);
    }

    function getTempRangeColour(temperature) {
        let temperatureColour = "#555";

        if (props.cityWeatherData.current_units.temperature_2m === "°C") {
            if (temperature < -10) {
                temperatureColour = "#339"
            } else if (temperature < 0) {
                temperatureColour = "#559"
            } else if (temperature < 10) {
                temperatureColour = "#557"
            } else if (temperature < 20) {
                temperatureColour = "#575"
            } else if (temperature < 30) {
                temperatureColour = "#775"
            } else if (temperature < 40) {
                temperatureColour = "#755"
            } else if (temperature >= 50) {
                temperatureColour = "#955"
            }

            return temperatureColour;
        }
    }


    //Generate graph slices.
    props.dataByWeekDay.map((day, dayIndex) => {
        day.slices = day.temp.map((temperature, sliceIndex) => {
            const heightPercent = `${calculatePercentageInRange(props.hourlyData.minTemp, temperature, props.hourlyData.maxTemp)}%`;
            const backgroundColour = getTempRangeColour(temperature);
            const sliceTime = new Date(day.hours[sliceIndex])
            const currentTime = props.currentTime;
            const isSelected = selectedSlice && (sliceIndex === selectedSlice.sliceIndex);
            const isCurrentTimeSlice = currentTime.getHours() === sliceTime.getHours() && currentTime.getDate() === sliceTime.getDate();


            return <span
                key={`tempGraph-slice-${dayIndex}-${sliceIndex}`}
                className={`slice${isSelected ? " selected" : ""} ${isCurrentTimeSlice && " currentTime"}`}
                onClick={() => {handleSliceClick(dayIndex, sliceIndex)}}
                title={`${temperature} ` + props.cityWeatherData.current_units.temperature_2m}
                style={{ height: heightPercent, backgroundColor: backgroundColour }}>
            </span>
        })
    });
        const utcDate = new Date(`${props.dayData.hours[0]}:00.817Z`)
        const dateString = utcDate.toGMTString().match(/.+\d{4}/)[0];

        return <>
            <div key={`tempGraph-${props.index}`} className="tempGraph graph" style={{ before: { content: "A" } }}>
                <div className="dayLabel">{dateString}</div>
                <div className="minTemp">{Math.min(...props.dayData.temp)} {props.cityWeatherData.current_units.temperature_2m}</div>
                <div className="maxTemp">{Math.max(...props.dayData.temp)} {props.cityWeatherData.current_units.temperature_2m}</div>
                <div className="selectedSliceInfo">{selectedSlice ? selectedSlice.temp : ""} {selectedSlice ? props.cityWeatherData.current_units.temperature_2m : ""}</div>

                {props.dayData.slices}
            </div>
        </>
}

export default TemperatureGraphInner;
