import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import onlineide from "../project_png/onlineide.png";
import weather from "../project_png/weather.png";
import notes from "../project_png/notes.png";
import news from "../project_png/news.png";
import music from "../project_png/music.png";
import dictionary from "../project_png/dictionary.png";
import resume from "../project_png/resume.png";
import axios from "axios";
import { useEffect, useState } from "react";
export const MoreProducts = () => {
  const [data, setdata] = useState();
  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/Hariom051/projects_data/main/data.json";
    const promise = axios.get(url);
    promise
      .then((res) => {
        // console.log(res)``
        setdata(res.data.data);
        // data[0].img = dictionary;
        // data[1].img = news;
        // data[2].img = music;
        // data[3].img = notes;
        // data[4].img = weather;
        // data[5].img = onlineide;
        // setdata(data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  const more = (e, index) => {
    return (
      <span key={index}>
        <Card sx={{ maxWidth: 390 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={e.image}
              alt={e.name}
              onClick={() => {
                if (!(e.name === "Online IDE App")) {
                  window.open(e.link);
                }
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {e.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {e.about}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        &nbsp;
      </span>
    );
  };
  return (
    <>
      <h2 className="alert-warning text-center">Projects</h2>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"></div>
          {data &&
            data?.map((e, index) => {
              return more(e, index);
            })}
        </div>
      </div>
      <footer
        style={{
          position: "sticky",
          left: "0",
          bottom: "0",
          width: "100%"
        }}
        className="footer mt-auto py-2 bg-dark"
      >
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
        </div>
      </footer>
    </>
  );
};
