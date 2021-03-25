import React, { useState, useEffect } from 'react'
import ShowCountry from './ShowCountry'

const Display = ({ countries }) => {
    const [clickTarget, setClickTarget] = useState()

    const handleClick = (target) => {
        setClickTarget(countries.filter(country => country.name === target))
    }

    const showCountries = clickTarget ? clickTarget : countries

    useEffect(() => setClickTarget(countries), [countries])
    
    if (showCountries.length === 1) {
        return (
            <ShowCountry 
                country={showCountries[0]}
            />
        )
    } else if (showCountries.length <= 10) {
        return (
            <ul>
                {showCountries.map(country => 
                    <li key={country.alpha2Code}>
                        {country.name}
                        <button onClick={() => handleClick(country.name)}>
                            show
                        </button>
                    </li>
            )}
            </ul>
        )
    } else {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
}

export default Display