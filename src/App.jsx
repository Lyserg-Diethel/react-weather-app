import { useState } from 'react'
import locations from './data/locations.js'
import InputForm from './components/InputForm.jsx'
import DisplayArea from './components/DisplayArea.jsx'
import './App.css'

function App() {
  const [citySelected, setCitySelected] = useState(false); //change to false by default
  const [cityWeatherData, setCityWeatherData] = useState({})
  const [hourlyData, setHourlyData] = useState( //Replace with context?
  /** 
   * 
   * Idea: make a design like the Sinoptic one. Looks prettier than mine.
   */
    {
      minTemp: null,
      maxTemp: null,
      minTempToday: null,
      maxTempToday: null,
      minTempTomorrow: null,
      maxTempTomorrow: null,
      tempRange: null,
      minWindSpeed: null,
      maxWindSpeed: null,
      temperature_2m: null
    }
  ); 
  return (
    <>
      <div>
      </div>
      <div className="card">
       <InputForm
          locations={locations}
          setCitySelected={setCitySelected}
          setHourlyData={setHourlyData}
          cityWeatherData={cityWeatherData}
          setCityWeatherData={setCityWeatherData}
          />
       {
        citySelected &&
        <DisplayArea 
          locations={locations}
          hourlyData={hourlyData}
          cityWeatherData={cityWeatherData}
          />}
      </div>
    </>
  )
}

export default App
