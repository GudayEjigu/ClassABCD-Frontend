import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  // const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((token, user) => {
    console.log(user);
    setToken(token);
    setUser(user);
    localStorage.setItem(
      "classABCD_data",
      JSON.stringify({
        token,
        user,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("classABCD_data");
  }, []);

  let loginData;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("classABCD_data"));
    if (storedData) {
      if (storedData?.token) {
        loginData = login(storedData?.token, storedData?.user);
        setTimeout(() => setChecked(true), 2000);
      }

      setTimeout(() => setChecked(true), 2000);
    }
    setTimeout(() => setChecked(true), 2000);
  }, [loginData]);

  //Return
  return (
    <AuthContext.Provider
      value={{ user, token, checked, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
