import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./Navbar.css"
import { useGlobalContext, useTaskContext} from '../../GlobalContextProvider'
import UseFetch from '../UseFetch/UseFetch'
import { useEffect } from 'react'
import Cookies from "universal-cookie";


const Navbar = () => {
  const cookies = new Cookies();
  const userName = cookies.get("username");
  const [user, setUser, Fetch, setFetch] = useGlobalContext();
  const [tasks, dispatch] = useTaskContext();
  const navBar = document.querySelectorAll('.nav-links')


  // useEffect(() => { 
  //   setFetch((Fetch) => !Fetch)
  //   setUser((user) => ({...user, ["username"]: userName, ["password"]: userPass}))
  // }, [])


  const logout = () => {
    cookies.remove("username");
    cookies.remove("password");
    setUser(null);
    window.location.reload();
    dispatch({type: "RESET TASK"})
  }  
  
  const Logout = () => {
    return (
      <div onClick={logout} className='logout'>
        <span>logout</span>
      </div>
    )
  }


  return (
    <>
      <nav className='navbar'>
       
        <Link to="/" className='logo-link'>
          <i className="fa-solid fa-calendar-check logo-image"></i>
        </Link>
      
        <ul className='navbar-items'>
          <Link className='nav-links' to="/" >Home</Link>
          <Link className='nav-links' to="/favorite">Favorite</Link>
          <Link className='nav-links' to="/done">Done</Link>
        </ul>

        {userName ? 
        <div>
          <div className='profile' style={{color: "white"}}>
            <i className="fa-solid fa-user profile-picture"></i>
            <p className='user-name'>{userName}</p>
            <Logout />
          </div>
        </div>

        :  
          <div className='account'>
            <Link className='account-link' to='/login'>Login</Link>
            <span className='account-span'>|</span>
            <Link className='account-link' to='/signup'>Signup</Link>
         </div>
        }
       
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar
