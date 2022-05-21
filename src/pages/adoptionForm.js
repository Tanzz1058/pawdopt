import React, { useState } from "react";
import { Form, FormControl, FormLabel, Dropdown } from "react-bootstrap";
import Header from "../components/header";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { message } from "antd";
import Spinner from "../components/spinner";

const AdoptionForm = () => {
  const navigate = useNavigate();
  const state = localStorage.getItem("state");
  const city = localStorage.getItem("city");
  const pincode = localStorage.getItem("pincode");
  const userId = localStorage.getItem("userId");
  const userInfoId = localStorage.getItem("userInfoId");

  const params = useParams();

  const [err, setErr] = useState();
  const [load, setLoad] = useState(false);
  // const [state, setState] = useState();
  // const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [occupation, setOccupation] = useState();
  const [rent, setRent] = useState("");
  const [allergy, setAllergy] = useState();
  const [fenced, setFenced] = useState();
  const [whydog, setWhydog] = useState("");
  const [exercise, setExercise] = useState("");
  const [confined, setConfined] = useState("");
  const [particular, setParticular] = useState("");
  const [misbehave, setMisbehave] = useState("");
  const [support, setSupport] = useState("");
  const [training, setTraining] = useState("");

  // useEffect(() => {
  // }, []);

  // useEffect(() => {
  //   if (pincode) {
  //     setLoad(true);

  //     axios
  //       .get(`https://api.postalpincode.in/pincode/${pincode}`)
  //       .then((res) => {
  //         console.log(res);
  //         setLoad(false);
  //         if (res.data.Status == "Error") {
  //           setErr("Invalid PIN Code");
  //         } else {
  //           setErr("");
  //           setCity(res.data[0]?.PostOffice[0].District);
  //           setState(res.data[0]?.PostOffice[0].State);
  //         }
  //       })
  //       .catch((e) => {
  //         setLoad(false);
  //         setErr("Invalid PIN Code");
  //         setCity("");
  //         setState("");
  //       });
  //   }
  // }, [pincode]);

  const sendForm = (e) => {
    e.preventDefault();
    if (rent && allergy && fenced) {
      setLoad(true);
      let formData = new FormData();
      formData.append("house", rent);
      formData.append("user_id", userId);
      formData.append("user_info_id", userInfoId);
      formData.append("animal_shelter_id", params.shelterId);
      formData.append("pet", params.petId);
      formData.append("is_allergies", allergy);
      formData.append("is_fenced", fenced);
      formData.append("why_do_you_want_a_dog", whydog);
      formData.append("dog_be_confined_to_your_own_property", confined);
      formData.append("provide_exercise", exercise);
      formData.append("training_willing_to_provide", training);
      formData.append("correct_dog_if_misbehaves", misbehave);
      formData.append("takes_to_support_a_dog", support);
      formData.append("choose_this_particular_dog", particular);
      formData.append("street_address", address);
      formData.append("city", city);
      formData.append("state", state);

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/adoption_form/`,
          formData
        )
        .then((res) => {
          console.log(res);

          message.success("Your form has been submitted");
          setLoad(false);
          navigate("/applications");
        })
        .catch((e) => {
          console.log(e);
          message.error("Someting went wrong please try again later");
          setLoad(false);
        });
    } else {
      message.error("Please fill in the mandatory fields");
    }
  };
  return (
    <>
      <Header />
      {load ? (
        <div className="spinner-container">
          <div className="d-flex justify-content-center">
            <Spinner size="large" show={true} />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="page_content">
        <div className="container">
          <div className="row">
            <h1 className="text-center mb-4">Adoption Form</h1>
            <div className="form-container">
              <Form onSubmit={(e) => sendForm(e)}>
                {/* <FormLabel className="bold fs-4">Personal Details</FormLabel>
                <FormLabel>Occupation</FormLabel>
                <FormControl
                  type="text"
                  placeholder=""
                  className="mb-3 "
                  required
                  onChange={(e) => setOccupation(e.target.value)}
                  value={occupation}
                  
                /> */}
                {/* <FormLabel>Employer's Phone Number(If applicable)</FormLabel>
                <FormControl
                  type="phone"
                  placeholder="+91"
                  className="mb-3 "
                  required
                /> */}

                <FormLabel className="bold fs-4">Address</FormLabel>
                <div className="row">
                  <div className="col-6">
                    <FormControl
                      type="text"
                      placeholder="State"
                      className="mb-3 "
                      value={state}
                      required
                      // onChange={(e) => setState(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="col-6">
                    <FormControl
                      type="text"
                      placeholder="City"
                      className="mb-3 "
                      required
                      // onChange={(e) => setCity(e.taget.value)}
                      value={city}
                      readOnly
                    />
                  </div>
                </div>
                <FormControl
                  type="text"
                  placeholder="Street Address"
                  className="mb-3 "
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  required
                />
                <FormControl
                  type="text"
                  placeholder="Pincode"
                  className="mb-3 "
                  required
                  value={pincode}
                  required
                  readOnly
                />

                <FormLabel className="bold fs-4">Adoption Question</FormLabel>
                <br />
                <FormLabel>Do you rent a house or have your own ?</FormLabel>
                <Form.Select
                  aria-label="Select"
                  className="theme-color-pink mb-3"
                  onChange={(e) => setRent(e.target.value)}
                  style={{ backgroundColor: "#f36e6f", color: "#fff" }}
                >
                  <option
                    value=""
                    style={{ backgroundColor: "#fff", color: "black" }}
                  >
                    Any
                  </option>
                  <option
                    value="rent"
                    style={{ backgroundColor: "#fff", color: "black" }}
                  >
                    Rented
                  </option>
                  <option
                    value="own house"
                    style={{ backgroundColor: "#fff", color: "black" }}
                  >
                    Own House
                  </option>
                </Form.Select>
                <FormLabel>
                  Does anyone in your house have allergies to pets ?
                </FormLabel>
                <Form.Select
                  aria-label="Select"
                  className="theme-color-pink mb-3"
                  onChange={(e) => setAllergy(e.target.value)}
                  style={{ backgroundColor: "#f36e6f", color: "#fff" }}
                >
                  <option
                    value=""
                    style={{ backgroundColor: "#fff", color: "black" }}
                  >
                    Any
                  </option>
                  <option
                    value="true"
                    style={{ backgroundColor: "#fff", color: "black" }}
                  >
                    Yes
                  </option>
                  <option
                    value="false"
                    style={{ backgroundColor: "#fff", color: "black" }}
                  >
                    No
                  </option>
                </Form.Select>
                <FormLabel>Do you have a fenced yard?</FormLabel>
                <Form.Select
                  aria-label="Select"
                  className="theme-color-pink mb-3"
                  onChange={(e) => setFenced(e.target.value)}
                  style={{ backgroundColor: "#f36e6f", color: "#fff" }}
                >
                  <option
                    value=""
                    style={{ backgroundColor: "#fff", color: "black" }}
                  >
                    Any
                  </option>
                  <option
                    value="true"
                    style={{ backgroundColor: "#fff", color: "black" }}
                  >
                    Yes
                  </option>
                  <option
                    value="false"
                    style={{ backgroundColor: "#fff", color: "black" }}
                  >
                    No
                  </option>
                </Form.Select>

                <FormLabel>Why do you want a dog?</FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                  required
                  value={whydog}
                  onChange={(e) => setWhydog(e.target.value)}
                  maxLength={350}
                ></textarea>

                <FormLabel>
                  How will your dog be confined to your own property?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                  required
                  value={confined}
                  maxLength={350}
                  onChange={(e) => setConfined(e.target.value)}
                ></textarea>

                <FormLabel>
                  How will you provide exercise for your dog?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                  required
                  maxLength={350}
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                ></textarea>

                <FormLabel>
                  What training are you willing to provide for your dog?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                  required
                  maxLength={350}
                  value={training}
                  onChange={(e) => setTraining(e.target.value)}
                ></textarea>

                <FormLabel>
                  How will you correct your dog if it misbehaves?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                  required
                  maxLength={350}
                  value={misbehave}
                  onChange={(e) => setMisbehave(e.target.value)}
                ></textarea>

                <FormLabel>
                  How much do you think it takes to support a dog?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                  required
                  maxLength={350}
                  value={support}
                  onChange={(e) => setSupport(e.target.value)}
                ></textarea>

                <FormLabel>
                  Why did you choose this particular dog to adopt?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                  required
                  maxLength={350}
                  value={particular}
                  onChange={(e) => setParticular(e.target.value)}
                ></textarea>

                <button
                  className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptionForm;
