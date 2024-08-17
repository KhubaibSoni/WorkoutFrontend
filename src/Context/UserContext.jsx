import { createContext, useReducer, useEffect } from "react";

// Create a UserContext
export const UserContext = createContext();

// Reducer function
export const UserReducer = (state, action) => {
  switch (action.type) {
    case "Login":
      return {
        status: true,
        user: action.payload,
      };

    case "Logout":
      return {
        status: false,
        user: null,
      };

    default:
      return state;
  }
};

// Context Provider
export const UserContextProvider = ({ children }) => {
  // Retrieve initial state from localStorage or use defaults
  const loadInitialState = () => {
    try {
      const storedState = JSON.parse(localStorage.getItem("user"));
      if (storedState) {
        return { status: true, user: storedState };
      }
      return { status: false, user: null };
    } catch (error) {
      console.error("Error loading user state from localStorage:", error);
      return { status: false, user: null };
    }
  };

  const [state, dispatch] = useReducer(UserReducer, loadInitialState());

  // Update localStorage whenever the state changes
  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(state.user));
    } catch (error) {
      console.error("Error saving user state to localStorage:", error);
    }
  }, [state.user]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
