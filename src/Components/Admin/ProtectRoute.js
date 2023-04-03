import { AdminPanel } from "./AdminPanel";
import { Navigate } from "react-router-dom";
import { doc,getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useContext } from "react";
import { Admin } from "../../Routes/AllRoutes";

export const ProtectRoute = () => {
  const admin = useContext(Admin); 
  if(admin.state){
 return  <AdminPanel/>
  }
  else{
 return <Navigate to="/adminlogin"/>
  }
};
