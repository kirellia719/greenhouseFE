import React from "react";
import "../../assets/style/SideBar.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
const SideBar = (props) => {
  return (
    <>
      <div id="side_bar">
        <div className="row">
          <Link className="link" to="/stat/history" exact>
            Lịch sử thiết bị
          </Link>
        </div>
        <div className="row">
          <Link className="link" to="/stat/daily-stat" exact>
            Đồ thị thời gian thực
          </Link>
        </div>
        <div className="row">
          <Link className="link" to="/stat/weekly-stat" exact>
            Đồ thị theo tuần
          </Link>
        </div>
        <div className="row">
          <Link className="link" to="/notification" exact>
            Thông báo
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
