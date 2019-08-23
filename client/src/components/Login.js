import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const login = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:5001/api/login', credentials)
      .then((res) => {
        localStorage.setItem('token', res.data.payload)
      })
      .catch((err) => console.log('Unable to login!', err.response))
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={login}>
          <input
            type='text'
            name='username'
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  )
}

export default Login
