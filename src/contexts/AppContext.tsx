import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
  } from "react";
  import { User } from "../types/user";
  
  interface AppState {
    user: User | null;
    // Add additional state properties here
  }
  
  interface AppContextType {
    state: AppState;
    setUser: (user: User | null) => void;
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
      return {
        user: storedUser ? JSON.parse(storedUser) : null,
        // Initialize additional state properties here
      };
    });
  
    useEffect(() => {
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('user');
      }
      // Handle additional state changes here
    }, [state.user]);
  
    const setUser = (user: User | null) => {
      setState((prevState) => ({ ...prevState, user }));
    };
  
    // Add additional state update functions here
  
    return (
      <AppContext.Provider value={{ state, setUser }}>
        {children}
      </AppContext.Provider>
    );
  };
  