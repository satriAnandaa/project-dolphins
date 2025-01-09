/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getDataPrivate, logoutAPI } from "../utils/api";
import { jwtStorage } from "../utils/jwt_storage";
import { FaLessThanEqual } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  

  const navigate = useNavigate();

  const getDataProfile = () => {
    getDataPrivate("/api/v1/protected/data")
      .then((resp) => {
        setIsLoading(false)
        if (resp?.user_logged) {
          setUserProfile(resp.user_logged);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setIsLoading(false)
        console.log(err);
      });
  };

  useEffect(() => {
    getDataProfile();
  }, []);

  const login =(access_token) => {
    let decoded = jwtDecode(access_token);
    console.log("ini respon",decoded)
    jwtStorage.storeToken(access_token);
    getDataProfile();
    if (decoded.role === 2){
      navigate("/dashboard", { replace: true });
    } else if (decoded.role === 1) {

      navigate("/", { replace: true });
    } else {
      logout();
    }
    console.log("ini respon", userProfile)
    
    
  };

  const logout = () => {
    jwtStorage.removeItem();
    setUserProfile({});
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading, setIsLoading, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
