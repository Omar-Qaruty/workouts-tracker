import { useContext } from "react";
import { LastSevenDaysWorkoutsContext } from "../context/LastSevenDaysWorkoutsContext";
import WorkoutCard from "./styles/WorkoutCard/WorkoutCard";

export default function LastSevenDaysWorkouts() {
  const lastSevenDaysWorkouts = useContext(LastSevenDaysWorkoutsContext);

  return (
    <div>
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
  );
}
