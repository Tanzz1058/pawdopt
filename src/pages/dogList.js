import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import DogCard from "../components/dogCard";
import Header from "../components/header";
import Spinner from "../components/spinner";
import { Form } from "react-bootstrap";

const DogList = () => {
  const [list, setList] = useState([]);
  const [pin, setPin] = useState("");
  const [pincode, setPincode] = useState("");

  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/pet_api/?breed=${breed}&age=${age}&size=${size}&gender=${gender}&pincode=${pincode}`
      )
      .then((res) => {
        console.log(res.data);
        setLoad(false);
        setList(res.data);
      })
      .catch((e) => {
        setLoad(false);
        message.error("Something went wrong");
      });
  }, [breed, age, size, gender, pin]);

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
            <div className="d-flex">
              <FormControl
                type="text"
                placeholder="Search by Pincode"
                className="mb-3"
                onChange={(e) => setPincode(e.target.value)}
              />
              <i
                class="fa fa-search pink search-btn"
                aria-hidden="true"
                onClick={() => setPin(pincode)}
              ></i>
            </div>
            <div className="col-lg-4 d-none d-sm-none d-md-block">
              <ul className="p-2 filters-list">
                <li>
                  <div className="text-center fs-3">Filters</div>
                </li>
                <li>
                  <div className="text-center">Breed</div>
                  <Form.Select
                    aria-label="Select"
                    className="theme-color-pink mb-3 "
                    onChange={(e) => setBreed(e.target.value)}
                    style={{ backgroundColor: "#f36e6f", color: "#fff" }}
                  >
                    <option
                      value=""
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Select
                    </option>
                    <option
                      value="Unknown"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Unknown
                    </option>
                    <option
                      value="American Bulldog"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      American Bulldog
                    </option>
                    <option
                      value="Beagle"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Beagle
                    </option>
                    <option
                      value="Bhakarwal"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Bhakarwal Dog
                    </option>
                    <option
                      value="Boxer"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Boxer
                    </option>
                    <option
                      value="Chihuahua"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Chihuahua
                    </option>
                    <option
                      value="Cocker Spaniel"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Cocker Spaniel
                    </option>
                    <option
                      value="Dalmatian"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Dalmatian
                    </option>
                    <option
                      value="Doberman"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Doberman
                    </option>
                    <option
                      value="German Shepherd"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      German Shepherd
                    </option>
                    <option
                      value="Golden Retriever"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Golden Retriever
                    </option>
                    <option
                      value="Hound"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Hound
                    </option>
                    <option
                      value="Husky"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Husky
                    </option>
                    <option
                      value="Indian Pariah Dog"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Indian Pariah Dog
                    </option>
                    <option
                      value="Labrador"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Labrador
                    </option>
                    <option
                      value="Pomeranian"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Pomeranian
                    </option>
                    <option
                      value="Pug"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Pug
                    </option>
                    <option
                      value="Rottweiler"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Rottweiler
                    </option>
                    <option
                      value="Samoyed"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Samoyed
                    </option>
                    <option
                      value="Schitzu"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Schitzu
                    </option>
                    <option
                      value="St. Dermard"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      St. Dermard
                    </option>
                    <option
                      value="Others"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Others
                    </option>
                  </Form.Select>
                </li>
                <li>
                  <div className="text-center">Gender</div>
                  <Form.Select
                    aria-label="Select"
                    className="theme-color-pink mb-3"
                    onChange={(e) => setGender(e.target.value)}
                    style={{ backgroundColor: "#f36e6f", color: "#fff" }}
                  >
                    <option
                      value=""
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Select
                    </option>
                    <option
                      value="Male"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Male
                    </option>
                    <option
                      value="Female"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Female
                    </option>
                  </Form.Select>
                </li>
                <li>
                  <div className="text-center">Size</div>
                  <Form.Select
                    aria-label="Select"
                    className="theme-color-pink mb-3"
                    onChange={(e) => setSize(e.target.value)}
                    style={{ backgroundColor: "#f36e6f", color: "#fff" }}
                    value={size}
                  >
                    <option
                      value=""
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Select
                    </option>
                    <option
                      value="Puppy"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Puppy
                    </option>
                    <option
                      value="Medium"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Medium
                    </option>
                    <option
                      value="Adult"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Adult
                    </option>
                  </Form.Select>
                </li>
                <li>
                  <div className="text-center">Age(in yrs)</div>
                  <Form.Select
                    aria-label="Select"
                    className="theme-color-pink mb-3"
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                    style={{ backgroundColor: "#f36e6f", color: "#fff" }}
                  >
                    <option
                      value=""
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      Select
                    </option>
                    <option
                      value="less than 1"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      less than 1
                    </option>
                    <option
                      value="1"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      1
                    </option>
                    <option
                      value="2"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      2
                    </option>
                    <option
                      value="3"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      3
                    </option>
                    <option
                      value="4"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      4
                    </option>
                    <option
                      value="5"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      5
                    </option>
                    <option
                      value="6"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      6
                    </option>
                    <option
                      value="7"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      7
                    </option>
                    <option
                      value="8"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      9
                    </option>
                    <option
                      value="10"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      10
                    </option>
                    <option
                      value="11"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      11
                    </option>
                    <option
                      value="12"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      12
                    </option>
                    <option
                      value="13"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      13
                    </option>
                    <option
                      value="14"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      14
                    </option>
                    <option
                      value="15"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      15
                    </option>
                    <option
                      value="more than 15"
                      style={{ backgroundColor: "#fff", color: "black" }}
                    >
                      more than 15
                    </option>
                  </Form.Select>
                </li>
              </ul>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="row d-flex flex-wrap">
                {list.length == 0 ? (
                  <h1 className="text-center">No Results found</h1>
                ) : (
                  list.map((res) => (
                    <DogCard
                      name={res.name}
                      img={res.first_image}
                      location={res.city}
                      id={res.id}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DogList;
