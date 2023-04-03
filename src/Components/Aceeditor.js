import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { onSnapshot, serverTimestamp } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { modalschema } from "./Validation/Validation";
import { notifysuccess, notifywarn } from "./Common function/common";
export const Aceeditor = () => {
  const [currentuser, setcurrentuser] = useState();
  const [code, setcode] = useState(``);
  const [lan, setlan] = useState("");
  const [editor, seteditor] = useState("");
  const [output, setoutput] = useState({});
  const [data, setdata] = useState({});
  const modalinput = useRef();
  const codename = useRef();
  const [selectvalue, setselectvalue] = useState("");
  const [savemodal, setsavemodal] = useState(false);
  const [modal, setmodal] = useState(false);
  const [apierr, setapierr] = useState("");
  const [theme, settheme] = useState("dracula");
  const [savemodalerror, setsavemodalerror] = useState("");
  const [previouscodevalid, setpreviouscodevalid] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setcurrentuser(user);      
        const docRef = doc(db, "users", user.uid); 
        await getDoc(docRef)
          .then((doc) => {
            // console.log(doc.data());
            setdata(doc.data());
            if (JSON.stringify(doc.data()?.p) === "[]") {
              setpreviouscodevalid(true);
            }
          })
          .catch((Err) => {
            // console.log(Err);
          });
      }
    });
  }, []);
  const takeinput = (value) => {
    setcode(value);
  };
  const handleChange = (event) => {
    setselectvalue(event.target.value);
    if (event.target.value === "java") {
      setlan(event.target.value);
      seteditor("java");
    } else if (event.target.value === "py") {
      setlan(event.target.value);
      seteditor("python");
    } else if (event.target.value === "cpp") {
      setlan(event.target.value);
      seteditor("c_cpp");
    } else if (event.target.value === "c") {
      setlan(event.target.value);
      seteditor("c_cpp");
    } else if (event.target.value === "cs") {
      setlan(event.target.value);
      seteditor("csharp");
    } else if (event.target.value === "js") {
      setlan(event.target.value);
      seteditor("javascript");
    }
  };
  const run = () => {
    setmodal(false);
    var data = JSON.stringify({
      code: code,
      language: lan,
      input: modalinput.current.value,
    });
    var config = {
      method: "post",
      url: "https://codex-api.herokuapp.com/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setoutput(response.data);
        setapierr("");
      })
      .catch(function (error) {
        // console.log(error);
        setapierr(error.message);
      });
  };

  const save = async () => {
    setsavemodal(false);
    setpreviouscodevalid(false);
    data.p?.push({ codename: codename.current.value, code: code, createdAt:new Date().toString()});
    await setDoc(doc(db, "users", currentuser.uid), data);
  };
  const IsValid = async () => {
    const object = {
      codename: codename.current.value,
    };
    const isvalid = await modalschema.isValid(object);
    if (isvalid) {
      setsavemodalerror("");
      save();
    } else {
      setsavemodalerror("Please fill this field !!!");
    }
  };
  const accordian = (e, index) => {
    const deleteitem = async () => {
      notifywarn("Deleted !!!");
      data?.p.splice(index, 1);
      const t = { ...data };
      setdata(t);
      if (JSON.stringify(data?.p) === "[]") {
        setpreviouscodevalid(true);
      }
      await setDoc(doc(db, "users", currentuser.uid), data);
    };

    return (
      <div key={e.codename}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontFamily: "helvetica" }}>
              {" "}
              🚀 {e.codename} { "    "} 
            </Typography>
              <div style={{marginLeft: "auto",fontFamily:"helvatica"}}>{e.createdAt.slice(4,16)}</div> 
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {e.code}
              <Typography  style={{fontSize:"12px"}}>{e.createdAt}</Typography>
              <span
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  size: "20px",
                }}
              >
                <span style={{ cursor: "pointer" }} onClick={deleteitem}>
                  <i className="fa-solid fa-trash"></i> Delete
                </span>
                &nbsp;&nbsp; &nbsp; &nbsp;
                <span
                  style={{ cursor: "pointer" }}
                  onClick={(i) => {
                    notifysuccess("Copied !!!");
                    navigator.clipboard.writeText(e.code);
                  }}
                >
                  <i className="fa-regular fa-copy"></i> Copy
                </span>
              </span>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };
  return (
    <div className="container">
      <h3 className="" style={{boderRadius:"7px",fontFamily:"serif",color:"blue"}}>
        Select your preferred language and theme: &nbsp;
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Language</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={selectvalue}
            label="Language"
            onChange={handleChange}
          >
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="c">C</MenuItem>
            <MenuItem value="cs">C#</MenuItem>
            <MenuItem value="js">Nodejs</MenuItem>
            <MenuItem value="py">Python</MenuItem>
          </Select>
        </FormControl>
        &nbsp;
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Theme</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={theme}
            label="Theme"
            onChange={(event) => {
              // console.log(event.target.value)
              settheme(event.target.value);
            }}
          >
            <MenuItem value="chrome">Chrome</MenuItem>
            <MenuItem value="clouds">Clouds</MenuItem>
            <MenuItem value="iplastic">IPlastic</MenuItem>
            <MenuItem value="chaos">Chaos</MenuItem>
            <MenuItem value="monokai">Monokai</MenuItem>
            <MenuItem value="tomorrow_night_bright">
              Tomorrow Night Bright
            </MenuItem>
            <MenuItem value="dreamweaver">Dreamweaver</MenuItem>
            <MenuItem value="tomorrow">Tomorrow</MenuItem>
            <MenuItem value="dracula">Dracula</MenuItem>
          </Select>
        </FormControl>
        &nbsp; &nbsp;
        <button
          className="btn btn-outline-primary "
          onClick={() => {
            setmodal(true);
          }}
        >
          Run
        </button>
        &nbsp;
        <button
          onClick={() => {
            setsavemodal(true);
          }}
          className=" btn btn-outline-success flex-reverse"
        >
          Save
        </button>
      </h3>
      <ToastContainer />
      {/* This is for toast message,this runs when notify function invoke */}
      <AceEditor
        onChange={takeinput}
        height="370px"
        width="100"
        mode={editor}
        defaultValue="// let's write some broken code 😈"
        theme={theme}
        fontSize="20px"
        setMenuItems={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showPrintMargin: false,
        }}
      />
      <hr />
      <Modal className="text-danger" show={modal}>
        <Modal.Header>
          If your code requires an input, please type it down below otherwise
          leave it empty. For multiple inputs, There should be space among
          inputs.
        </Modal.Header>
        <Modal.Body>
          <input
            ref={modalinput}
            className="form-control"
            type="text"
            placeholder="Inputs"
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={run}>
            Run
          </button>
          <button
            onClick={() => {
              setmodal(false);
            }}
            className="btn btn-danger"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <Modal className="text-danger" show={savemodal}>
        <Modal.Header>NAME YOUR CODE</Modal.Header>
        <Modal.Body>
          <input
            ref={codename}
            className="form-control"
            type="text"
            placeholder="Fill Your Appro. Code Name"
          />
          <span>{savemodalerror}</span>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={IsValid} className="btn btn-success">
            Save
          </button>
          <button
            onClick={() => {
              setsavemodal(false);
            }}
            className="btn btn-danger"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <h4 className="text-center alert-success border border-dark rounded">Output 🚀</h4>

        <div>
          {output?.success ? (
            <strong
              className="flex"
              style={{
                overflow: "auto",
                whiteSpace: "pre-line",
                fontFamily: "monospace",
                fontSize: "18px",
                color: "green",
                color: "green",
              }}
            >
              {output?.output}
            </strong>
          ) : (
            <div style={{ color: "red" }}>
              {output?.error}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {apierr.length > 0 ? apierr : ""}
              </span>
            </div>
          )}
        </div>
      </div>
      <br />
      <div className="container">
        <h4 className="text-center alert-success border border-dark rounded">Previous Code 🚀</h4>
      </div>
      <div className="container">
        {previouscodevalid ? (
          <span style={{ display: "flex", justifyContent: "center" }}>
            <span
              className="alert alert-danger"
              role="alert"
              style={{ fontWeight: "bold" }}
            >
              No code saved !!! 😢
            </span>
          </span>
        ) : (
          ""
        )}
        {data?.p &&
          data?.p.map((e, index) => {
            return accordian(e, index);
          })}
      </div>
    </div>
  );
};
