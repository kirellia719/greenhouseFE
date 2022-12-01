import React from "react";
import "../../assets/style/App.css";
import "../../assets/style/SideBar.css";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
const mqttclient = require("../../scripts/MQTTConnect");

const Detail = (props) => {
  const history = useHistory();
  let min = props.min;
  let max = props.max;

  let id_min = "";
  let id_max = "";

  let feed = "";
  let data = props.data;
  let label = props.label;
  let icon = "";
  let id = props.id;

  function onClickHanddler() {
    history.push(`/stat/daily-stat`);
  }

  if (label === "Nhiệt độ") {
    feed = "TEMP";
    icon = (
      <FontAwesomeIcon
        className="icon"
        icon="fa-solid fa-temperature-full"
        onClick={onClickHanddler}
      />
    );
  } else if (label === "Độ ẩm") {
    feed = "HUM";
    icon = (
      <FontAwesomeIcon
        className="icon"
        icon="fa-solid fa-droplet"
        onClick={onClickHanddler}
      />
    );
  } else if (label === "Ánh sáng") {
    feed = "LIGHT";
    icon = (
      <FontAwesomeIcon
        className="icon"
        icon="fa-solid fa-sun"
        onClick={onClickHanddler}
      />
    );
  } else if (label === "Độ ẩm đất") {
    feed = "SOIL";
    icon = (
      <FontAwesomeIcon
        className="icon"
        icon="fa-solid fa-hill-rockslide"
        onClick={onClickHanddler}
      />
    );
  }
  id_min = `min_${feed}`;
  id_max = `max_${feed}`;

  function AdjustHandler(e) {
    console.log(label);
    min = document.getElementById(`min_${feed}`).value;
    max = document.getElementById(`max_${feed}`).value;
    console.log(min, max);
    if (sessionStorage.getItem("username") !== null) {
      if (min !== "" && max !== "") {
        let data = `${feed}/${min}/${max}`;
        mqttclient.publish(`CanhHoang/feeds/threshold`, data);

        fetch("http://localhost:4000/threshold", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            min: min,
            max: max,
            type: feed,
          }),
        });
        console.log(feed, min, max);
      }
    } else {
      history.push("/login");
    }
  }

  return (
    <div className="card" id={id}>
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            {icon}
            <h5 className="card-title">{label}</h5>
            <p className="card-text">{data}</p>
          </div>
          <div className="col-8">
            <p>Điều chỉnh ngưỡng</p>
            <form action="" method="POST" className="myForm">
              <div className="row thres">
                <input
                  type="number"
                  id={id_min}
                  placeholder={min}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                />
              </div>
              <div className="row thres">
                <input
                  type="number"
                  id={id_max}
                  placeholder={max}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                />
              </div>
              <div className="row">
                <Popup
                  trigger={
                    <button
                      type="button"
                      className="btn btn-primary"
                      id="thres-btn"
                    >
                      Điều chỉnh
                    </button>
                  }
                  modal
                >
                  {(close) => (
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Xác nhận điều chỉnh</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          onClick={close}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          Bạn có chắc chắn muốn cập nhập ngưỡng của
                          <b> {label} </b> không ? <br />
                          Thông số {label} ban đầu là nhỏ nhất: <b> {min} </b>{" "}
                          và lớn nhất: <b>{max}</b>
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                          onClick={close}
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          data-dismiss="modal"
                          onClick={() => {
                            AdjustHandler();
                            close();
                          }}
                        >
                          Cập nhập
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
