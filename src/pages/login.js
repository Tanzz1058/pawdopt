import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Form, FormControl, Carousel, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import "../styles/auth.css";
import "../styles/colors.css";

const Login = () => {
  const navigate = useNavigate();
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const forgotPassword = (e) => {
    e.preventDefault();
    if (email) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/users/reset_password/`, {
          email: email,
        })
        .then((res) => {
          console.log(res);
          message.success("An email has been sent to reset your password");
        })
        .catch((e) => {
          console.log(e);
          message.error(
            e.response.data?.email?.[0] ||
              "Someting went wrong please try again later"
          );
        });
    }
  };

  const login = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/token/login/`, {
        email: email,
      })
      .then((res) => {
        console.log(res);
        message.success("An email has been sent to reset your password");
      })
      .catch((e) => {
        console.log(e);
        message.error(
          e.response.data?.email?.[0] ||
            e.response.data?.password?.[0] ||
            "Someting went wrong please try again later"
        );
      });
  };

  return (
    <div className="page_content">
      <div className="container m-auto">
        <div className="row mt-3">
          <div className="col-lg-6 md-6 home-dog-image-container d-none d-lg-block">
            <Carousel
              controls={false}
              interval={5000}
              indicators={false}
              pause={false}
              fade={true}
              // style={{ marginTop: -20 }}
            >
              <Carousel.Item className="home-dog-image-container">
                <img
                  src="/images/home-dog-2.jpg"
                  alt="dog"
                  className="home-dog-img"
                />
              </Carousel.Item>
              <Carousel.Item className="home-dog-image-container">
                <img
                  src="/images/adoption.jpg"
                  alt="dog"
                  className="home-dog-img"
                />
              </Carousel.Item>
              <Carousel.Item className="home-dog-image-container">
                <img
                  src="/images/adoption2.jpg"
                  alt="dog"
                  className="home-dog-img"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          {forgot ? (
            <div className="col-lg-6 md-6 sm-12 align-self-center">
              <div className="row text-center justify-content-between mb-5">
                <h1>Reset Your Password</h1>
              </div>
              <div className="row">
                <Form onSubmit={(e) => forgotPassword(e)}>
                  <div className="row justify-content-between">
                    <FormControl
                      type="email"
                      placeholder="Email"
                      className="mb-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      className="theme-color-pink text-center p-2 col-6 align-items-center login-submit mb-3 "
                      type="submit"
                      style={{ width: "48%" }}
                    >
                      Submit
                    </button>
                    <button
                      className="theme-color-pink text-center p-2 col-6 align-items-center login-submit mb-3 "
                      onClick={() => setForgot(false)}
                      style={{ width: "48%" }}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          ) : (
            <div className="col-lg-6 md-6 sm-12 align-self-center">
              <div className="row text-center justify-content-between mb-5">
                <h1>
                  Login to Pawd
                  <span>
                    <i class="fa fa-paw pink" aria-hidden="true"></i>
                  </span>
                  pt
                </h1>
              </div>
              <div className="row">
                <Form onSubmit={(e) => login(e)}>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    className="mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />

                  <FormControl
                    type="password"
                    placeholder="Password"
                    className="mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                    type="submit"
                  >
                    Submit
                  </button>
                </Form>

                <span
                  className="pink signup text-center"
                  onClick={() => setForgot(true)}
                >
                  Forgot Password?
                </span>

                <p className="text-center p-2 col-12 align-items-center">
                  Don't have an account?{" "}
                  <span
                    className="pink signup"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
