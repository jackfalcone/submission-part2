import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import Title from './components/Title'
import SubTitle from './components/SubTitle'
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const controlName = newName.toUpperCase()
    const controlPersons = persons.map(person => person.name.toUpperCase())
    const indexName = controlPersons.findIndex(name => name === controlName)
    if (indexName === -1) {
      const personObject =  {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage([`Added ${newName}`, 'success'])
          setTimeout(() => {
            setMessage(null)
          }, 5000);
      })
    } else {
     if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
      const id = persons[indexName].id
      const person = persons.find(p => p.id === id)
      const changedPerson = {  ...person, number: newNumber }
      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage([`Changed number for ${newName} to ${newNumber}`, 'success'])
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        .catch(error => {
          setMessage([`Information of ${person.name} has been removed from server`, 'fail'])
          setTimeout(() => {
            setMessage(null)
          }, 5000);
          setPersons(persons.filter(p => p.id !== id))
          setNewName('')
          setNewNumber('')
        }) 
     }
    }
  }

  const removePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
      setPersons(persons.filter(person => person.id !== id))
      setMessage([`${name} has been deleted`, 'success'])
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow  = persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  return (
    <div>
      <Title text="Phonebook" />
      <Notification message={message}/>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <SubTitle text="add a new" />
      <Form 
        onSubmit={addPerson} 
        valueName={newName} 
        valueNumber={newNumber} 
        onChangeName={handleNameChange} 
        onChangeNumber={handleNumberChange}
      />
      <SubTitle text="Numbers" />
      <ul>
        {personsToShow.map((person, i) => 
          <Person 
            key={i}
            person={person}
            clickRemove={() => removePerson(person.id, person.name)}
          />
        )}
      </ul>
    </div>
  )
}

export default App