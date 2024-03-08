import React from 'react';
import {useState} from 'react';
import weatherCodes from '../data/weather_codes';

function InputForm(props) {
    const [cityInputValue, setCityInputValue] = useState("")
    const [countryInputValue, setCountryInputValue] = useState("")
    const [weatherCode, setWeatherCode] = useState(null)
    

    function changeCityInputValue(event) {
      setCityInputValue(event.target.value);
    }
  
    function changeCountryInputValue(event) {
      setCountryInputValue(event.target.value);
    }

  async function getCityData() {
    const cityInputValueLowercase = cityInputValue.trim().toLowerCase();
    const countryInputValueLowercase = countryInputValue.trim().toLowerCase();

    const city = props.locations.find(
      cityObject => 
        cityObject.city.toLowerCase() === cityInputValueLowercase &&
        cityObject.country.toLowerCase() === countryInputValueLowercase
      );

    // setCityData(city);
    fetchWeatherDataForCity(city)
  }


  function fetchWeatherDataForCity(city) {
    if (!city) {
      alert("City or country not found! It may be misspelled or might not be in the available dataset.");
      return;
    }
    let latitude = city.lat;
    let longitude = city.lng;
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
        fetch(url)
          .then(res=>res.json())
          .then(res=>{
              const minTemp = Math.min(...res.hourly.temperature_2m)
              const maxTemp = Math.max(...res.hourly.temperature_2m);

              props.setCityWeatherData(res);
              props.setHourlyData(
                {
                  minTemp: minTemp,
                  maxTemp: maxTemp,
                  tempRange: minTemp < 0 ? maxTemp - minTemp : maxTemp,
                  minWindSpeed: Math.min(...res.hourly.wind_speed_10m),
                  maxWindSpeed: Math.max(...res.hourly.wind_speed_10m),
                  temperature_2m: res.hourly.temperature_2m
                }
              )
              props.setCitySelected(true);
              if(res.current) {
                setWeatherCode(weatherCodes[res.current.weather_code])
              }

              return res;
          })
  }

    return (
        <div className="inputForm">
            <div className="inputsContainer">
              <div className="inputWrapper">
                <label htmlFor="cityInput">City:</label>
                <input id="cityInput" type="text" placeholder='City' value={cityInputValue} onChange={changeCityInputValue}/>
              </div>
              <div className="inputWrapper">
                <label htmlFor="countryInput">Country:</label>
                <input id="countryInput" type="text" placeholder='Country' value={countryInputValue} onChange={changeCountryInputValue}/>
              </div>
            </div>
            <button type="button" onClick={getCityData}>Get weather data</button>
        </div>
    )
}

export default InputForm;