import React, { useEffect } from 'react'
import "./Tasks.css"
import { useTaskContext, useGlobalContext } from '../../GlobalContextProvider'
import axios from 'axios'
import UseFetch from '../UseFetch/UseFetch'
import Cookies from "universal-cookie";
import { useState } from 'react'


const Tasks = (props) => {
  const cookies = new Cookies();
  const userName = cookies.get("username");
  const [tasks, dispatch]= useTaskContext();
  const [user, setUser, Fetch, setFetch] = useGlobalContext();
  const [editId, setEditId] = useState(-1);
  const [newTask, setNewTask] = useState({id: "", title: "", description: "", deadline: "",});

  useEffect(() => {
    fetch(`http://localhost:5000/tasks?username=${userName}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET TASK", tasks: data }));
  }, [Fetch])


// ----------- ADD TO FAVORITE ----------------
  const addToFavorite = async (event) => {
    for (let element of tasks) {
      if( element.id == event.target.id) {
        var fav = 1 - element.favorite
        break;
      }
    }

    const addFavorite = await axios.put(`http://localhost:5000/addtofav`, {  
      id: event.target.id,
      favorite: fav    
    })

    if (addFavorite.data.message) {
      setFetch((Fetch) => !Fetch)
    }
  }




  // ----------------  DELETE TASK ----------------

  const deleteTask = async (event) => {
    const deleteOne = await axios.delete(`http://localhost:5000/deleteOne?id=${event.target.id}`) 

    if (deleteOne.data.message === "OK") {
      setFetch((Fetch) => !Fetch)
    }
  }




  
  // ---------------- EDIT TASK ----------------

  const editTask = async (event) => {
    const editOne = await axios.get(`http://localhost:5000/findOne?id=${event.target.id}`)
    const {id, title, description, deadline} = editOne.data.message
    setNewTask((newTask) => ({["id"]: id, ['title']: title, ['description']: description, ['deadline']: deadline}))
    setEditId(() => id)
  }






  // --------------- MARK US DONE ----------------

  const markUsDone = async (event) => {
    for (let element of tasks) {
      if( element.id == event.target.id) {
        console.log(done)
        var done = 1 - element.done
        break;
      }
    }

    const addFavorite = await axios.put(`http://localhost:5000/markusdone`, {  
      id: event.target.id,
      done: done   
    })

    if (addFavorite.data.message) {
      setFetch((Fetch) => !Fetch)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName) {
        const addNewTask = await axios.put("http://localhost:5000/editTask", {
            id: newTask.id,
            username: userName,
            title: newTask.title,
            description: newTask.description,
            deadline: newTask.deadline
        })
        
        if (addNewTask.data.message === "OK") {
            setEditId(() => -1)
            setFetch((Fetch) => !Fetch)
            
        }
    } else {
        
    }
   
}

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewTask((newTask) => ({...newTask, [name]: value}))
}


  return (
    <div className='show-task'>
      {tasks.length ? 
      
      tasks?.map((task, index) => (
        <div className='task-list' key={index}>
          
          {editId == task?.id ? 

          <div className='edit-task'>
          <form onSubmit={handleSubmit} className='edittask-form'>
              <input className='edit-task-title' type="text" name='title' id='title' placeholder='Title...' value={newTask.title} onChange={handleChange}/>
              <textarea className='edit-task-description' name='description' id='description' placeholder='Description...' value={newTask.description} onChange={handleChange} required/>
              <div className='bottom-form'>
                  <div className='task-deadline'>
                      <p>Deadline</p>
                      <input className='deadline-date' type="date" name='deadline' id='deadline' placeholder='Deadline...' value={newTask.deadline} onChange={handleChange}/>
                  </div>
                  <button className='add-btn'>Edit</button>
              </div>
          </form>
          </div>
          :
          <div>
          <div className='title'>
            <p><span>
              {task?.done ?
              <i className="fa-sharp fa-solid fa-square-check checkbox" onClick={(e) => markUsDone(e)} id={task?.id}></i>: 
              <i onClick={(e) => markUsDone(e)} id={task?.id} className="fa-sharp fa-regular fa-square checkbox"></i>}
              
              </span>{task?.title}</p>
            <div className='task-icons'>
              <span ><i onClick={(e) => editTask(e)} id={task?.id} className="fa-sharp fa-solid fa-pencil edit"></i></span>
              <span ><i onClick={(e) => deleteTask(e)} id={task?.id} className="fa-solid fa-trash-can delete"></i></span>
              <span >
                {task?.favorite ? 
                  <i onClick={(e) => addToFavorite(e)} id={task?.id} className="fa-solid fa-star favorite"></i>: 
                  <i onClick={(e) => addToFavorite(e)} id={task?.id} className="fa-sharp fa-regular fa-star favorite"></i>}
                
              </span>
            </div>
          </div>
          <div className='description'>
            <p className='description-text'>{task?.description}</p>
            <p className='deadline-cont' ><span><i className="fa-solid fa-calendar-week deadline"></i></span>{task?.deadline}</p>
          </div>
        </div>
           }
          
        </div>
      ))
      : <pre style={{fontSize: "18px"}}>{props.text}</pre>}
      
      
    </div>
  )
}

export default Tasks
