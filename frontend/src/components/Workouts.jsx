import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";
import WorkoutCard from "./styles/WorkoutCard/WorkoutCard";

export default function Workouts() {
  const workouts = useContext(WorkoutsContext);

  return (
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
              <ul>
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
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
