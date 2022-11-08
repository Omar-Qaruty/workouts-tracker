import { Link } from "react-router-dom";
import "./WorkoutCardStyles.scss";
export default function WorkoutCard({
  name,
  id,
  type,
  description,
  duration,
  createdAt,
}) {
  return (
    <div className="container">
      <div class="card">
        <div id={id} class="card-header">
          <img
            src="https://media.istockphoto.com/photos/gym-background-fitness-weight-equipment-on-empty-dark-floor-picture-id1213615970?k=20&m=1213615970&s=612x612&w=0&h=S2Ny5JNrAlcpZ_0mt76CKAwARqvJN5glvHpB9fD3DA0="
            alt="some kind of an img"
          />
        </div>
        <div class="card-body">
          <span class="tag tag-teal"> {name}</span>
          <h4>{type}</h4>
          <p> {description}</p>
          <div class="user">
            <div class="user-info">
              <h5>{duration}</h5>
              <small>{createdAt}</small>
            </div>
          </div>
        </div>
        <div>
          <button className="button">
            <Link to="/edit-workout">edit workout</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
