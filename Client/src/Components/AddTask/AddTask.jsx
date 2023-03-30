import React, { useState } from 'react'
import "./AddTask.css"
import axios from 'axios'
import { useTaskContext, useGlobalContext } from '../../GlobalContextProvider'
import { useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie";


const AddTask = () => {
    const cookies = new Cookies();
    const userName = cookies.get("username");
    const [tasks, dispatch] = useTaskContext();
    const [user, setUser, Fetch, setFetch] = useGlobalContext();
    const [newTask, setNewTask] = useState({title: "", description: "", deadline: "",});
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const deadline = document.getElementById('deadline');
    const Navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userName) {
            const addNewTask = await axios.post("http://localhost:5000/addTask", {
                username: userName,
                title: newTask.title,
                description: newTask.description,
                starting_date: Date().toString().slice(0,15),
                deadline: newTask.deadline
            })
            
            if (addNewTask.data.message === "OK") {
                dispatch({type: "ADD TASK", newTask: newTask})
                title.value = ""
                description.value = ""
                deadline.value = ""
                setFetch((Fetch) => !Fetch)
            }
        } else {
            Navigate("/login")
        }
       
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewTask((newTask) => ({...newTask, [name]: value}))
    }


  return (
    <div className='addtask'>
        <h1 className='todo-form-header'>My Todos</h1>
        <form onSubmit={handleSubmit} className='addtask-form'>
            <input className='task-title' type="text" name='title' id='title' placeholder='Title...' onChange={handleChange}/>
            <textarea className='task-description' name='description' id='description' placeholder='Description...' onChange={handleChange} required/>
            <div className='bottom-form'>
                <div className='task-deadline'>
                    <p>Deadline</p>
                    <input className='deadline-date' type="date" name='deadline' id='deadline' placeholder='Deadline...' onChange={handleChange}/>
                </div>
                <button className='add-btn'> + Add</button>
            </div>
        </form>
    </div>
  )
}

export default AddTask
