import React, { useEffect, useState } from "react";
import { Form, FormControl, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router";
// import firebase from "../firebase";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getDatabase, onValue, ref, set } from "firebase/database";

import "../styles/auth.css";
import "../styles/colors.css";
import { message } from "antd";
import axios from "axios";
// import auth from "../firebase";

const Signup = (props) => {
  const navigate = useNavigate();
  // const db = getDatabase();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  //test code
  // useEffect(() => {
  //   const starCountRef = ref(db, "users/");
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     var f = [];
  //     for (var key in data) {
  //       console.log(data[key]);
  //       f.push(data[key]);
  //     }

  //   });
  // }, []);

  function register(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("first_name", name);
    formData.append("user_name", username);
    formData.append("password", password);
    selectedOption == "shelter"
      ? formData.append("user_type", "AS")
      : formData.append("user_type", "CUS");
    if (password !== passwordConfirm) {
      message.error("Passwords do not match");
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/users/`, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          message.error(
            e.response.data?.password?.[0] ||
              e.response.data?.email?.[0] ||
              e.response.data?.user_name?.[0] ||
              e.response.data?.non_field_errors?.[0] ||
              "Someting went wrong please try again later"
          );
        });
    }
  }

  return (
    <div className="page_content">
      <div className="container m-auto">
        <div className="row mt-3">
          <div className="col-lg-6 md-6 d-none d-lg-block">
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
          <div className="col-lg-6 md-6 sm-12 align-self-center">
            {!selectedOption && (
              <div className="row text-center">
                <h2 className="mb-4">
                  Who all can register to Pawd
                  <span>
                    <i class="fa fa-paw pink" aria-hidden="true"></i>
                  </span>
                  pt?
                </h2>
                <div
                  className="col-6 align-self-center"
                  onClick={() => setSelectedOption("shelter")}
                >
                  <div className="mt-2 register-box p-2">
                    <div>
                      <img src="/images/shelter.png" alt="dog" />
                    </div>
                    <div>Animal Shelters</div>
                  </div>
                </div>
                <div
                  className="col-6 align-self-center"
                  onClick={() => setSelectedOption("shelter")}
                >
                  <div className="mt-2 register-box p-2">
                    <div>
                      <img
                        alt="dog"
                        src="/images/welfare.png"
                        className="image-width-48"
                      />
                    </div>
                    <div>Animal Welfare Societies</div>
                  </div>
                </div>
                <div
                  className="col-6 align-self-center"
                  onClick={() => setSelectedOption("shelter")}
                >
                  <div className="mt-2 register-box p-2">
                    <div>
                      <img
                        src="/images/ngo.png"
                        className="image-width-48"
                        alt="dog"
                      />
                    </div>
                    <div>NGOs/Foundations</div>
                  </div>
                </div>
                <div
                  className="col-6 align-self-center"
                  onClick={() => setSelectedOption("user")}
                >
                  <div className="mt-2 register-box p-2">
                    <div>
                      <img
                        src="/images/pet.png"
                        className="image-width-48"
                        alt="dog"
                      />
                    </div>
                    <div>People looking for pets</div>
                  </div>
                </div>
              </div>
            )}
            {selectedOption == "user" && (
              <div className="row">
                <Form onSubmit={(e) => register(e)}>
                  <div className="row text-center justify-content-between mb-5">
                    <h1>
                      Register to Pawd
                      <span>
                        <i class="fa fa-paw pink" aria-hidden="true"></i>
                      </span>
                      pt
                    </h1>
                  </div>
                  <button
                    className="theme-color-pink text-center p-2 align-items-center login-submit mb-3"
                    onClick={() => setSelectedOption("")}
                  >
                    Change user type
                  </button>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    className="mb-3"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormControl
                    type="text"
                    placeholder="Username"
                    className="mb-3"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <FormControl
                    type="text"
                    placeholder="Name"
                    className="mb-3 "
                    required
                    onChange={(e) => setName(e.target.value)}
                  />

                  <FormControl
                    type="password"
                    placeholder="Password (min. 8 characters)"
                    className="mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                  />
                  <FormControl
                    type="password"
                    placeholder="Confirm Password"
                    className="mb-3"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <button
                    className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                    type="submit"
                  >
                    Submit
                  </button>
                </Form>
              </div>
            )}
            {selectedOption == "shelter" && (
              <div className="row">
                <Form onSubmit={(e) => register(e)}>
                  <div className="row text-center justify-content-between mb-5">
                    <h1>
                      Register to Pawd
                      <span>
                        <i class="fa fa-paw pink" aria-hidden="true"></i>
                      </span>
                      pt
                    </h1>
                  </div>
                  <button
                    className="theme-color-pink text-center p-2 align-items-center login-submit mb-3"
                    onClick={() => setSelectedOption("")}
                  >
                    Change user type
                  </button>

                  <FormControl
                    type="email"
                    placeholder="Email"
                    className="mb-3"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <FormControl
                    type="text"
                    placeholder="Username"
                    className="mb-3"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <FormControl
                    type="password"
                    placeholder="Password"
                    className="mb-3"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormControl
                    type="password"
                    placeholder="Confirm Password"
                    className="mb-3"
                    required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />

                  <button
                    className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                    type="submit"
                  >
                    Submit
                  </button>
                </Form>
              </div>
            )}

            <p className="text-center p-2 col-12 align-items-center">
              Already have an account?{" "}
              <span className="pink signup" onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
