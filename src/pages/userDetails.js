import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup, Row, Col } from "react-bootstrap";
import PlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-places-autocomplete";
import Spinner from "../components/spinner";

import "../styles/organisationDetails.css";

const UserDetails = (props) => {
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

  const userId = localStorage.getItem("userId");

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

    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      message.error("Please upload a jpg or png file");
      console.log(imageFile);
    } else {
      setPic(URL.createObjectURL(imageFile));
      setPic2(imageFile);
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
      formData.append("first_name", first);
      formData.append("last_name", last);
      formData.append("pincode", addressZip);
      formData.append("city", addressCity);
      formData.append("state", addressState);
      formData.append("user", userId);
      formData.append("profile_pic", pic2);

      axios
        .post(process.env.REACT_APP_BASE_URL + `/api/v1/user_info/`, formData)
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          message.success("Your information has been updated");
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
              <h2 className="white">Please fill in the following details</h2>
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
                      Upload a new Picture
                    </label>
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
                    className={phoneErr ? "mb-3 hide input_err" : "mb-3 hide"}
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
    </div>
  );
};
export default UserDetails;
