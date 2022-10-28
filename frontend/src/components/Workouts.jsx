import { useState } from "react";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [lastSevenDaysWorkouts, setLastSevenDaysWorkouts] = useState([]);

  const getWorkouts = async (event) => {
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

  return (
    <div>
      <h3> Workouts</h3>
      <div>
        <div>
          {workouts.map((workout) => {
            const {
              name,
              id,
              type,
              description,
              duration,
              createdAt,
              updatedAt,
            } = workout;
            return (
              <div key={id}>
                <li>
                  {name} {type} {description} {duration} {createdAt}
                </li>
              </div>
            );
          })}
        </div>
        <div>
          {lastSevenDaysWorkouts.map((workout) => {
            const {
              name,
              id,
              type,
              description,
              duration,
              createdAt,
              updatedAt,
            } = workout;
            return (
              <div key={id}>
                <li>
                  {name} {type} {description} {duration} {createdAt}
                </li>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={getWorkouts}>Get Workouts</button>
      <button onClick={getLastSevenDaysWorkouts}>
        Get last 7 days Workouts
      </button>
    </div>
  );
}
