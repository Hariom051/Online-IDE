import React from "react";
import "./Loading.css";
import { Circles, Rings, Blocks } from "react-loader-spinner";
import { Welcome } from "./Welcome";
import { useState, useEffect } from "react";

export const Loading = () => {
  const [spinner, setspinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setspinner(false);
    }, 2000);
  }, []);

  return spinner ? (
    <span className="circle">
      {/* <Circles
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
       */}
      {/* <Rings
  height="100"
  width="100"
  color="#4fa94d"
  radius="8"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="rings-loading"
/> */}
      <Blocks
        visible={true}
        height="90"
        width="90"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </span>
  ) : (
    <Welcome />
  );
};