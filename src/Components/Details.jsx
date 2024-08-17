import './Detail.css'; // Import the CSS file for styling
import { useWorkoutsContext } from "../Hook/WorkoutContext";
import ApiFunc from './Api';
import { useUserContext } from '../Hook/useUserContext.jsx';

function Detail({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const{user} = useUserContext()
  const handleDelete = () => {
const featch =async ()=>{
  try {
      
    const response = await ApiFunc('Delete',{'Authorization' : `Bearer ${user.token}`},{},"http://localhost:4000/api/workouts/",workout.workout._id)
    
    if (response) {
      console.log("response",response);
      dispatch({ type: 'DELETE_WORKOUT', payload: response });
    }
  } catch (error) {
    console.error("Failed to delete workout:", error);
  }
}
if(user){
  featch()
}

  };

  return (
    <div className="item">
      <h3 className="item-title">{workout.workout.title || "Untitled"}</h3>
      <p className="item-reps">Reps: {workout.workout.reps || "N/A"}</p>
      <p className="item-weight">Weight: {workout.workout.weight || "N/A"}</p>
      <p className="item-date">{new Date(workout.createdAt).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Detail;
