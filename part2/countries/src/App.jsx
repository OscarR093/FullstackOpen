import { useState, useEffect } from 'react'
import serviceCountries from './services/countries '
import Country from './components/country'


const SingleCountry=({country})=>{
return(
  <>
  <h1>{country.name.common}</h1>
  <p>Capital: {country.capital}</p>
  <p>Area: {country.area}m2</p>
  <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, language], index) => (
          <li key={index}>
             {language}
          </li>
        ))}
      </ul>
  <img src={country.flags.svg} width={200} height={"auto"} alt={`Flag of ${country.name.common}`} />
  </>
)
}

const CountryList=({countries, showCountry})=>{
  if(countries.length===1){return (<SingleCountry country={countries[0]}/>)}
if (countries.length >10){
  return(<p>To many matches, specify another filter</p>)
}
else{
  return(
      countries.map(country => (
          <Country
            key={country.name.common}
            country={country}
            showMethod={() => showCountry(country)} // Cambiado a función de callback
          />
        ))
  )
}
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [countryToShow, setCountryToShow] = useState(null)

  useEffect(() => {
    serviceCountries.getAll().then(allCountries => {
      setCountries(allCountries)
    })   
   }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
    setCountryToShow(null)
    
  }

  const showCountry=(country)=>{
    console.log({country})
     setCountryToShow(country)
  }

 
  const filteredCountry = countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  )

  

  return (
    <div>
      <form>
        Find countries: <input value={value} onChange={handleChange} />
      </form>
      
      { value && <CountryList countries={filteredCountry} showCountry={showCountry}/>}
      {countryToShow && <SingleCountry country={countryToShow}/> }
      
    </div>
  )
}

export default App