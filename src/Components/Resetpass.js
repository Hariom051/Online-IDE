import { useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { forgetpasswordschema } from "./Validation/Validation";
import "./Signup.css";
export const Resetpass = () => {
  const email = useRef();
  const [flagforemail, setflagforemail] = useState(false);
  const [error, seterror] = useState(null);
  const [resetstate, setresetstate] = useState(false);
  const [errcode, seterrcode] = useState("");
  const reset = () => {
    sendPasswordResetEmail(auth, email.current.value)
      .then(() => {
        // Password reset email sent!
        setflagforemail(true);
        seterrcode("");
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrcode(errorCode);
      });
  };
  const isValid = async () => {
    const object = {
      email: email.current.value,
    };
    const isvalid = await forgetpasswordschema.isValid(object);
    if (isvalid) {
      reset();
      setresetstate(true);
      seterror("");
    } else {
      seterror("Please fill all the credentials carefully!!!");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        bottom: "-10vw",
        
      }}
      className="text-center flex-column"
    >
      <div style={{border: "1px grey solid",
        backgroundColor: "#F8F9F9",
        width: "20rem",
        }}>
      <br />
      {errcode.length > 0 ? (
        <div style={{ color: "red", fontWeight: "bold" }}>{errcode}</div>
      ) : (
        ""
      )}
      <input ref={email} type="email" placeholder="xyz@gmail.com" />
      <br />
      <br />
      <button
        disabled={resetstate && !errcode}
        onClick={isValid}
        className="btn btn-danger"
      >
        Reset
      </button>
      <br />
      {error && error.length > 0 ? (
        <div style={{ color: "red", fontWeight: "bold" }}>
          Please Fill all the credentials carefully!!{" "}
        </div>
      ) : null}
      {flagforemail ? (
        <strong style={{ color: "red" }}> Sent!!! Check Your Email</strong>
      ) : null}
      <br />
      <br />
      </div>
      
    </div>
  );
};
