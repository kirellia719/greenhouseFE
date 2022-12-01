import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/style/Main.css";
const MainDetail = (props) => {
  let title = props.title;
  let icon = "";
  if (title == "đồ thị thời gian thực") {
    icon = <FontAwesomeIcon icon="chart-line" />;
  } else if (title == "thông báo") {
    icon = <FontAwesomeIcon icon="fa-solid fa-bell" />;
  } else if (title == "thiết bị") {
    icon = <FontAwesomeIcon icon="fa-solid fa-gears" />;
  } else if (title == "thông số nhà kính") {
    icon = <FontAwesomeIcon icon="fa-solid fa-house-chimney-window" />;
  }
  return (
    <div className="card" id={props.id}>
      <div className="card-body">
        <div className="row title">{title}</div>
        <div className="row detail" style={{ fontSize: "70px" }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MainDetail;
