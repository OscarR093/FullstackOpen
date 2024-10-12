const Person = ({ person, deleteMethod }) => {
    return (
        <li>{person.name+": "+person.number+ " "}
        <button onClick={deleteMethod}>Delete</button>
        </li>
      )
    
  }
  
  export default Person