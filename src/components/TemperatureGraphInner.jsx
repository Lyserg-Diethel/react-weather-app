import React from "react";
import { useState, useEffect } from 'react';
import weatherCodes from '../data/weather_codes';

function TemperatureGraphInner(props) {
    const [selectedSlice, setSelectedSlice] = useState(null);
    //Current supported modes are "relative_humidity_2m", "temperature_2m" and "wind_speed_10m".
    const modes = {
        relative_humidity_2m: "relative_humidity_2m",
        temperature_2m: "temperature_2m",
        wind_speed_10m: "wind_speed_10m",
    }

    useEffect(function(){
        return () => {setSelectedSlice(null);}
    }, [props.cityWeatherData, props.metricMode]);

    function handleSliceClick(dayIndex, sliceIndex) {
        const day = props.dataByWeekDay[dayIndex];

        setSelectedSlice({
            temperature_2m: day.temperature_2m[sliceIndex],
            relative_humidity_2m: day.relative_humidity_2m[sliceIndex],
            wind_speed_10m: day.wind_speed_10m[sliceIndex],
            weather_code: day.weather_code[sliceIndex],
            time: day.hours[sliceIndex],
            sliceIndex: sliceIndex
        })
    }

    function calculatePercentageInRange(min, single, max) {
        // Ensure min is the minimum value and max is the maximum value
        if (min > max) {
            let temp = min;
            min = max;
            max = temp;
        }

        // Calculate the range between min and max
        let range = max - min;

        // Calculate the distance between X and min
        let distanceFromMin = single - min;

        // Calculate the percentage
        let percentage = (distanceFromMin / range) * 100;

        // Ensure the percentage is within [0, 100] range
        percentage = Math.max(0, Math.min(percentage, 100));

        return percentage.toFixed(2);
    }

    function getRangeColour(metricValue) {
        let metricColour = "#555";

        if (props.metricMode === modes.temperature_2m && props.cityWeatherData.current_units.temperature_2m === "°C") {
            if (metricValue < -10) {
                metricColour = "#339"
            } else if (metricValue < 0) {
                metricColour = "#559"
            } else if (metricValue < 10) {
                metricColour = "#557"
            } else if (metricValue < 20) {
                metricColour = "#575"
            } else if (metricValue < 30) {
                metricColour = "#775"
            } else if (metricValue < 40) {
                metricColour = "#755"
            } else if (metricValue >= 40) {
                metricColour = "#955"
            }
        } else if (props.metricMode === modes.relative_humidity_2m) {
            if (metricValue < 5) {
                metricColour = "#339"
            } else if (metricValue < 20) {
                metricColour = "#559"
            } else if (metricValue < 30) {
                metricColour = "#557"
            } else if (metricValue < 60) {
                metricColour = "#575"
            } else if (metricValue < 70) {
                metricColour = "#775"
            } else if (metricValue < 80) {
                metricColour = "#755"
            } else if (metricValue >= 80) {
                metricColour = "#955"
            }
        }  else if (props.metricMode === modes.wind_speed_10m) {
            if (metricValue < 5) {
                metricColour = "#339"
            } else if (metricValue < 11) {
                metricColour = "#559"
            } else if (metricValue < 19) {
                metricColour = "#557"
            } else if (metricValue < 28) {
                metricColour = "#575"
            } else if (metricValue < 49) {
                metricColour = "#775"
            } else if (metricValue < 74) {
                metricColour = "#755"
            } else if (metricValue >= 75) {
                metricColour = "#955"
            }
        }
        return metricColour;
    }


    //Generate graph slices.
    props.dataByWeekDay.map((day, dayIndex) => {
        day.slices = day[props.metricMode].map((metricUnit, sliceIndex) => {
            let minMetricName, maxMetricName;
            minMetricName = `min_${props.metricMode}`;
            maxMetricName= `max_${props.metricMode}`;

            const heightPercent = `${calculatePercentageInRange(props.hourlyData[minMetricName], metricUnit, props.hourlyData[maxMetricName])}%`;
            const backgroundColour = getRangeColour(metricUnit);
            const sliceTime = new Date(day.hours[sliceIndex])
            const currentTime = props.currentTime;
            const isSelected = selectedSlice && (sliceIndex === selectedSlice.sliceIndex);
            const isCurrentTimeSlice = currentTime.getHours() === sliceTime.getHours() && currentTime.getDate() === sliceTime.getDate();
            const sliceWeatherCode = day.weather_code[sliceIndex];
            const sliceWeatherIcon = `./assets/icons/wi-day-${sliceWeatherCode}.svg`
            const badWeatherFound = [0, 1, 2, 3].indexOf(sliceWeatherCode) === -1;

            return <span
                    key={`metricGraph-slice-${dayIndex}-${sliceIndex}`}
                    className={`slice${isSelected ? " selected" : ""} ${isCurrentTimeSlice && " currentTime"} ${badWeatherFound ? " badWeather" : ""}`}
                    onClick={() => {handleSliceClick(dayIndex, sliceIndex)}}
                    title={`${metricUnit} ` + props.cityWeatherData.current_units[props.metricMode]}
                    style={{ height: heightPercent, backgroundColor: backgroundColour }}
                    >
                    <img 
                        src={sliceWeatherIcon}
                        alt={`${weatherCodes[sliceWeatherCode]}`}
                        title={`${weatherCodes[sliceWeatherCode]}`}
                        style={{backgroundColor: backgroundColour }}
                        />
                </span>
        })
    });
        const utcDate = new Date(`${props.dayData.hours[0]}:00.817Z`)
        const dateString = utcDate.toGMTString().match(/.+\d{4}/)[0];

        return <>
            <div key={`metricGraph-${props.index}`} className="metricGraph graph" style={{ before: { content: "A" } }}>
                <div className="dayLabel">{dateString}</div>
                <div className="minMetric">{props.minMetric} {props.cityWeatherData.current_units[props.metricMode]}</div>
                <div className="maxMetric">{props.maxMetric} {props.cityWeatherData.current_units[props.metricMode]}</div>
                <div className="selectedSliceInfo">{selectedSlice ? selectedSlice[props.metricMode] : ""} {selectedSlice ? props.cityWeatherData.current_units[props.metricMode] : ""}</div>
                <div className="selectedSliceWeatherStatus">{selectedSlice ? `${weatherCodes[selectedSlice.weather_code]}` : ""}</div>

                {props.dayData.slices}
            </div>
        </>
}

export default TemperatureGraphInner;
