import "../Signup.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { adminschema } from "../Validation/Validation";
export const Adminlogin = () => {
  const uname = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [disable, setdisable] = useState(false);
  const [validationerror, setvalidationerror] = useState("");
  const isValid = async () => {
    const object = {
      username: uname.current.value,
      password: password.current.value,
    };
    const isvalid = await adminschema.isValid(object);
    if (isvalid) {
      admin();
      setvalidationerror("");
      setdisable(true);
    } else {
      setvalidationerror("Please fill all the credentials carefully!!!");
      setdisable(false);
    }
  };
  const admin = async () => {
    const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_KEY);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (
        docSnap.data()?.admincre?.username === uname.current.value &&
        docSnap.data()?.admincre?.password === password.current.value
      ) {
        const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_KEY);
        // To update :
        await updateDoc(docRef, {
          "admincre.active": "true",
        });
        navigate("/adminpanel");
        seterror("");
        setdisable(true);
      } else {
        seterror("Wrong Username and Password !!!");
        setdisable(false);
      }
    } else {
      // doc.data() will be undefined in this case
      //   console.log("No such document!");
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
          bottom: "-12vw",
        }}
        className="text-center flex-column"
      >
        <h4 style={{ color: "white" }}>Administration Panel</h4>
        <br />
        {error ? (
          <span style={{ color: "red", fontWeight: "bold" }}>{error}</span>
        ) : (
          ""
        )}
        <input ref={uname} type="text" placeholder="Enter Username" />
        <br />
        <input ref={password} type="password" placeholder="Password" />
        <br />
        {validationerror ? (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {validationerror}
          </span>
        ) : (
          ""
        )}
        <button
          disabled={disable}
          onClick={isValid}
          className="btn btn-success"
        >
          Access
        </button>
      </div>
    </>
  );
};
