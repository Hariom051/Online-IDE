import { Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "../Components/Signup";
import { Login } from "../Components/Login";
import { Resetpass } from "../Components/Resetpass";
import { Auth } from "../Components/Auth";
import { Welcome } from "../Components/Welcome";
import { MoreProducts } from "../Components/MoreProducts";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/welcome" element={<Auth ele={<Welcome />} />}></Route>
      <Route path="/reset" element={<Resetpass />}></Route>
      <Route path="/moreproducts" element={<MoreProducts/>}></Route>
      <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
};
