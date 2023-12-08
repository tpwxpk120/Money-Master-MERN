import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";
import PropTypes from "prop-types";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const submitHandler = async () => {
    console.log(typeof form.getFieldsValue());
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.getFieldsValue()),
        }
      );
      if (response.status === 201) {
        navigate("/login");
      }
      console.log(response);
    } catch (error) {}
  };

  // Prevent logged-in users from accessing the registration page
  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      <Form
        className="register-form"
        layout="vertical"
        form={form}
        onFinish={submitHandler}
      >
        <h2>Register Form</h2>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <div className="d-flex justify-content-between">
          <Link to="/login">Already Registered? Login here!</Link>
          <button className="btn">Register</button>
        </div>
      </Form>
    </div>
  );
};

Register.propTypes = {
  navigate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
};

export default Register;
