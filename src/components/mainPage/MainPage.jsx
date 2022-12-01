import React from "react";
import MainDetail from "./MainDetail";
import "../../assets/style/Main.css";
import { Link } from "react-router-dom";
const mqttclient = require("../../scripts/MQTTConnect");

const MainPage = () => {
  mqttclient.on("connect", () => {
    mqttclient.subscribe(`CanhHoang/feeds/GH_TEMP`);
  });

  mqttclient.on("message", (topic, message) => {
    console.log(message.toString());
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 left">
          <Link to="/stat/daily-stat">
            <MainDetail title="đồ thị thời gian thực" id="one" />
          </Link>
        </div>
        <div className="col-6 right">
          <Link to="/notification">
            <MainDetail title="thông báo" id="two" />
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-6 left">
          <Link to="/device">
            <MainDetail title="thiết bị" id="three" />
          </Link>
        </div>
        <div className="col-6 right" id="five">
          <Link to="/data">
            <MainDetail title="thông số nhà kính" id="four" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
