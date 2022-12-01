import React from "react";
import "../../assets/style/DeviceDetail.css";
import { history } from "../common/Header";

const mqttclient = require("../../scripts/MQTTConnect");

function Handler(devicename, feed_name, status_str, status, url) {
  console.log(devicename, feed_name, status_str, status, url);
  mqttclient.publish(`CanhHoang/feeds/${feed_name}`, status_str);
  fetch(`http://localhost:4000/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: devicename,
      history: {
        time: new Date().toLocaleString(),
        status: status,
        username: sessionStorage.getItem("username"),
      },
    }),
  });
}

const DeviceDetail = (props) => {
  let on = true;
  if (
    (props.name === "Đèn sợi đốt" && props.status == 0) ||
    (props.name === "Quạt Công Nghiệp" && props.status == 3) ||
    (props.name === "Máy bơm" && props.status == 5) ||
    (props.name === "Cửa nhà kính" && props.status == 7)
  ) {
    console.log(props.status);
    on = false;
  }
  function clickButtonHandler() {
    if (sessionStorage.getItem("username") !== null) {
      if (on) {
        if (props.name == "Đèn sợi đốt") {
          Handler("LIGHT", "GH_BULB", "0", false, "saveDeviceHistory");
        } else if (props.name == "Quạt Công Nghiệp") {
          Handler("FAN", "GH_FAN", "3", false, "saveDeviceHistory");
        } else if (props.name == "Máy bơm") {
          Handler("PUMP", "GH_PUMP", "5", false, "saveDeviceHistory");
        }
        on = false;
      } else {
        if (props.name == "Đèn sợi đốt") {
          Handler("LIGHT", "GH_BULB", "1", true, "saveDeviceHistory");
        } else if (props.name == "Quạt Công Nghiệp") {
          Handler("FAN", "GH_FAN", "2", true, "saveDeviceHistory");
        } else if (props.name == "Máy bơm") {
          Handler("PUMP", "GH_PUMP", "4", true, "saveDeviceHistory");
        }
        on = true;
      }
    } else {
      history.push("/login");
    }
  }

  return props.name !== "Cửa nhà kính" ? (
    <div className="container_">
      <div className="row ava" id="avatar">
        {props.ava}
      </div>
      <div className="row" id="id">
        <p>{props.id}</p>
      </div>
      <div className="row" id="name" style={{ fontSize: "26px" }}>
        <p>{props.name}</p>
      </div>
      <div className="row" id="status">
        {" "}
        <p>Trạng thái máy</p>
      </div>
      <div className="row" id="button">
        <label className="switch">
          <input type="checkbox" checked={!on} onChange={clickButtonHandler} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="row" id="total-hour">
        <p>Thời gian hoạt động </p>
      </div>
      <div className="row hour">
        <p>{props.usetime}</p>
      </div>
    </div>
  ) : (
    <div className="container_">
      <div className="row ava" id="avatar">
        {props.ava}
      </div>
      <div className="row" id="id">
        <p>{props.id}</p>
      </div>
      <div className="row" id="name" style={{ fontSize: "26px" }}>
        <p>{props.name}</p>
      </div>
      <div className="row" id="status">
        {" "}
        <p>Trạng thái cửa</p>
      </div>
      <div className="row" id="button">
        <label className="switch">
          <input type="checkbox" checked={!on} onChange={clickButtonHandler} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default DeviceDetail;
