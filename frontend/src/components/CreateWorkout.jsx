import { useState } from "react";
import "./Workout.scss";

export default function CreateWorkout() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handleType = (e) => setType(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleDuration = (e) => setDuration(e.target.value);

  const createNewWorkout = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/workouts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, type, description, duration }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div class="form__group field">
        <input
          type="input"
          class="form__field"
          id="name"
          onChange={handleName}
        />
        <label class="form__label">name</label>
      </div>
      <div class="form__group field">
        <input
          type="input"
          class="form__field"
          id="type"
          onChange={handleType}
        />
        <label class="form__label">type</label>
      </div>
      <div class="form__group field">
        <input
          type="input"
          class="form__field"
          name="description"
          onChange={handleDescription}
        />
        <label class="form__label">description</label>
      </div>
      <div class="form__group field">
        <input
          type="input"
          class="form__field"
          name="duration"
          onChange={handleDuration}
        />
        <label class="form__label">duration</label>
        <button className="button" onClick={createNewWorkout}>
          create workout
        </button>
      </div>
    </div>
  );
}
