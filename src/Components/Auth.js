import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
export const Auth = (props) => {
  const [User, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser({ err: "notauth" });
      } else {
        notifyauth();
      }
    });
  }, []);
  const notifyauth = () => {
    toast.success("Sign in Sucessfully !!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const resolve = (props) => {
    return (
      <>
        <ToastContainer />
        {props.ele}
      </>
    );
  };

  return <>{User.err === "notauth" ? <Navigate to="/" /> : resolve(props)}</>;
};
