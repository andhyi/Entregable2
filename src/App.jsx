import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'
import LoadingScreen from './components/LoadingScreen'

function App() {
  
  const [coords, setCoords] = useState()
  
  useEffect(() => {
    const success = pos => {
      console.log(pos)
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }

    navigator.geolocation.getCurrentPosition(success)

  } ,[])
  
console.log(coords)

  return (
    <div className="App">
                
      <CardWeather lon={coords?.lon} lat={coords?.lat} />

    </div>
  )
}

export default App
