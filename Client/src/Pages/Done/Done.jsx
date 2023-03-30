import React from 'react'
import UseFetch from '../../Components/UseFetch/UseFetch'
import { useGlobalContext, useTaskContext } from '../../GlobalContextProvider'
import Tasks from '../../Components/Tasks/Tasks'
import "./Done.css"
import Cookies from "universal-cookie";


const Done = () => {
    const cookies = new Cookies();
    const userName = cookies.get("username");
    const userPass = cookies.get("password");
    const [user, setUser, Fetch, setFetch] = useGlobalContext()
    const [task, dispatch] = useTaskContext()
    UseFetch(`http://localhost:5000/getDone?username=${userName}&done=${1}`, Fetch)


  return (
    <div className='done-bg-image'>
        <h1 className='done-header'> Completed Tasks </h1>
      <Tasks text={"There is no completed task. Mark in the checkbox when you are done!"}/>
    </div>
  )
}

export default Done
