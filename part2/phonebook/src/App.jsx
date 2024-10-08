import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltered, setNewFiltered] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons) // Nuevo estado para personas filtradas

  const addPerson = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)
    const exists = names.reduce((found, currentName) => {
      return found || currentName === newName
    }, false)

    if (exists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber }
      const updatedPersons = persons.concat(personObject)
      setPersons(updatedPersons)
      setFilteredPersons(updatedPersons) // Actualiza la lista filtrada también
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setNewFiltered(filterValue)

    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    setFilteredPersons(filtered) // Guarda las personas filtradas
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filtered person: <input value={newFiltered} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
          <Person key={person.name} persons={person} />
        ))}
      </ul>
    </div>
  )
}

export default App
