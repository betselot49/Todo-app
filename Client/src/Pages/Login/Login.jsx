import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { useGlobalContext } from '../../GlobalContextProvider'
import Cookies from "universal-cookie";


const Login = () => {
  const cookies = new Cookies();
  const [user, setUser, Fetch, setFetch] = useGlobalContext();
  const [message, setMessage]= useState(null)
  const username = document.getElementById('username')
  const password = document.getElementById('password')
  const Navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault()


    const login = await axios.post("http://localhost:5000/login", {
      username: user.username, 
      password: user.password
    })


    if (login.data.message === "OK") {
      username.value = ""
      password.value = ""
      setMessage(null)
      cookies.set("username", user.username)
      cookies.set("password", user.password)
      Navigate("/")
    } else {
      setMessage(login.data.message)
    }   
  }


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((user) => ({...user, [name]: value})) 
  }



  return (
    <div className='login-bg-image'>
      <div className='login-container'>
      <p className='login-header'>Login</p>
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='login-label' htmlFor="username">Username</label>
        <input className='login-input' type="text" id='username' name='username' onChange={handleChange} required/>
        <label className='login-label' htmlFor="password">Password</label>
        <input className='login-input' type="password" name='password' id='password' onChange={handleChange} required/>
        {message && 
       <pre style={{
        color: 'red',
        margin: '0',
        fontSize: '17px',
       }} className='have-account'>{message}</pre>
      }
        <button className='login-btn' type="submit">Login</button>
      </form>
      <p className='have-account'>Don't you have an account? <Link className='link-signup' to='/signup'> Signup </Link></p>
      
    </div>
    </div>
    
  )
}

export default Login