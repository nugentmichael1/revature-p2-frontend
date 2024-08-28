import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
  } from "react";
import { User } from "../types/user";
import { Course } from "../types/course";
  
interface AppState {
  user: User | null;
  courses: Course[] | null;
  // Add additional state properties here
}

interface AppContextType {
  state: AppState;
  setUser: (user: User | null) => void;
  setCourses: (courses: Course[] | null) => void;
  // Add additional state update functions here as needed
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// TODO: don't handle users in localStorage?
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const storedUser = localStorage.getItem("user");
    const storedCourses = localStorage.getItem("courses");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      courses: storedCourses ? JSON.parse(storedCourses) : null,
      // Initialize additional state properties here
    };
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }

    if (state.courses) {
      localStorage.setItem('courses', JSON.stringify(state.courses));
    } else {
      localStorage.removeItem('courses');
    }
    // Handle additional state changes here
  }, [state.user, state.courses]);

  const setUser = (user: User | null) => {
    setState((prevState) => ({ ...prevState, user }));
  };

  const setCourses = (courses: Course[] | null) => {
    setState((prevState) => ({ ...prevState, courses }));
  };
  // Add additional state update functions here

  return (
    <AppContext.Provider value={{ state, setUser, setCourses }}>
      {children}
    </AppContext.Provider>
  );
};
