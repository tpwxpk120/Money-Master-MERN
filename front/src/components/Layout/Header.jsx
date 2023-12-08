import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import "../../styles/HeaderStyles.css";
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            Expense Management App
          </Link>
          <div className="navbar-nav ms-auto mb-2 mb-lg-0">
            <div className="nav-item">
              <p className="nav-link">
                <UserOutlined /> {loginUser && loginUser.name}
              </p>
            </div>
            <div className="nav-item">
              <button className="btn btn-danger" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
