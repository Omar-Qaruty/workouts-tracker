import React, { createContext, useState, useEffect } from "react";

const LastSevenDaysWorkoutsContext = createContext();

const LastSevenDaysWorkoutsProvider = ({ children }) => {
  const [lastSevenDaysWorkouts, setLastSevenDaysWorkouts] = useState([]);

  const getLastSevenDaysWorkouts = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/workouts/lastSevenDaysWorkouts",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const lastSevenDaysdata = await res.json();
      setLastSevenDaysWorkouts(lastSevenDaysdata);
      console.log(lastSevenDaysdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLastSevenDaysWorkouts();
  }, []);

  return (
    <LastSevenDaysWorkoutsContext.Provider value={lastSevenDaysWorkouts}>
      {children}
    </LastSevenDaysWorkoutsContext.Provider>
  );
};

export { LastSevenDaysWorkoutsContext, LastSevenDaysWorkoutsProvider };
