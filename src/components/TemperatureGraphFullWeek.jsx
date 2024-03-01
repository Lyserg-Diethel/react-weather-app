import React from "react";
import {useState, useEffect} from 'react';

function TemperatureGraph(props) {

    
    //Saving this just in case I wanna implement a graph where the whole week is visible in one graph.

    // const minMaxGraph = 
    //     <div className="tempGraph graph" style={{before: {content:"A"}}}>
    //         <div className="minTemp">{props.hourlyData.minTemp} {props.cityWeatherData.current_units.temperature_2m}</div>
    //         <div className="maxTemp">{props.hourlyData.maxTemp} {props.cityWeatherData.current_units.temperature_2m}</div>
    //         {
    //             props.hourlyData.temperature_2m.map((single, index) => {
    //                 const heightPercent = `${calculatePercentageInRange(props.hourlyData.minTemp, single, props.hourlyData.maxTemp)}%`;
    //                 const backgroundColour = getTempRangeColour(single);
                    
    //                 return (
    //                     <span 
    //                         key={`tempGraph-${index}`}
    //                         className="slice"
    //                         title={`${single} ` + props.cityWeatherData.current_units.temperature_2m}
    //                         style={{height: heightPercent, backgroundColor: backgroundColour}}>
    //                     </span>
    //                 )
                        
    //             })
    //         }
    //     </div>
}


export default TemperatureGraph;
