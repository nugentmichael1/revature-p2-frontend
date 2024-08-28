import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
  } from "react";
import { User } from "../types/user";
import { Account } from "../types/account";
  
interface AppState {
  user: User | null;
  accounts: Account[] | null;
  // Add additional state properties here
}

interface AppContextType {
  state: AppState;
  setUser: (user: User | null) => void;
  setAccounts: (accounts: Account[] | null) => void;
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
    const storedAccounts = localStorage.getItem("accounts");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      accounts: storedAccounts ? JSON.parse(storedAccounts) : null,
      // Initialize additional state properties here
    };
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }

    if (state.accounts) {
      localStorage.setItem('accounts', JSON.stringify(state.accounts));
    } else {
      localStorage.removeItem('accounts');
    }
    // Handle additional state changes here
  }, [state.user, state.accounts]);

  const setUser = (user: User | null) => {
    setState((prevState) => ({ ...prevState, user }));
  };

  const setAccounts = (accounts: Account[] | null) => {
    setState((prevState) => ({ ...prevState, accounts }));
  };
  // Add additional state update functions here

  return (
    <AppContext.Provider value={{ state, setUser, setAccounts }}>
      {children}
    </AppContext.Provider>
  );
};
