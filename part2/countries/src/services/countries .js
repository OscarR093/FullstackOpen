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




export default { getAll, getObject}