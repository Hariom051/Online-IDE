import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getAdditionalUserInfo,
  onAuthStateChanged,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useRef, useState } from "react";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect } from "react";
import axios from "axios";
import { signupschema } from "./Validation";
 export const Signup = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [string, setstring] = useState("");
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  const [error, seterror] = useState("");
  const [registerstate, setregisterstate] = useState(false);
  const [registererr, setregistererr] = useState("");
  let a = { p: {}, user: { isactive: "false",visit:0 } };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      if (user) {
      
        const unsub = onSnapshot(
          doc(db,"users",user.uid),
          (doc) => {
            // console.log(doc.data()?.user["isactive"] === "true")
            if (doc.data()?.user["isactive"] === "true") {
              navigate("/welcome");
            }
          }
        );
      }
    });
    
    setstring(
      "Password Should be greater than or equal to 6 string && less than  or equal to 10 string "
    );
    const time = setTimeout(() => {
      setstring("");
    }, 10000);
  }, []);
  const signupwithgoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const details = getAdditionalUserInfo(result);
        const token = credential.accessToken;
        const user = result.user;
        // console.log(user);
        sessionStorage.setItem("id", user.uid);
        localStorage.setItem("id", user.uid);
        if (details.isNewUser) {
          a.user.name = user.displayName;
          a.user.profile = user.photoURL;
          setDoc(doc(db, "users", user.uid), a);
        }
        navigate("/welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log(errorCode);
        // console.log(errorMessage);
      });
  };

  const register = () => {
    createUserWithEmailAndPassword(
      auth,
      email.current?.value,
      password.current?.value
    )
      .then(async (userCredential) => {
        setregistererr("");
        const user = userCredential.user;
        await updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            // console.log("profile updated");
          })
          .catch((Err) => {
            // console.log();
          });
        // console.log(user.uid)
        sessionStorage.setItem("id", user.uid);
        localStorage.setItem("id", user.uid);
        a.user.name = user.displayName;
        a.user.profile = user.photoURL;
        setDoc(doc(db, "users", user.uid), a);
        navigate("/welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setregistererr(errorCode);
        setregisterstate(false);
        // console.log(errorCode);
        // console.log(errorMessage);
        // ..
      });
  };

  const isValid = async () => {
    const object = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    const isvalid = await signupschema.isValid(object);
    if (isvalid) {
      register();
      setregisterstate(true);
    } else {
      seterror("Please fill all the credentials carefully!!!");
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
        <div
          style={{
            border: "1px grey solid",
            backgroundColor: "#F8F9F9",
            width: "20rem",
          }}
        >
          <br />

          {
            <div style={{ color: "green", fontFamily: "fantasy" }}>
              {string}
            </div>
          }
          <button onClick={signupwithgoogle} className="btn btn-primary">
            <strong>
              &nbsp;&nbsp;Continue&nbsp; with &nbsp;
              <i className="fa-brands fa-google"></i>
            </strong>
          </button>
          <br />
          <br />
          <strong>OR</strong>

          <br />
          <input
            ref={name}
            onChange={() => {
              setusername(name.current.value);
            }}
            type="text"
            placeholder=" Name"
          />
          <br />
          <br />
          <input ref={email} type="email" placeholder=" Email" />
          <br />
          <br />
          <input ref={password} type="password" placeholder="Set Password" />
          <br />
          <br />
          {error && error.length > 0 ? (
            <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>
          ) : null}

          {registererr && registererr.length > 0 ? (
            <div style={{ color: "red", fontWeight: "bold" }}>
              {registererr}
            </div>
          ) : (
            ""
          )}
          <button
            disabled={registerstate}
            className="btn btn-warning"
            onClick={isValid}
          >
            Register
          </button>
          <br />
          <NavLink to="/reset">Forgot Password</NavLink>
          <br />
          <strong>Already have an account ?</strong>
          <br />
          <NavLink
            style={{
              textDecoration: "none",
              fontFamily: "fantasy",
              fontSize: "20px",
            }}
            to="/login"
          >
            Login
          </NavLink>
        </div>
      </div>
    </>
  );
};
