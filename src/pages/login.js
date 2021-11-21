import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import "../styles/auth.css";
import "../styles/colors.css";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="container m-auto">
      <div className="row mt-5">
        <div className="col-lg-6 md-6 home-dog-image-container d-none d-lg-block">
          <img
            src="/images/home-dog-2.jpg"
            alt="dog"
            className="home-dog-img"
          />
        </div>
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
            <Form>
              <FormControl type="email" placeholder="Email" className="mb-3" />

              <FormControl
                type="password"
                placeholder="Password"
                className="mb-3"
              />
              <button
                className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                type="submit"
              >
                Submit
              </button>
            </Form>
            <p className="text-center p-2 col-12 align-items-center">
              Don't have an account?{" "}
              <span className="pink signup" onClick={() => navigate("/signup")}>
                Signup
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
