import { useState } from 'react'
import Person from './components/Person'

const Filter=(props)=>{
return(<div>
        Filtered person: <input value={props.value} onChange={props.onChange} />
      </div>)
}

const PersonForm=(props)=>{
  return(<form onSubmit={props.onSubmit}>
    <div>
      name: <input value={props.nameValue} onChange={props.nameChange} />
    </div>
    <div>number: <input value={props.numberValue} onChange={props.numberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Persons=({filteredPersons})=>{
  return(<ul>
    {filteredPersons.map(person => (
      <Person key={person.name} persons={person} />
    ))}
  </ul>)
}

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
      <Filter value={newFiltered} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson}
      nameValue={newName} nameChange={handleNameChange} 
      numberValue={newNumber} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App
