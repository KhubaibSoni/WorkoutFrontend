import { createContext, useReducer } from "react";

// Create a context for workouts
export const WorkoutContext = createContext();

// Reducer function to manage the workout state
export const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      };

    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      };

    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(w => w.workout._id !== action.payload._id)
      };

    default:
      return state;
  }
};

// Context provider component
export const WorkoutContextProvider = ({ children }) => { // Renamed to WorkoutContextProvider
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [] // Initialize with an empty array
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
