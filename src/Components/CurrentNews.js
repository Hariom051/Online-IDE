import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
export const CurrentNews = () => {
  const [state, setstate] = useState(true);
  const [bannernews, setbannernews] = useState();
  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/Hariom051/onlineide-json/main/ide.json";
    const promise = axios.get(url);
    promise
      .then((res) => {
        // console.log(res);
        setbannernews(res.data.current);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setstate(false);
    }, 10000);
  }, []);
  return (
    <>
      {bannernews?.length > 0 ? (
        state ? (
          <div
            style={{
              borderLeftColor: "#ffe954",
              borderLeftWidth: "9px",
              borderLeftStyle: "solid",
              backgroundColor: "rgba(255,229,100)",
              padding: "2px 8px 4px 10px",
              fontFamily: "helvitica",
            }}
          >
            {bannernews?.map((e, index) => {
              return (
                <div key={index}>
                  {index + 1}. {e}
                </div>
              );
            })}{" "}
          </div>
        ) : null
      ) : null}
    </>
  );
};
