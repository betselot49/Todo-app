import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate} from 'react-router-dom'
import './Signup.css'
import { useGlobalContext } from '../../GlobalContextProvider'
import Cookies from "universal-cookie";

const Signup = () => {
  const cookies = new Cookies();
  const [user, setUser] = useGlobalContext();
  const [message, setMessage] = useState(null)
  const username = document.getElementById('username')
  const password = document.getElementById('password')
  const Navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const signupRes = await axios.post("http://localhost:5000/signup", {
      username: user.username,
      password: user.password
    })

    if (signupRes.data.message === "OK") {
      cookies.set("username", user.username)
      cookies.set("password", user.password)
      username.value = ""
      password.value = ""
      setMessage(null)
      Navigate("/")
    } 
    else {
      setMessage("Username already in use. Try different username please.")
    }
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setUser((user) => ({...user, [name]:value}))
  }


  return (
    
    <div className='sign-bg-image'>
      <div className='signup-container'>
      <p className='signup-header'>Signup</p>
      <form className='signup-form' onSubmit={handleSubmit}>
        <label className='signup-label' htmlFor="username">Username</label>
        <input className='signup-input' type="text" id='username' name='username' onChange={handleChange}/>
        <label className='signup-label' htmlFor="password">Password</label>
        <input className='signup-input' type="password" name='password' id='password' onChange={handleChange}/>
        {message && 
       <p style={{
        color: 'red'
       }} className='have-account'>{message}</p>
      }
        <button className='signup-btn' type="submit">Signup</button>
      </form>
      <p className='have-account'>Do you have an account? <Link className='link-login' to='/login'> Login </Link></p>     
    </div>
    </div>
  )
}

export default Signup