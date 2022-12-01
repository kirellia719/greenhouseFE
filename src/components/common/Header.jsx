import React from "react";
import "../../assets/style/App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
const Header = () => {
  const [change, setChange] = React.useState(false);

  const handelLogout = () => {
    sessionStorage.removeItem("username");
    fetch("http://localhost:4000/logout", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    setChange(!change);
  };
  return (
    <div id="header">
      <div className="row">
        <div className="col-5">
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/data">Thông số</Link>
            </li>
            <li>
              <Link to="/stat/history">Thống kê</Link>
            </li>
            <li>
              <Link to="/device">Thiết bị</Link>
            </li>
          </ul>
        </div>
        <div className="col-7" id="regis">
          {sessionStorage.getItem("username") === null ? (
            <ul>
              <li>
                <Link to="/login">Đăng nhập</Link>
              </li>
              <li>
                <Link to="/register">Đăng ký</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li> {sessionStorage.getItem("username")} </li>
              <li onClick={handelLogout}>
                {" "}
                <Link to="/login">Đăng xuất</Link>{" "}
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export const history = createBrowserHistory({ forceRefresh: true });
export default Header;
