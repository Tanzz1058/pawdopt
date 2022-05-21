import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
  FormLabel,
} from "react-bootstrap";
import Header from "../components/header";
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
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");

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

  const removeImg = () => {
    setPic("");
    setPic2("");
  };
  const setImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
        message.error("Please upload a jpg or png file");
        console.log(imageFile);
      } else {
        setPic(URL.createObjectURL(imageFile));
        setPic2(imageFile);
      }
    }
  };
  useEffect(() => {
    if (addressZip && edit) {
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
      formData.append("profile_pic", pic2);

      axios
        .put(
          process.env.REACT_APP_BASE_URL + `/api/v1/user_info/${id}/`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          message.success("Your information has been updated");
          setEdit(false);
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

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BASE_URL + `/api/v1/user_info/?user__id=${userId}`
      )
      .then((res) => {
        console.log(res.data);
        setId(res.data[0].id);
        setFirst(res.data[0].first_name);
        setLast(res.data[0].last_name);
        setPic(res.data[0].profile_pic);
        // setPic2(res.data[0].profile_pic);
        setAddressCity(res.data[0].city);
        setAddressState(res.data[0].state);
        setAddressZip(res.data[0].pincode);
        setIsLoading(false);
        setPhone(res.data[0].phone_number.substr(3));
      })
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
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
              <div className="org-detail-header">
                <h2 className="pink mb-3">User Details</h2>
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
                    {edit && (
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
                        {pic2 && edit && (
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
                    )}
                    {/* )} */}
                  </Row>
                  <div className="row">
                    <div className="col-6">
                      <FormLabel>First Name</FormLabel>

                      <FormControl
                        required
                        type="text"
                        placeholder="First Name*"
                        className="mb-3"
                        readOnly={edit ? false : true}
                        onChange={(e) => setFirst(e.target.value)}
                        value={first}
                      />
                    </div>
                    <div className="col-6">
                      <FormLabel>Last Name</FormLabel>

                      <FormControl
                        required
                        type="text"
                        placeholder="Last Name*"
                        className="mb-3"
                        onChange={(e) => setLast(e.target.value)}
                        readOnly={edit ? false : true}
                        value={last}
                      />
                    </div>
                  </div>
                  <FormLabel>Phone Number</FormLabel>

                  <InputGroup>
                    <InputGroup.Text className="mb-3">+91</InputGroup.Text>
                    <FormControl
                      required
                      type="number"
                      placeholder="Phone number*"
                      className={phoneErr ? "mb-3 hide input_err" : "mb-3 hide"}
                      onChange={(e) => validatePhone(e.target.value)}
                      readOnly={edit ? false : true}
                      value={phone}
                    />
                  </InputGroup>
                  {phoneErr && (
                    <p className="fs-7 red d-block">
                      {"Please enter a valid phone number"}
                    </p>
                  )}
                  <FormLabel>Pincode</FormLabel>

                  <div className="d-flex">
                    <FormControl
                      required
                      type="text"
                      placeholder="PIN Code*"
                      className="mb-3 "
                      onChange={(e) => setAddressZip(e.target.value)}
                      value={addressZip}
                      readOnly={edit ? false : true}
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
                  <FormLabel>City</FormLabel>

                  <FormControl
                    type="text"
                    placeholder="City*"
                    className="mb-3 "
                    readOnly
                    value={addressCity}
                    required
                    onChange={(e) => setAddressCity(e.target.value)}
                  />
                  <FormLabel>State</FormLabel>

                  <FormControl
                    required
                    type="text"
                    placeholder="State*"
                    className="mb-3 "
                    readOnly
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                  />

                  {edit && (
                    <div className="row">
                      <div className="col-6">
                        <button
                          className="theme-color-pink text-center p-2  align-items-center login-submit mb-3"
                          type="submit"
                          onClick={(e) => sendUserData(e)}
                        >
                          Submit
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="bg-white pink text-center p-2  align-items-center login-submit mb-3"
                          type="button"
                          style={{ border: "2px solid #f36e6f" }}
                          onClick={() => setEdit(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  {!edit && (
                    <button
                      className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                      type="button"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </button>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserDetails;
