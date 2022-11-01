import { useState } from "react";
import "./Workouts.scss";
import "./Workout.scss";
import WorkoutCard from "./styles/WorkoutCard/WorkoutCard";

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
        <button className="button" onClick={getWorkout}>
          Get Workout
        </button>
      </div>
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
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="Workout id"
          name="Workout id"
          id="Workout id"
          required
          onChange={handelChange}
        />
        <label for="Workout id" className="form__label">
          Workout id
        </label>
      </div>
    </div>
  );
}
