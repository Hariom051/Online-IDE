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
import { setDoc, getDoc, doc ,updateDoc,increment} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect } from "react";
import { signupschema } from "./Validation/Validation";
import image from "./project_png/icons8-google-48.png";
import image1 from "./project_png/icons8-hide-30.png";
import image2 from "./project_png/show.png";
import "./Signup.css";
import { notifysuccess } from "./Common function/common";
export const Signup = (props) => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [string, setstring] = useState("");
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  const [error, seterror] = useState("");
  const [registerstate, setregisterstate] = useState(false);
  const [registererr, setregistererr] = useState("");
  const [hideshow, sethideshow] = useState(false);
  const [Image, setimage] = useState(image1);
  let a = { p: [], user: { isactive: "true", visit:1, message: [] } };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("__access", user.accessToken);
        localStorage.setItem("__id", user.uid);
        localStorage.setItem(`__${user.accessToken}`, user.uid);
        localStorage.setItem(`__message${user.uid}`,user.uid);
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          if (doc.data()?.user["isactive"] === "true") {
            navigate("/");
          }
        });
      }
    });

    setstring(
      "1.Password must have atleast Six characters.\n2.Password must have atmost twenty characters."
    );
    const time = setTimeout(() => {
      setstring("");
    }, 10000);
  }, []);
  const signupwithgoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        notifysuccess("Sign in Sucessfully !!!");
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const details = getAdditionalUserInfo(result);
        const token = credential.accessToken;
        const user = result.user;
        // console.log(user);
        localStorage.setItem("__access", user.accessToken);
        localStorage.setItem("__id", user.uid);
        localStorage.setItem(`__${user.accessToken}`, user.uid);
        localStorage.setItem(`__message${user.uid}`,user.uid);
        const docRef = doc(db, "users", user.uid);
        
        if (!details.isNewUser) {
          updateDoc(docRef, {
            "user.visit": increment(1),
            "user.isactive": "true",
          });
        }
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          console.log("No such document!");
          a.user.name = user.displayName;
          a.user.profile = user.photoURL;
          a.user.email = user.email;
          setDoc(doc(db, "users", user.uid), a);
        }

        navigate("/");
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
        notifysuccess("Registered Sucessfully !!!");
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
        localStorage.setItem("__access", user.accessToken);
        localStorage.setItem("__id", user.uid);
        localStorage.setItem(`__${user.accessToken}`, user.uid);
        localStorage.setItem(`__message${user.uid}`,user.uid);
        a.user.name = user.displayName;
        a.user.profile = user.photoURL;
        setDoc(doc(db, "users", user.uid), a);
        navigate("/");
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
        className=" text-center flex-column "
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
          <button
            style={{ border: "2px solid grey" }}
            onClick={signupwithgoogle}
            className="btn btn-light"
          >
            <strong>
              <img style={{ height: "22px" }} src={image} alt="Google" />
              &nbsp;Continue with Google &nbsp;
            </strong>
          </button>
          <br />
          <br />
          <strong>OR</strong>

          <br />
          <input
            style={{ width: "70%" }}
            ref={name}
            onChange={() => {
              setusername(name.current.value);
            }}
            type="text"
            placeholder="xyz"
          />
          <br />
          <br />
          <input
            style={{ width: "70%" }}
            ref={email}
            type="email"
            placeholder="xyz@gmail.com"
          />
          <br />
          <br />
          <input
            style={{ marginLeft: "-10px", width: "70%" }}
            ref={password}
            type={hideshow ? "text" : "password"}
            placeholder="Set Password"
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
