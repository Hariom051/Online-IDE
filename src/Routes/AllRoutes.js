import { Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "../Components/Signup";
import { Login } from "../Components/Login";
import { Resetpass } from "../Components/Resetpass";
import { Auth } from "../Components/WelcomeAuth";
import { Welcome } from "../Components/Welcome";
import { MoreProducts } from "../Components/Products/MoreProducts";
import { AdminPanel } from "../Components/Admin/AdminPanel";
import { Adminlogin } from "../Components/Admin/Adminlogin";
import { ProtectRoute } from "../Components/Admin/ProtectRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";
import { db } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ProtectMsg } from "../Components/Message/ProtectMsg";
import { Message } from "../Components/Message/Message";
import { createContext } from "react";
import { Loading } from "../Components/Loading";
import {Payment} from "../Components/Payment/payment";
export const Admin = createContext();
export const AllRoutes = () => {
  const [admin, setadmin] = useState(false);
  const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_KEY);
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      setadmin(docSnap.data()?.admincre?.active);
    }
  });
  return (
    <Admin.Provider value={{ state: admin }}>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/moreproducts" element={<MoreProducts />}></Route>
        <Route
          exact
          path="/"
          element={
            <Auth>
              <Loading />
            </Auth>
          }
        ></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/reset" element={<Resetpass />}></Route>

        <Route path="/adminlogin" element={<Adminlogin />}></Route>
        <Route
          path="/adminpanel"
          element={
            <ProtectRoute>
              <AdminPanel />
            </ProtectRoute>
          }
        ></Route>
        <Route path="/payment" element={<Payment/>}> </Route>
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Admin.Provider>
  );
};
