import * as React from "react";
import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { deleteUser } from "firebase/auth";
import { deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { Circles } from "react-loader-spinner";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifysuccess } from "./Common function/common";
import { CurrentNews } from "./CurrentNews";

export const Welcome = () => {
  const navigate = useNavigate();
  const textarea = useRef(null);
  const [currentuser, setcurrentuser] = useState({});
  const [visit, setvisit] = useState();
  const [msgModal, setmsgModal] = useState(false);
  const ele = document.getElementById("pay");
  if(ele)
  {
    ele.remove();
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setcurrentuser(user);
    }
  });

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", localStorage.getItem("__id")),
      (doc) => {
        setvisit(doc.data()?.user.visit);
      }
    );
  }, []);
  const signout = () => {
    localStorage.removeItem(`__message${localStorage.getItem("__id")}`);
    localStorage.removeItem(`__${localStorage.getItem("__access")}`);
    localStorage.removeItem("__access");
    localStorage.removeItem("__id");

    const docRef = doc(db, "users", currentuser.uid);
    // To update isactive:
    updateDoc(docRef, {
      "user.isactive": "false",
    });
    setTimeout(() => {
      signOut(auth)
        .then(() => {
          // console.log("sign out");

          navigate("/signup");

          sessionStorage.clear();
        })
        .catch((err) => {
          // console.log(err);
        });
    }, 1000);
    notifysuccess("logout successfully , come back soon!!!");
  };
  const deleteuser = async () => {
    await deleteDoc(doc(db, "users", currentuser.uid));
    const user = auth.currentUser;
    await deleteUser(user)
      .then(() => {
        // User deleted.
        console.log("deleted");
      })
      .catch((error) => {
        // An error ocurred
        console.log("not deleted");
        // ...
      });
    navigate("/signup");
  };
  const sweetpopup = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteuser();
      }
    });
  };

  return (
    <>
  
      <CurrentNews />
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
            <strong style={{ fontFamily:"helvatica" }}>
              Welcome {currentuser?.displayName}
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
            <div className="col">
              {" "}
              <span className="col text-muted">
                You have visited {visit} times
              </span>
            </div>
            <div className="col text-info">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/message");
                }}
              >
                Message to our team
              </span>
            </div>
            <div className="row">
              <div className="col">
                <span
                  onClick={() => {
                    navigate("/moreproducts");
                  }}
                  className="col text-info"
                  style={{ cursor: "pointer" }}
                >
                  More Products
                </span>
              </div>
              <div className="col">
                <button onClick={sweetpopup} className="col text btn btn-dark text-danger">
                  Delete Account
                </button>
              </div>
              <div className="row">
                <div className="col">
                  <span
                    onClick={() => {
                      navigate("/payment");
                    }}
                    className="col text-info"
                    style={{ cursor: "pointer" }}
                  >
                    Support Our Team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

const arr =()=>{

}
