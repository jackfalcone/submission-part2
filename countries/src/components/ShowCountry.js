import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const WeatherImg = ({ src }) => {
    if (src !== 'http://openweathermap.org/img/wn/@2x.png') {
        return (
            <div>
                <img src={src} alt="Weather Icon" />
            </div>
        )
    } else {
        return (
            <div>
                <p>No Weather Icon</p>
            </div>
        )
    }
}

const ShowCountry = ({ country }) => {
    const [weather, setWeather] = useState({
        main: {
            temp: ''
        }, 
        wind: {
            speed: '',
            deg: '',
        },
        weather: [
            {
                icon: ''
            }
        ]
    })
    const [weatherImgUrl, setWeatherImgUrl] = useState('')
    
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apiKey}`)
        .then(response => {
            setWeather(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [country])

    useEffect(() => {
            setWeatherImgUrl(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
    }, [weather.weather])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.iso639_1}>{language.name}</li>
                )}
            </ul>
            <img src={country.flag} width="120" alt="Flag" />
            <h2>Weather in {country.capital}</h2>
            <div>
                <strong>Temperature:</strong> {weather.main.temp} &#8451;
            </div>
            <WeatherImg src={weatherImgUrl} />
            <div>
                <strong>Wind:</strong> {weather.wind.speed} m/s direction {weather.wind.deg} &#176;
            </div>
        </div>
    )
}

export default ShowCountry