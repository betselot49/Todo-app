import React from 'react'
// import { useGlobalContext } from '../../GlobalContextProvider'
// import { useTaskContext } from '../../GlobalContextProvider'
import Tasks from '../../Components/Tasks/Tasks'
import AddTask from '../../Components/AddTask/AddTask'
import "./Home.css"

const Home = () => {
  // const [user] = useGlobalContext()
  // const [tasks, dispatch] = useTaskContext()
  return (
    <div className='home-bg-image'>
      <AddTask />
      <Tasks text={"No task add yet. Set your first task!"}/>
    </div>
  )
}

export default Home
