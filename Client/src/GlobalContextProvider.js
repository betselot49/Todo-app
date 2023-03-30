import React from "react";
import { useState, createContext, useContext, useReducer } from "react";

const userContext = createContext();
const tasksContext = createContext();

export function useGlobalContext() {
  return useContext(userContext);
}

export function useTaskContext() {
  return useContext(tasksContext);
}

const GlobalContextProvider = ({ children }) => {
  const InitialState = [];
  const [user, setUser] = useState();
  const [Fetch, setFetch] = useState(false);
  const [tasks, dispatch] = useReducer(reducer, InitialState);

  function reducer(state, action) {
    switch (action.type) {
      case "ADD TASK":
        return [...state, action.newTask];

      case "ADD TO FAVORITE":
        // update the task in the database

        return state;

      case "SET TASK":
        state = action.tasks;
        return state;

      case "RESET TASK":
        state = InitialState;
        return state;

      default:
        return state;
    }
  }

  return (
    <userContext.Provider value={[user, setUser, Fetch, setFetch]}>
      <tasksContext.Provider value={[tasks, dispatch]}>
        {children}
      </tasksContext.Provider>
    </userContext.Provider>
  );
};

export default GlobalContextProvider;
