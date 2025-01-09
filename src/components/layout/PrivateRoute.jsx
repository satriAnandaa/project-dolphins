
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginPage from "../../pages/Login/LoginPage";
import LoadingScreen from "./LoadingScreen";
import MainLayout from "./MainLayout";


const PrivateRoute = ({ component }) => {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  console.log("PrivateRoute -> isLoggedIn", isLoggedIn);

  if (isLoggedIn && !isLoading ) {
    
    return  <MainLayout>{component}</MainLayout>
  }else if (!isLoading && !isLoggedIn){
    return <LoginPage />;
    
    
  }

  return <LoadingScreen/>


};

export default PrivateRoute;
