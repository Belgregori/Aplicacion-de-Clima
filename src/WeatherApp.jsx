import './weatherApp.css'
import { useState } from 'react'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'api key'
    const difKelvin = 273.15 //para obtener grados celcious debemos restar este numero a los grados Kelvin 

    const fetchWeather  = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            console.log(data)
            setWeatherData(data)
        }catch(err){
            console.log('Ha habido un error', err)
        }
    }

        
    const handleCityChange = (e) => {
        setCity(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        fetchWeather()
    }


    return (
        <>
            <div className="container">
                <h1>Aplicacion de Clima</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Ciudad"
                        value={city}
                        onChange={handleCityChange} />
                    <button type="submit ">Buscar</button>
                </form>

              {weatherData && (
                  <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                     <p>La temperatura actual es de: {Math.floor(weatherData.main.temp - difKelvin)}°C </p>
                      <p>La condicion meteorologia es : {weatherData.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                     alt={weatherData.weather[0].description}
                     />
                  </div>

              )}

            </div>
        </>
    )
}
