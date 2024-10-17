import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const url21object='https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getObject = () => {
    const request = axios.get(url21object)
    return request.then(response => response.data)
  }

const getWeather=(lat, lon)=>{
  const API_key = import.meta.env.VITE_SOME_KEY
  const weatherURL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
  const request = axios.get(weatherURL)
  return request.then(response => response.data)
}



export default { getAll, getObject, getWeather}