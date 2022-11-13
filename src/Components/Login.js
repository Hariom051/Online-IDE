import { useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { loginschema } from "./Validation";
import { useState } from "react";

export const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [errorCode, seterrorCode] = useState("");
  const [index, setindex] = useState(0);
  const [loginstate, setloginstate] = useState(false);
  const login = () => {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        seterrorCode("");
        sessionStorage.setItem("id", user.uid);
        localStorage.setItem("id",user.uid);
        navigate("/welcome");
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
          <input ref={email} type="email" placeholder="Enter Email" />
          <br />
          <br />
          <input ref={password} type="password" placeholder="Enter Password" />
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
