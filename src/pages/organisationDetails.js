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
import PlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-places-autocomplete";
import Header from "../components/header";
import Spinner from "../components/spinner";

import "../styles/organisationDetails.css";

const OrganisationDetails = (props) => {
  const [phone, setPhone] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [pic2, setPic2] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mission, setMission] = useState("");
  const [policy, setPolicy] = useState("");
  const [edit, setEdit] = useState(false);
  const [procedure, setProcedure] = useState("");
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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          `/api/v1/animal_shelter_api/?user__id=${userId}`
      )
      .then((res) => {
        console.log(res.data);
        setName(res.data[0].organisations_name);
        setPhone(res.data[0].contact_no.substr(3));
        setAddressCity(res.data[0].city);
        setAddressState(res.data[0].state);
        setAddressZip(res.data[0].pincode);
        setPic(res.data[0].profile_pic);
        // setPic2(res.data[0].profile_pic);
        setPolicy(res.data[0].organisations_policies);
        setMission(res.data[0].organisations_mission);
        setProcedure(res.data[0].adoption_procedure);
        setId(res.data[0].id);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
      });
  }, []);

  const removeImg = () => {
    setPic("");
    setPic2("");
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
      formData.append("profile_pic", pic2);
      formData.append("organisations_policies", policy);
      formData.append("adoption_procedure", procedure);
      axios
        .put(
          process.env.REACT_APP_BASE_URL + `/api/v1/animal_shelter_api/${id}/`,
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
                <h2 className="pink mb-3">Organisation Details</h2>
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
                    {edit && (
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
                  <FormLabel>Organisation Name</FormLabel>

                  <FormControl
                    readOnly={edit ? false : true}
                    required
                    type="text"
                    placeholder="Organisation Name*"
                    className="mb-3 "
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <FormLabel>Phone number</FormLabel>
                  <InputGroup>
                    <InputGroup.Text className="mb-3">+91</InputGroup.Text>
                    <FormControl
                      readOnly={edit ? false : true}
                      required
                      type="text"
                      placeholder="Phone number*"
                      className={phoneErr ? "mb-3 hide input_err" : "mb-3 hide"}
                      onChange={(e) => validatePhone(e.target.value)}
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
                      readOnly={edit ? false : true}
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
                  {(edit || mission) && (
                    <>
                      <FormLabel>Organisation Mission</FormLabel>

                      <Form.Control
                        as="textarea"
                        rows={4}
                        className="mb-3 "
                        placeholder="Organisation Mission(if any)"
                        onChange={(e) => setMission(e.target.value)}
                        readOnly={edit ? false : true}
                        maxLength={100}
                        value={mission}
                      />
                    </>
                  )}

                  <FormLabel>Adoption Procedure</FormLabel>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    className="mb-3 "
                    placeholder="What is the Adoption Policy of your organisation?*"
                    onChange={(e) => setProcedure(e.target.value)}
                    readOnly={edit ? false : true}
                    maxLength={350}
                    value={procedure}
                  />
                  {(edit || policy) && (
                    <>
                      <FormLabel>Organisation Policy</FormLabel>

                      <Form.Control
                        as="textarea"
                        rows={4}
                        className="mb-3 "
                        placeholder="Organisation Policies(if any max 250 characters)"
                        onChange={(e) => setPolicy(e.target.value)}
                        readOnly={edit ? false : true}
                        maxLength={250}
                        value={policy}
                      />
                    </>
                  )}

                  {edit && (
                    <div className="row">
                      <div className="col-6">
                        <button
                          className="theme-color-pink text-center p-2  align-items-center login-submit mb-3"
                          type="submit"
                          onClick={(e) => sendShelterData(e)}
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
export default OrganisationDetails;
