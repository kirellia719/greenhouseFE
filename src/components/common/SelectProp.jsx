import React from "react";
import "../../assets/style/SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SelectProp = (props) => {
  let fun = props.fun;
  return (
    <>
      <div id="select_bar">
        <div className="row">
          <FontAwesomeIcon
            className="icon"
            // ternary operator
            id={props.selectedProp === 2 ? "isActive" : ""}
            icon="fa-solid fa-sun"
            onClick={() => fun(2)}
          />
        </div>
        <div className="row">
          <FontAwesomeIcon
            className="icon"
            id={props.selectedProp === 0 ? "isActive" : ""}
            icon="fa-solid fa-temperature-full"
            onClick={() => fun(0)}
          />
        </div>
        <div className="row">
          <FontAwesomeIcon
            className="icon"
            id={props.selectedProp === 1 ? "isActive" : ""}
            icon="fa-solid fa-droplet"
            onClick={() => fun(1)}
          />
        </div>
        <div className="row">
          <FontAwesomeIcon
            className="icon"
            id={props.selectedProp === 3 ? "isActive" : ""}
            icon="fa-solid fa-hill-rockslide"
            onClick={() => fun(3)}
          />
        </div>
      </div>
    </>
  );
};

export default SelectProp;
