import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const isLoggedIn = localStorage.getItem("user"); // or check session

  if(!isLoggedIn){
    return <Navigate to="/" />
  }

  return children;
}

export default ProtectedRoute;