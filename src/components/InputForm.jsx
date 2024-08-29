import React from 'react';
import { useState, useEffect } from 'react';

function InputForm(props) {
  const [cityInputValue, setCityInputValue] = useState("")
  const [countryInputValue, setCountryInputValue] = useState("")
  const [sameNameCitiesFound, setSameNameCitiesFound] = useState(null);
  const [selectedAdminRegion, setSelectedAdminRegion] = useState(null);
  const [duplicateCityOptions, setDuplicateCityOptions] = useState([]);

  let duplicateCityOptionsTemp = [];

  useEffect(function () {
    return () => { setSameNameCitiesFound(false); }
  }, [selectedAdminRegion]);

  function changeCityInputValue(event) {
    setCityInputValue(event.target.value);
  }

  function changeCountryInputValue(event) {
    setCountryInputValue(event.target.value);
  }

  function resolveAmbiguousCityChoice(event) {
    setSelectedAdminRegion(event.target.value);
    getCityData();
  }

  function getCityDataAndCleanUp() {
    getCityData();
    setSelectedAdminRegion(null);
  }

  async function getCityData() {
    let city;
    const cityInputValueLowercase = cityInputValue.trim().toLowerCase();
    const countryInputValueLowercase = countryInputValue.trim().toLowerCase();

    const cityArray = props.locations.filter(
      cityObject =>
        cityObject.city.toLowerCase() === cityInputValueLowercase &&
        cityObject.country.toLowerCase() === countryInputValueLowercase &&
        (selectedAdminRegion === null || selectedAdminRegion === cityObject.admin_name)
    );
    if (cityArray.length <= 1) {
      city = cityArray[0]
      fetchWeatherDataForCity(city)
      props.setShouldShowDisplay(true)
    } else {
      setSameNameCitiesFound(true);
      props.setShouldShowDisplay(false)

      cityArray.forEach((option, index) => {
        duplicateCityOptionsTemp.push(<option value={option.admin_name} key={`select-option-${index}`}>{option.admin_name}</option>)
      });

      setDuplicateCityOptions(duplicateCityOptionsTemp);
    }
  }


  function fetchWeatherDataForCity(city) {
    if (!city) {
      alert("City or country not found! It may be misspelled or might not be in the available dataset.");
      return;
    }
    let latitude = city.lat;
    let longitude = city.lng;
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        const min_temperature_2m = Math.min(...res.hourly.temperature_2m)
        const max_temperature_2m = Math.max(...res.hourly.temperature_2m);
        const min_wind_speed_10m = Math.min(...res.hourly.wind_speed_10m)
        const max_wind_speed_10m = Math.max(...res.hourly.wind_speed_10m);
        const min_relative_humidity_2m = Math.min(...res.hourly.relative_humidity_2m)
        const max_relative_humidity_2m = Math.max(...res.hourly.relative_humidity_2m);
        res.current_units.relative_humidity_2m = "%";
        props.setCityWeatherData(res);
        props.setHourlyData(
          {
            min_temperature_2m: min_temperature_2m,
            max_temperature_2m: max_temperature_2m,
            min_wind_speed_10m: min_wind_speed_10m,
            max_wind_speed_10m: max_wind_speed_10m,
            min_relative_humidity_2m: min_relative_humidity_2m,
            max_relative_humidity_2m: max_relative_humidity_2m,
            temperature_2m: res.hourly.temperature_2m,
            relative_humidity_2m: res.hourly.relative_humidity_2m,
            wind_speed_10m: res.hourly.wind_speed_10m,
          }
        )
        props.setCitySelected(true);

        return res;
      })
  }

  return (
    <>
      <div className="inputForm">
        <div className="inputsContainer">
          <div className="inputWrapper">
            <label htmlFor="cityInput">City:</label>
            <input id="cityInput" type="text" placeholder='City' value={cityInputValue} onChange={changeCityInputValue} />
          </div>
          <div className="inputWrapper">
            <label htmlFor="countryInput">Country:</label>
            <input id="countryInput" type="text" placeholder='Country' value={countryInputValue} onChange={changeCountryInputValue} />
          </div>

          {sameNameCitiesFound ?
            <div className="inputWrapper">
              <label htmlFor="Region">Region:</label>
              <select name="Region" onChange={resolveAmbiguousCityChoice}>
                <option key="select-option">Select</option>
                {duplicateCityOptions}
              </select>
            </div>
            :
            <div className="inputWrapper">
            </div>
          }
        </div>
        <button type="button" onClick={getCityDataAndCleanUp}>Get weather data</button>
      </div>
    </>
  )
}

export default InputForm;