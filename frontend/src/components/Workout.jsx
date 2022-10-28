import { useState } from "react";

export default function Workout() {
  const [workoutId, setWorkoutId] = useState("");
  const [workout, setWorkout] = useState("");

  const getWorkout = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/workouts/${workoutId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setWorkout(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handelChange = (e) => setWorkoutId(e.target.value);
  const { name, id, type, description, duration, createdAt, updatedAt } =
    workout;

  return (
    <div>
      <div>
        {name} {type} {description} {createdAt} {duration}
      </div>
      <label>
        workout : <input type="text" onChange={handelChange} />
      </label>
      <button onClick={getWorkout}>workout</button>
    </div>
  );
}
