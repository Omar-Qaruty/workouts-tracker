import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useEffect } from "react";
import Home from "./components/Home";
import EditWorkout from "./components/EditWorkout";
import Workouts from "./components/Workouts";
import { WorkoutsContextProvider } from "./context/WorkoutsContext";
import LastSevenDaysWorkouts from "./components/LastSevenDaysWorkouts";
import { LastSevenDaysWorkoutsProvider } from "./context/LastSevenDaysWorkoutsContext";
import CreateWorkout from "./components/CreateWorkout";

function App() {
  const checkUser = async (canceler) => {
    try {
      const res = await fetch("http://localhost:8080/auth/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        signal: canceler.signal,
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const canceler = new AbortController();
    checkUser(canceler);

    return () => canceler.abort();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="edit-workout" element={<EditWorkout />} />
        <Route path="create-workout" element={<CreateWorkout />} />
        <Route
          path="last-seven-days-workouts"
          element={
            <LastSevenDaysWorkoutsProvider>
              <LastSevenDaysWorkouts></LastSevenDaysWorkouts>
            </LastSevenDaysWorkoutsProvider>
          }
        />
        <Route
          path="workouts"
          element={
            <WorkoutsContextProvider>
              <Workouts />
            </WorkoutsContextProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
