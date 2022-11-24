export default function DeleteWorkout({ id }) {
  const handleDeleteWorkout = async (event) => {
    event.preventDefault();
    try {
      let result = await fetch(`http://localhost:8080/workouts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const resonse = await res.json();
      console.log(resonse);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button className="button" onClick={handleDeleteWorkout}>
        delete workout
      </button>
    </div>
  );
}
