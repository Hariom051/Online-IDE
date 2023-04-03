import * as React from "react";
import Button from "@mui/material/Button";
import { useRef, useState, useEffect } from "react";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { notifysuccess } from "../Common function/common";
export const Message = () => {
  const textarea = useRef();
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getdoc = async () => {
      const docRef = doc(db, "users", localStorage.getItem("__id"));
      await getDoc(docRef).then((doc) => {
        // console.log(doc.data();
        setdata(doc.data());
      });
    };
    getdoc();
    // console.log(data);
  }, []);
  const send = async () => {
    if (textarea.current.value) {
      data.user.message.push(`${textarea.current.value}->${new Date().toString()}`); ///pushing the message
      await setDoc(doc(db, "users", localStorage.getItem("__id")), data);
      notifysuccess("Send Successfully !!!");
      navigate("/welcome");
    } else {
      alert("Write something !!!");
    }
  };
  const validsend = () => {
    if(localStorage.getItem(`__message${localStorage.getItem("__id")}`))
    {
      send();

    }
    else{
      alert("Please login !!!");
    }
  };
  return (
    <>
      <h2 className="alert-success text-center">Message</h2>
      <div className="container">
        <div className="form-group shadow-textarea">
          <label>Message our Team</label>
          <textarea
            ref={textarea}
            className="form-control z-depth-1"
            id="exampleFormControlTextarea6"
            rows="10"
            placeholder="Write something here..."
          ></textarea>
        </div>
        <br />
        <div className="text-center">
          <Button onClick={validsend} variant="outlined">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
