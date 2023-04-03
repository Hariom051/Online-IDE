import { useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { loginschema } from "./Validation/Validation";
import { useState } from "react";
import image1 from "./project_png/icons8-hide-30.png";
import image2 from "./project_png/show.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { db } from "../firebase/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import { notifysuccess } from "./Common function/common";
export const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [errorCode, seterrorCode] = useState("");
  const [index, setindex] = useState(0);
  const [loginstate, setloginstate] = useState(false);
  const [hideshow, sethideshow] = useState(false);
  const [Image, setimage] = useState(image1);
  const login = () => {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        notifysuccess("Login Sucessfully !!!");
        const user = userCredential.user;
        seterrorCode("");
        localStorage.setItem("__access", user.accessToken);
        localStorage.setItem("__id", user.uid);
        localStorage.setItem(`__${user.accessToken}`, user.uid);
        localStorage.setItem(`__message${user.uid}`,user.uid);
        navigate("/welcome");
        const docRef = doc(db, "users", user.uid);
        updateDoc(docRef, {
          "user.isactive": "true",
          "user.visit": increment(1),
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode);
        seterrorCode(errorCode);
      });
  };
  const isValid = async () => {
    const object = {
      email: email.current.value,
      password: password.current.value,
    };
    const isvalid = await loginschema.isValid(object);
    if (isvalid) {
      login();
      setloginstate(true);
      seterror("");
      setindex("");
    } else {
      seterror("Please fill all the credentials carefully!!!");
      setindex(index + 1);
    }
  };
  return (
    <>
    {/* <div>
      <form  >
        <input style={{display:"block"}} type="email" placeholder="Enter Your Email" />
       
        <input style={{display:"block"}}  type="password" placeholder="Enter Your Password" />
        <button style={{display:"block",alignItems:"center"}}>Login</button>
      </form>
    </div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          bottom: "-5vw",
        }}
        className=" text-center flex-column"
      >
        <br />
        <br />
        <br />

        <div
          style={{
            border: "1px grey solid",
            backgroundColor: "#F8F9F9",
            width: "20rem",
          }}
        >
          <strong>Login</strong>
          <br /> <br />
          {errorCode && errorCode.length > 0 ? (
            <div style={{ color: "red", fontWeight: "bold" }}>{errorCode}</div>
          ) : null}
          <br />
          <input ref={email} type="email" placeholder="xyz@gmail.com" />
          <br />
          <br />
          <input
            style={{ marginLeft: "-10px" }}
            ref={password}
            type={hideshow ? "text" : "password"}
            placeholder="Enter Password"
          />
          <img
            onClick={() => {
              hideshow ? setimage(image1) : setimage(image2);
              sethideshow(!hideshow);
            }}
            style={{ height: "20px", marginLeft: "-30px", cursor: "pointer" }}
            src={Image}
            alt="Hide"
          />
          <br />
          <br />
          {error && error.length > 0 ? (
            <div style={{ color: "red", fontWeight: "bold" }}>
              Please Fill all the credentials carefully!! {index}{" "}
            </div>
          ) : null}
          <button
            disabled={loginstate && !errorCode}
            onClick={isValid}
            className="btn btn-primary"
          >
            Login
          </button>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};
