import axios from 'axios'

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')

  // creates a new instance of axios
  // passing in a config object, this one is headers
  // any api call made with axiosWithAuth attaches header w token
  return axios.create({
    headers: {
      Authorization: token
    }
  })
}
