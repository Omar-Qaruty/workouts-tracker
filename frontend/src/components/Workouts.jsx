import { useState } from "react";
import WorkoutCard from "./styles/WorkoutCard/WorkoutCard";
import "./Workouts.scss";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [lastSevenDaysWorkouts, setLastSevenDaysWorkouts] = useState([]);

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
                  <div>
                    {
                      <WorkoutCard
                        name={name}
                        id={id}
                        type={type}
                        description={description}
                        duration={duration}
                        createdAt={createdAt}
                      />
                    }
                  </div>
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
                  <WorkoutCard
                    name={name}
                    id={id}
                    type={type}
                    description={description}
                    duration={duration}
                    createdAt={createdAt}
                  />
                </li>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button className="button" onClick={getWorkouts}>
          Get Workouts
        </button>
      </div>
      <div>
        <button className="button" onClick={getLastSevenDaysWorkouts}>
          Get last 7 days Workouts
        </button>
      </div>
    </div>
  );
}
