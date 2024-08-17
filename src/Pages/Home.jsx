import { useState, useEffect } from "react";
import Detail from "../Components/Details.jsx";
import { useWorkoutsContext } from "../Hook/WorkoutContext";
import ApiFunc from "../Components/Api.js";
import { useUserContext } from "../Hook/useUserContext.jsx";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { status, user } = useUserContext();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (status && user) { // Ensure user is available
        try {
          const data = await ApiFunc(
            "GET",
            { Authorization: `Bearer ${user.token}` },
            {},
            "https://backend-two-one.vercel.app/api/workouts"
          );

          if (data) {
            dispatch({ type: "SET_WORKOUTS", payload: data });
          }
        } catch (err) {
          setError(err.message || "An error occurred while fetching workouts");
        }
      }
    };

    fetchData();
  }, [dispatch, user, status]);

  return (
    <div className="home">
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="workout">
          {workouts && workouts.map((workout) => (
            <Detail key={workout._id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
