import { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
      Filtered person: <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.nameValue} onChange={props.nameChange} />
      </div>
      <div>number: <input value={props.numberValue} onChange={props.numberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltered, setNewFiltered] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)
    const exists = names.includes(newName)

    if (exists) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('')
      setNewNumber('')
    } else {
      const personObject = { name: newName, number: newNumber }
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      setNewName('')
      setNewNumber('')
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const handleFilterChange = (event) => {
    setNewFiltered(event.target.value)
  };

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService.del(id).then(() => {
        setPersons(persons.filter(n => n.id !== id))
      }).catch(error => {
        alert(`The person '${person.name}' was already deleted from server`)
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  // Filtrar las personas según el valor del filtro
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFiltered.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFiltered} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map(person => (
          <Person
            key={person.id}
            person={person}
            deleteMethod={() => deletePerson(person.id)} // Cambiado a función de callback
          />
        ))}
      </ul>
    </div>
  )
}

export default App;
