import React, { useEffect } from "react";
import { useGlobalContext, useTaskContext } from "../../GlobalContextProvider";

const UseFetch = (url, Fetch) => {
  const [user, setUser] = useGlobalContext();
  const [tasks, dispatch] = useTaskContext();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET TASK", tasks: data }));
  }, [Fetch]);
};

export default UseFetch;
