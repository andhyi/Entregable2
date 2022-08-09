import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({lon,lat}) => {
  
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelcius, setIsCelcius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if(lon){
        const APIKey = '49ae15f3226edf3af39089dfa3ae7aaa'
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
       axios.get(URL)
        .then(res => {
            setWeather(res.data)
            const temp = {
                celcius:    `${Math.round(res.data.main.temp - 273.15)} ºC`,
                farenheit:  `${Math.round((res.data.main.temp - 273.15) * 9/5 +32)} ºF`
            }
            setTemperature(temp)
            setIsLoading(false)
        })
        .catch(err=>console.log(err))
        }
    }, [lat, lon])
    
    console.log(weather)
 const handleClick = () =>setIsCelcius(!isCelcius)

 if(isLoading){
    return <LoadingScreen/>
 }else{

  return (
    <article>
        <h1 id='title1'>Weather App</h1>
        <h2 id='title2'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
        <div className='contenedor'>
            <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            <div>
                <h3 className='estacion'>&#34;{weather?.weather[0].description}&#34;</h3>
                <ul>
                    <li><span>Win Speed:    </span>{weather?.wind.speed} m/s</li>
                    <li><span>Clouds:   </span>{weather?.clouds.all}%</li>
                    <li><span>Pressure: </span>{weather?.main.pressure} hPa</li>
                </ul>

            </div>
        </div>
        <h2>{isCelcius ? temperature?.celcius : temperature?.farenheit}</h2>
        <button onClick={handleClick}>{isCelcius ? 'Change to ºF' : 'Change to ºC'}</button>
    </article>
  )
}
}
export default CardWeather