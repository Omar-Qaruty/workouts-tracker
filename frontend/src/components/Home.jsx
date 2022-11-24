import { Link } from "react-router-dom";
import Workout from "./Workout";

export default function Home() {
  return (
    <>
      <div>
        <button className="button">
          <Link to="workouts">Get Workouts</Link>
        </button>
      </div>
      <div>
        <button className="button">
          <Link to="last-seven-days-workouts">Get last 7 days Workouts</Link>
        </button>
      </div>
      <div>
        <Workout />
      </div>
      <div>
        <button className="button">
          <Link to="create-workout">create workout</Link>
        </button>
      </div>
    </>
  );
}
