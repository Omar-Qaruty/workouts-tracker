import React, { createContext, useState, useEffect } from "react";

const WorkoutsContext = createContext();

const WorkoutsContextProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  const getWorkouts = async () => {
    try {
      const res = await fetch("http://localhost:8080/workouts/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setWorkouts(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <WorkoutsContext.Provider value={workouts}>
      {children}
    </WorkoutsContext.Provider>
  );
};

export { WorkoutsContext, WorkoutsContextProvider };
