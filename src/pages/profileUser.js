import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup, Row, Col } from "react-bootstrap";
import PlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-places-autocomplete";
import Header from "../components/header";
import Spinner from "../components/spinner";

import "../styles/organisationDetails.css";

const ProfileUser = (props) => {
  const [phone, setPhone] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState();
  const [pic, setPic] = useState("");
  const [pic2, setPic2] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mission, setMission] = useState("");
  const [policy, setPolicy] = useState("");
  const [name, setName] = useState("");
  const [procedure, setProcedure] = useState("");

  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  const ifProfileFilled = (id = userId) => {
    setIsLoading(true);
    if (userType == "CUS") {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/user_info/?user__id=${id}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.length != 0) {
            console.log("yc");
            localStorage.setItem("userInfoId", res.data[0].id);
            localStorage.setItem("profilePic", res.data[0].profile_pic);
            localStorage.setItem("phone", res.data[0].phone_number);
            localStorage.setItem("pincode", res.data[0].pincode);
            localStorage.setItem("state", res.data[0].state);
            localStorage.setItem("city", res.data[0].city);

            localStorage.setItem("firstName", res.data[0].first_name);
            localStorage.setItem("LastName", res.data[0].last_name);

            window.location.replace("/user-details");
            // console.log(res.data.contact_no);

            setIsLoading(false);
          } else {
            console.log("nc");

            setIsLoading(false);
          }
        })
        .catch((e) => {
          setIsLoading(false);

          console.log("something wrong");
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/animal_shelter_api/?user__id=${id}`
        )
        .then((res) => {
          console.log(res.data);
          console.log("ya");

          if (res.data.length > 0) {
            console.log("cccccccccccccccccccc");
            localStorage.setItem("userInfoId", res.data[0].id);
            localStorage.setItem("name", res.data[0].organisations_name);

            localStorage.setItem("profilePic", res.data[0].profile_pic);
            localStorage.setItem("phone", res.data[0].contact_no);
            localStorage.setItem("pincode", res.data[0].pincode);
            localStorage.setItem("state", res.data[0].state);
            localStorage.setItem("city", res.data[0].city);
            setIsLoading(false);

            window.location.replace("/details");
          } else {
            setIsLoading(false);
          }
        })
        .catch((e) => {
          setIsLoading(false);
          console.log("na");

          console.log("something wrong");
        });
    }
  };

  useEffect(() => {
    ifProfileFilled();
  }, []);

  //   const [addressCoordinates, setAddressCoordinates] = useState("");
  // const [googleLocationValue, setGoogleLocationValue] = useState(null);

  // function setAddressSuggestion(value) {
  //   console.log(value);
  //   try {
  //     setGoogleLocationValue(value);
  //     let place_id = value["placeId"];
  //     let address = value["description"];
  //     console.log(place_id);

  //     setAddress(address);
  //     geocodeByPlaceId(place_id)
  //       .then((results) => {
  //         let geoCodeData = results[0];
  //         console.log(geoCodeData);

  //         let formattedAddress = geoCodeData["formatted_address"];
  //         let city = "";
  //         let state = "";
  //         let zip_code = "";

  //         let address_components = geoCodeData["address_components"];

  //         for (let i = 0; i < address_components.length; i++) {
  //           let types = address_components[i]["types"];
  //           if (
  //             types.indexOf("administrative_area_level_1") > -1 &&
  //             types.indexOf("political") > -1
  //           ) {
  //             state = address_components[i]["long_name"];
  //           }
  //           if (types.indexOf("postal_code") > -1) {
  //             zip_code = address_components[i]["long_name"];
  //           }
  //           if (
  //             types.indexOf("locality") > -1 &&
  //             types.indexOf("political") > -1
  //           ) {
  //             city = address_components[i]["long_name"];
  //           }
  //         }

  //         setAddress(formattedAddress);
  //         setAddressCity(city);
  //         setAddressState(state);
  //         setAddressZip(zip_code);

  //         //   getLatLng(results[0]).then((location) => {
  //         //     // console.log( location );
  //         //     setAddressCoordinates({
  //         //       latitude: location["lat"],
  //         //       longitude: location["lng"],
  //         //     });
  //         //   });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  const setImage = (e) => {
    const imageFile = e.target.files[0];
    console.log(imageFile);
    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      message.error("Please upload a jpg or png file");
      console.log(imageFile);
    } else {
      setPic(URL.createObjectURL(imageFile));
      setPic2(imageFile);
    }
  };

  const removeImg = () => {
    setPic("");
    setPic2("");
  };
  const sendUserData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!err && !phoneErr && !load) {
      let formData = new FormData();
      formData.append("phone_number", `+91${phone}`);
      formData.append("first_name", first);
      formData.append("last_name", last);
      formData.append("pincode", addressZip);
      formData.append("city", addressCity);
      formData.append("state", addressState);
      formData.append("user", userId);
      if (pic2) {
        formData.append("profile_pic", pic2);
      }

      axios
        .post(process.env.REACT_APP_BASE_URL + `/api/v1/user_info/`, formData)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("userInfoId", res.data.id);
          localStorage.setItem("profilePic", res.data.profile_pic);
          localStorage.setItem("phone", res.data.phone_number);
          localStorage.setItem("pincode", res.data.pincode);
          localStorage.setItem("state", res.data.state);
          localStorage.setItem("city", res.data.city);

          localStorage.setItem("firstName", res.data.first_name);
          localStorage.setItem("LastName", res.data.last_name);
          setIsLoading(false);
          message.success("Your information has been updated");
          window.location.replace("/findpets");
        })
        .catch((e) => {
          console.log(e.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      if (err) {
        message.error("Please provide a valid PIN Code");
      } else {
        message.error("Please provide a valid phone number");
      }
    }
  };

  useEffect(() => {
    if (addressZip) {
      setLoad(true);

      axios
        .get(`https://api.postalpincode.in/pincode/${addressZip}`)
        .then((res) => {
          console.log(res);
          setLoad(false);
          if (res.data.Status == "Error") {
            setErr("Invalid PIN Code");
          } else {
            setErr("");
            setAddressCity(res.data[0]?.PostOffice[0].District);
            setAddressState(res.data[0]?.PostOffice[0].State);
          }
        })
        .catch((e) => {
          setLoad(false);
          setErr("Invalid PIN Code");
          setAddressCity("");
          setAddressState("");
        });
    }
  }, [addressZip]);

  const sendShelterData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!err && !phoneErr && !load) {
      let formData = new FormData();
      formData.append("contact_no", `+91${phone}`);
      formData.append("organisations_name", name);
      formData.append("organisations_mission", mission);
      formData.append("pincode", addressZip);
      formData.append("city", addressCity);
      formData.append("state", addressState);
      formData.append("user", userId);
      // if (pic2) {
      formData.append("profile_pic", pic2);
      // }
      formData.append("organisations_policies", policy);
      formData.append("adoption_procedure", procedure);
      axios
        .post(
          process.env.REACT_APP_BASE_URL + `/api/v1/animal_shelter_api/`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("userInfoId", res.data.id);
          localStorage.setItem("name", res.data.organisations_name);

          localStorage.setItem("profilePic", res.data.profile_pic);
          localStorage.setItem("phone", res.data.contact_no);
          localStorage.setItem("pincode", res.data.pincode);
          localStorage.setItem("state", res.data.state);
          localStorage.setItem("city", res.data.city);
          message.success("Your information has been submitted");
          window.location.replace("/applications");
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      if (err) {
        message.error("Please provide a valid PIN Code");
      } else {
        message.error("Please provide a valid phone number");
      }
    }
  };

  const validatePhone = (e) => {
    setPhone(e);
    const pattern = new RegExp(/^\d{10}$/);
    if (/^\d{10}$/.test(e)) {
      setPhoneErr(false);
    } else {
      setPhoneErr(true);
    }
    console.log(phoneErr);
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <>
      <div style={{ backgroundColor: "#F0ECFA" }}>
        {isLoading ? (
          <div className="spinner-container">
            <div className="d-flex justify-content-center">
              <Spinner size="large" show={true} />
            </div>
          </div>
        ) : (
          <></>
        )}
        {!isLoading && userType == "CUS" && (
          <div className="page_content">
            <div className="container m-auto">
              <div className="row justify-content-center">
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                  onClick={() => logout()}
                >
                  Log Out
                </div>
                <div className="org-detail-header">
                  <h2 className="pink mb-3">
                    Please fill in the following details
                  </h2>
                </div>
                <div className="org-detail-page">
                  <Form onSubmit={(e) => sendUserData(e)}>
                    <Row
                      className="profile_pic_container"
                      style={{ margin: "0 auto  1rem" }}
                    >
                      <Col>
                        <img src={pic || "/images/user.png"} alt="profile" />
                      </Col>
                      {/* {update && ( */}
                      <Col>
                        <input
                          type="file"
                          id="pic"
                          className="login_form_input"
                          onChange={(e) => setImage(e)}
                        />
                        <label for="pic" className="upload_label">
                          Upload a new Picture
                        </label>
                        <br />
                        {pic2 && (
                          <i
                            class="fa fa-times signup red signup"
                            aria-hidden="true"
                            onClick={() => removeImg()}
                          >
                            {" "}
                            Remove
                          </i>
                        )}
                      </Col>
                      {/* )} */}
                    </Row>
                    <div className="row">
                      <div className="col-6">
                        <FormControl
                          required
                          type="text"
                          placeholder="First Name*"
                          className="mb-3"
                          onChange={(e) => setFirst(e.target.value)}
                        />
                      </div>
                      <div className="col-6">
                        <FormControl
                          required
                          type="text"
                          placeholder="Last Name*"
                          className="mb-3"
                          onChange={(e) => setLast(e.target.value)}
                        />
                      </div>
                    </div>
                    <InputGroup>
                      <InputGroup.Text className="mb-3">+91</InputGroup.Text>
                      <FormControl
                        required
                        type="number"
                        placeholder="Phone number*"
                        className={
                          phoneErr ? "mb-3 hide input_err" : "mb-3 hide"
                        }
                        onChange={(e) => validatePhone(e.target.value)}
                      />
                    </InputGroup>
                    {phoneErr && (
                      <p className="fs-7 red d-block">
                        {"Please enter a valid phone number"}
                      </p>
                    )}
                    <div className="d-flex">
                      <FormControl
                        required
                        type="text"
                        placeholder="PIN Code*"
                        className="mb-3 "
                        onChange={(e) => setAddressZip(e.target.value)}
                        value={addressZip}
                      />
                      {load && (
                        <div
                          class="spinner-border spinner-border-sm m-2"
                          role="status"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      )}
                    </div>
                    <p style={{ color: "red" }}>{err}</p>

                    {/* <PlacesAutocomplete
                  value={address}
                  onChange={(value) => {
                    setAddress(value);
                  }}
                  onSelect={(address, placeid, suggestion) => {
                    setAddressSuggestion(suggestion);
                  }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: "Enter address ...*",
                          className: "form-control mb-3",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? {
                                backgroundColor: "#fafafa",
                                cursor: "pointer",
                              }
                            : {
                                backgroundColor: "#ffffff",
                                cursor: "pointer",
                              };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete> */}
                    <FormControl
                      type="text"
                      placeholder="City*"
                      className="mb-3 "
                      readOnly
                      value={addressCity}
                      required
                      onChange={(e) => setAddressCity(e.target.value)}
                    />
                    <InputGroup hasValidation>
                      <FormControl
                        required
                        type="text"
                        placeholder="State*"
                        className="mb-3 "
                        readOnly
                        value={addressState}
                        onChange={(e) => setAddressState(e.target.value)}
                      />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      Please fill this field.
                    </Form.Control.Feedback>

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
        )}
        {!isLoading && userType == "AS" && (
          <div className="page_content">
            <div className="container m-auto">
              <div className="row justify-content-center">
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                  onClick={() => logout()}
                >
                  Log Out
                </div>
                <div className="org-detail-header">
                  <h2 className="pink m-2">
                    Please fill in the following details
                  </h2>
                </div>
                <div className="org-detail-page">
                  <Form onSubmit={(e) => sendShelterData(e)}>
                    <Row
                      className="profile_pic_container"
                      style={{ margin: "0 auto  1rem" }}
                    >
                      <Col>
                        <img src={pic || "/images/user.png"} alt="profile" />
                      </Col>
                      {/* {update && ( */}
                      <Col>
                        <input
                          type="file"
                          id="pic"
                          className="login_form_input"
                          onChange={(e) => setImage(e)}
                        />
                        <label for="pic" className="upload_label">
                          Upload organisation logo
                        </label>
                        <br />
                        {pic2 && (
                          <i
                            class="fa fa-times red signup"
                            aria-hidden="true"
                            onClick={() => removeImg()}
                          >
                            {" "}
                            Remove
                          </i>
                        )}
                      </Col>
                      {/* )} */}
                    </Row>
                    <FormControl
                      required
                      type="text"
                      placeholder="Organisation Name*"
                      className="mb-3 "
                      onChange={(e) => setName(e.target.value)}
                    />
                    <InputGroup>
                      <InputGroup.Text className="mb-3">+91</InputGroup.Text>
                      <FormControl
                        required
                        type="number"
                        placeholder="Phone number*"
                        className={
                          phoneErr ? "mb-3 hide input_err" : "mb-3 hide"
                        }
                        onChange={(e) => validatePhone(e.target.value)}
                      />
                    </InputGroup>
                    {phoneErr && (
                      <p className="fs-7 red d-block">
                        {"Please enter a valid phone number"}
                      </p>
                    )}
                    <div className="d-flex">
                      <FormControl
                        required
                        type="text"
                        placeholder="PIN Code*"
                        className="mb-3 "
                        onChange={(e) => setAddressZip(e.target.value)}
                        value={addressZip}
                      />
                      {load && (
                        <div
                          class="spinner-border spinner-border-sm m-2"
                          role="status"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      )}
                    </div>
                    <p style={{ color: "red" }}>{err}</p>

                    {/* <PlacesAutocomplete
                  value={address}
                  onChange={(value) => {
                    setAddress(value);
                  }}
                  onSelect={(address, placeid, suggestion) => {
                    setAddressSuggestion(suggestion);
                  }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: "Enter address ...*",
                          className: "form-control mb-3",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? {
                                backgroundColor: "#fafafa",
                                cursor: "pointer",
                              }
                            : {
                                backgroundColor: "#ffffff",
                                cursor: "pointer",
                              };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete> */}
                    <FormControl
                      type="text"
                      placeholder="City*"
                      className="mb-3 "
                      readOnly
                      value={addressCity}
                      required
                      onChange={(e) => setAddressCity(e.target.value)}
                    />
                    <InputGroup hasValidation>
                      <FormControl
                        required
                        type="text"
                        placeholder="State*"
                        className="mb-3 "
                        readOnly
                        value={addressState}
                        onChange={(e) => setAddressState(e.target.value)}
                      />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      className="mb-3 "
                      placeholder={`What is the adoption procedure at your organisation?*(max 350 characters)`}
                      onChange={(e) => setProcedure(e.target.value)}
                      required
                      maxLength={350}
                    />
                    <Form.Control
                      as="textarea"
                      rows={4}
                      className="mb-3 "
                      placeholder="Organisation Mission(if any max 100 characters)"
                      onChange={(e) => setMission(e.target.value)}
                      maxLength={100}
                    />
                    <Form.Control
                      as="textarea"
                      rows={4}
                      className="mb-3 "
                      placeholder="Organisation Policies(if any max 250 characters)"
                      onChange={(e) => setPolicy(e.target.value)}
                      maxLength={250}
                    />

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
        )}
      </div>
    </>
  );
};
export default ProfileUser;
