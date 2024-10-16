const Country = ({ country, showMethod }) => {
    
    return (
        <li>{country.name.common+ " "}
        <button onClick={showMethod}>Show</button>
        </li>
      )
    
  }
  
  export default Country