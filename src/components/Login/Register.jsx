import "../../assets/style/Login.css";
import React from "react";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const [rePass, setRePass] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    var { fullname, uname, email, pass, repass } = document.forms[0];
    if (pass.value !== repass.value) {
      setRePass(true);
      return;
    }
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullname.value,
        username: uname.value,
        password: pass.value,
        email: email.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res !== "success") {
          setRePass(true);
        } else {
          alert("Đăng ký thành công");
          history.push("/login");
        }
      });
  };
  return (
    <div className="register">
      <form>
        <div className="mb-3 form-login">
          <label className="form-label label-login">Họ và tên:</label>
          <input
            type="text"
            className="form-control input-login"
            name="fullname"
          ></input>
        </div>
        <div className="mb-3 form-login">
          <label className="form-label label-login">Tên đăng nhập:</label>
          <input
            type="text"
            className="form-control input-login"
            name="uname"
          ></input>
        </div>
        <div className="mb-3 form-login">
          <label className="form-label label-login">Email:</label>
          <input
            type="text"
            className="form-control input-login"
            name="email"
          ></input>
        </div>
        <div className="mb-3 form-login">
          <label className="form-label label-login">Mật Khẩu:</label>
          <input
            type="password"
            className="form-control input-login"
            name="pass"
            onKeyDown={() => setRePass(false)}
          ></input>
        </div>
        <div className="mb-3 form-login">
          <label className="form-label label-login">Nhập lại mật khẩu:</label>
          <input
            type="password"
            className="form-control input-login"
            name="repass"
            onKeyDown={() => setRePass(false)}
          ></input>
        </div>
        {rePass && <div className="alert alert-danger">ĐĂNG KÝ</div>}
        {/* {isSuccess && <div className="alert alert-success">Đăng ký thành công</div>} */}
        <button
          type="submit"
          className="btn btn-primary btn-login"
          onClick={handleSubmit}
        >
          ĐĂNG KÝ
        </button>
      </form>
    </div>
  );
}
export default Register;
