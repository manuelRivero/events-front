
import React, {useState} from "react";
export const AuthContext = React.createContext({
  token: null,
  expirationTime: null,
  userId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
});


export default function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    setTokenExpiration(tokenExpiration);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
  };
  return (
    <AuthContext.Provider
      value={{
        token: token,
        userId: userId,
        expirationTime: tokenExpiration,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
