import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getMyProfile } from "../services/userService";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  async function loadUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return null;
    }

    try {
      const response = await getMyProfile();

      if (response.success) {
        setUser(response.data);

        // Return user so Login.jsx can use it immediately
        return response.data;
      }

      setUser(null);
      return null;

    } catch (error) {
      console.error("Unable to load user:", error);
      setUser(null);
      return null;

    } finally {
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser,
        loadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}