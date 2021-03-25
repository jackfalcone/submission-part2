import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const searchResults = countries.filter(country => 
    country.name.toLowerCase().indexOf(
      filter.toLowerCase()
      ) !== -1
    )
  
  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Display countries={searchResults} />
    </div>
  )
}

export default App;
