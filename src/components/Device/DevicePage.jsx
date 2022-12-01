import React, { useState } from "react";
import DeviceDetail from "./DeviceDetail";
import "../../assets/style/DevicePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mqttclient = require("../../scripts/MQTTConnect");

const feeds_key = ["gh-bulb", "gh-fan", "gh-pump", "gh-door"];

let bulb_ = "";
let fan_ = "";
let pump_ = "";
let door_ = "";

const getData = async () => {
  feeds_key.forEach(async (feed) => {
    const data = await fetch(
      `https://io.adafruit.com/api/v2/CanhHoang/feeds/${feed}/data`
    );
    const dataJson = await data.json();

    if (feed == "gh-bulb") {
      bulb_ = dataJson[0].value;
      localStorage.setItem("bulb_", bulb_);
    } else if (feed == "gh-fan") {
      fan_ = dataJson[0].value;
      localStorage.setItem("fan_", fan_);
    } else if (feed == "gh-pump") {
      pump_ = dataJson[0].value;
      localStorage.setItem("pump_", pump_);
    } else if (feed == "gh-door") {
      door_ = dataJson[0].value;
      localStorage.setItem("door_", door_);
    }
  });
};

function convertHMS(value) {
  const sec = parseInt(value / 1000, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  let days = Math.floor(hours / 24);
  hours = hours - days * 24;
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return (
    days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây "
  ); // Return is HH : MM : SS
}

const getUsetime = async () => {
  let data = await fetch("http://localhost:4000/getdevicedetail");
  const dataJson = await data.json();
  dataJson.map((data) => {
    if (data.name == "FAN") {
      localStorage.setItem("fan_usetime", convertHMS(data.usetimes));
    } else if (data.name == "LIGHT") {
      localStorage.setItem("bulb_usetime", convertHMS(data.usetimes));
    } else if (data.name == "PUMP") {
      localStorage.setItem("pump_usetime", convertHMS(data.usetimes));
    }
  });
};

getData();

const DevicePage = () => {
  React.useEffect(() => {
    getUsetime();
  }, []);
  const [bulb, setBulb] = useState(parseInt(localStorage.getItem("bulb_")));
  const [fan, setFan] = useState(parseInt(localStorage.getItem("fan_")));
  const [pump, setPump] = useState(parseInt(localStorage.getItem("pump_")));
  const [door, setDoor] = useState(parseInt(localStorage.getItem("door_")));

  mqttclient.on("message", (topic, message) => {
    const feed = topic.split("/")[2];
    switch (feed) {
      case "GH_BULB":
        setBulb(message.toString());
        localStorage.setItem("bulb_", message.toString());
        break;
      case "GH_FAN":
        setFan(message.toString());
        localStorage.setItem("fan_", message.toString());
        break;
      case "GH_PUMP":
        setPump(message.toString());
        localStorage.setItem("pump_", message.toString());
        break;
      case "GH_DOOR":
        setDoor(message.toString());
        localStorage.setItem("door_", message.toString());
        break;
    }
  });

  return (
    <div id="container">
      <div
        className="row"
        style={{ fontWeight: "bold", marginBottom: "-40px" }}
      >
        <h3>Các thiết bị trong nhà kính</h3>
      </div>
      <div className="row">
        <div className="col-3">
          <DeviceDetail
            status={bulb}
            name="Đèn sợi đốt"
            id="BULB179"
            ava={
              <FontAwesomeIcon icon="fa-solid fa-lightbulb" className="ava" />
            }
            usetime={localStorage.getItem("bulb_usetime")}
          />
        </div>
        <div className="col-3">
          <DeviceDetail
            status={fan}
            name="Quạt Công Nghiệp"
            id="FAN179"
            ava={<FontAwesomeIcon icon="fa-solid fa-fan" className="ava" />}
            usetime={localStorage.getItem("fan_usetime")}
          />
        </div>
        <div className="col-3">
          <DeviceDetail
            status={pump}
            name="Máy bơm"
            id="PUMP121"
            ava={
              <FontAwesomeIcon icon="fa-solid fa-pump-soap" className="ava" />
            }
            usetime={localStorage.getItem("pump_usetime")}
          />
        </div>
        <div className="col-3">
          <DeviceDetail
            status={door}
            name="Cửa nhà kính"
            id="DOOR121"
            ava={<FontAwesomeIcon icon="fa-solid fa-door-open" />}
          />
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
