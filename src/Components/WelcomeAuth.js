import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "./Loading";
import { Welcome } from "./Welcome";
export const Auth = () => {
  if (localStorage.getItem(`__${localStorage.getItem("__access")}`)) {
    return <Loading/>; 
  }
  return <Navigate to="/signup" />;
};
