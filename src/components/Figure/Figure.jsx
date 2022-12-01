import fetch from "node-fetch";
import React, { useState } from "react";
import Detail from "../Device/Detail";
const mqttclient = require("../../scripts/MQTTConnect");

let temp_ = "";
let light_ = "";
let soil_ = "";
let humidity_ = "";

let temp_min = "";
let temp_max = "";
let light_min = "";
let light_max = "";
let soil_min = "";
let soil_max = "";
let hum_min = "";
let hum_max = "";

const getData = async () => {
  mqttclient.feeds_key.forEach(async (feed, index) => {
    const data = await fetch(
      `https://io.adafruit.com/api/v2/CanhHoang/feeds/${feed}/data`
    );

    const dataJson = await data.json();
    if (feed == "gh-temp") {
      temp_ = dataJson[0].value;
      localStorage.setItem("temp_", temp_);
    } else if (feed == "gh-light") {
      light_ = dataJson[0].value;
      localStorage.setItem("light_", light_);
    } else if (feed == "gh-soil") {
      soil_ = dataJson[0].value;
      localStorage.setItem("soil_", soil_);
    } else if (feed == "gh-hum") {
      humidity_ = dataJson[0].value;
      localStorage.setItem("humidity_", humidity_);
    }
  });
};

function callApi() {
  fetch(`http://localhost:4000/threshold`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((element) => {
        if (element.type == "TEMP") {
          temp_min = element.min;
          temp_max = element.max;
        } else if (element.type == "LIGHT") {
          light_min = element.min;
          light_max = element.max;
        } else if (element.type == "SOIL") {
          soil_min = element.min;
          soil_max = element.max;
        } else if (element.type == "HUM") {
          hum_min = element.min;
          hum_max = element.max;
        }
      });
    });
}

getData();
callApi();

const Figure = () => {
  const [temp, setTemp] = useState(parseInt(localStorage.getItem("temp_")));
  const [humidity, setHumidity] = useState(
    parseInt(localStorage.getItem("humidity_"))
  );
  const [light, setLight] = useState(parseInt(localStorage.getItem("light_")));
  const [soil, setSoil] = useState(parseInt(localStorage.getItem("soil_")));

  mqttclient.on("message", (topic, message) => {
    const feed = topic.split("/")[2];
    switch (feed) {
      case "GH_TEMP":
        console.log("Receive temp");
        setTemp(message.toString());
        localStorage.setItem("temp_", message.toString());
        break;
      case "GH_LIGHT":
        setLight(message.toString());
        localStorage.setItem("light_", message.toString());
        break;
      case "GH_SOIL":
        setSoil(message.toString());
        localStorage.setItem("soil_", message.toString());
        break;
      case "GH_HUM":
        setHumidity(message.toString());
        localStorage.setItem("humidity_", message.toString());
        break;
    }
  });

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <Detail
            data={temp}
            label={"Nhiệt độ"}
            color={"#d00000"}
            id={"red"}
            min={temp_min}
            max={temp_max}
          />
        </div>
        <div className="col-6">
          <Detail
            data={humidity}
            label={"Độ ẩm"}
            color={"#4361ee"}
            id={"blue"}
            min={hum_min}
            max={hum_max}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <Detail
            data={light}
            label={"Ánh sáng"}
            color={"#ffba08"}
            id={"orange"}
            min={light_min}
            max={light_max}
          />
        </div>
        <div className="col-6">
          <Detail
            data={soil}
            label={"Độ ẩm đất"}
            color={"#ddb892"}
            id={"brown"}
            min={soil_min}
            max={soil_max}
          />
        </div>
      </div>
    </div>
  );
};

export default Figure;
