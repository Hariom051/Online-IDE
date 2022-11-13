import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { app, auth, db } from "../firebase/firebase";
import { useState, useRef, useEffect } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  addDoc,
  setDoc,
  getDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";
import { Aceeditor } from "./Aceeditor";

export const Welcome = () => {
  const navigate = useNavigate();
  const textarea = useRef(null);
  const [currentuser, setcurrentuser] = useState({});
  const [visit, setvisit] = useState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setcurrentuser(user);
    }
  });
  useEffect(() => {
    const docRef = doc(db, "users", localStorage.getItem("id"));
    updateDoc(docRef, {
      "user.visit": increment(1),
    });
    const unsub = onSnapshot(
      doc(db, "users", localStorage.getItem("id")),
      (doc) => {
        setvisit(doc.data().user.visit);
      }
    );
  }, []);

  const signout = async () => {
    const docRef = doc(db, "users", currentuser.uid);
    // To update isactive:
    await updateDoc(docRef, {
      "user.isactive": "false",
    });
    signOut(auth)
      .then(() => {
        // console.log("sign out");
        navigate("/");
        sessionStorage.clear();
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <>
      {/* navbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ONLINE IDE
            </Typography>
            <Button
              onClick={signout}
              color="inherit"
              style={{ border: "2px solid cadetblue" }}
            >
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* moving text */}
      <div style={{ backgroundColor: "#DBF9DB" }}>
        <div className="container text-center">
          <marquee behavior="alternate" direction="right">
            <strong style={{ fontStyle: "italic" }}>
              Welcome {currentuser?.displayName} | {currentuser?.email}
            </strong>
          </marquee>
        </div>
        <Aceeditor />
        <br />
      </div>
      <footer className="footer mt-auto py-4 bg-dark">
        <div className="container">
          <div className="row">
            <div className="col text-muted">
              {" "}
              <span className="text-muted">
                © 2022{" "}
                <span style={{ textDecoration: "underline" }}> Online IDE</span>
              </span>
            </div>
            <div className="col text-muted ">hariomarya305@gmail.com</div>
          </div>
          <div className="row">
            {" "}
            <span className="col text-muted">
              You have visited {visit} times
            </span>
            <span
              onClick={() => {
                navigate("/moreproducts");
              }}
              className="col text-muted"
              style={{ cursor: "pointer" }}
            >
              More Products
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};
