import React from 'react';

function DisplayArea(props) {

const tempRange = props.hourlyData.tempRange
    const minMaxGraph = 
        <div className="tempGraph graph">
            {
                props.hourlyData.temperature_2m.map((single, index) => {
                    const heightPercent = `${((Math.abs(single)*100)/Math.abs(tempRange)).toFixed(2)}%`; //Defective with negative temps.
                    return <span key={`tempGraph-${index}`} className="slice" style={{height: heightPercent}}></span>
                })
            }
        
        </div>
    return (
        <>
            <div className="displayArea">
                <img className="weatherIcon" src="src/assets/wi-day-sunny.svg" alt="" />
                <div className="weatherText">Mostly clear</div>
                <div className="temperature">{`${props.cityWeatherData.current.temperature_2m}${props.cityWeatherData.current.temperature_2m}`}</div>
                <div className="windSpeed"> {`${props.cityWeatherData.current.wind_speed_10m}${props.cityWeatherData.current.wind_speed_10m}`} km/h</div>
                <div className="localTime"> 2 AM</div>
            </div>
            {minMaxGraph}
        </>
    )
}

export default DisplayArea;