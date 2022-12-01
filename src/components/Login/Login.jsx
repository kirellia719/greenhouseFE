import { Link } from "react-router-dom";
import React from "react";
import { history } from "../common/Header";
import "../../assets/style/Login.css";

function Login() {
  const [isLogin, setIsLogin] = React.useState(false);
  if (sessionStorage.getItem("username") !== null) {
    history.push("/");
  }
  const handleLogin = (e) => {
    e.preventDefault();
    var { uname, pass } = document.forms[0];
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: uname.value,
        password: pass.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res == "Invalid user") {
          setIsLogin(true);
          console.log(res);
        } else {
          sessionStorage.setItem("username", res.username);
          history.push("/");
        }
      });
  };
  return (
    <div className="container login">
      <h3>Login</h3>
      <form>
        <div className="mb-3 form-login">
          <label className="form-label label-login">Tên đăng nhập *</label>
          <input
            type="text"
            className="form-control input-login"
            name="uname"
            onKeyDown={() => setIsLogin(false)}
          ></input>
        </div>
        <div className="mb-3 form-login">
          <label className="form-label label-login">Mật Khẩu *</label>
          <input
            type="password"
            className="form-control input-login"
            name="pass"
            onKeyDown={() => setIsLogin(false)}
          ></input>
        </div>
        {isLogin && (
          <div className="alert alert-danger">
            Tên đăng nhập hoặc mật khẩu không đúng
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary btn-login"
          onClick={handleLogin}
        >
          ĐĂNG NHẬP
        </button>
        <div>
          <Link to="/register" className="go-to-register">
            Bạn chưa có tài khoản ?
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
