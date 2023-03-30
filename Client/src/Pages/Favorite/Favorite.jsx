import React from 'react'
import UseFetch from '../../Components/UseFetch/UseFetch'
import { useGlobalContext } from '../../GlobalContextProvider'
import Tasks from '../../Components/Tasks/Tasks'
import "./Favorite.css"
import Cookies from "universal-cookie";


const Favorite = () => {
    const cookies = new Cookies();
    const userName = cookies.get("username");
    const userPass = cookies.get("password");
    const [user, setUser, Fetch, setFetch] = useGlobalContext()
    UseFetch(`http://localhost:5000/getFav?username=${userName}&favorite=${1}`, Fetch)

  return (
    <div className='fav-bg-image'>
        <h1 className='fav-header'>⭐ My Favorites </h1>
      <Tasks text={"No task added to favorite yet. Tap ⭐ to add."}/>
    </div>
  )
}

export default Favorite
