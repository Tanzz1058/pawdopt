import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import DogCard from "../components/dogCard";
import Header from "../components/header";
import Spinner from "../components/spinner";

const DogList = () => {
  const [list, setList] = useState([]);
  const [pin, setPin] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/pet_api/?breed=${breed}&age=${age}&size=${size}&gender=${gender}`
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
  }, [breed, age, size, gender]);
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
              />
              <i class="fa fa-search pink search-btn" aria-hidden="true"></i>
            </div>
            <div className="col-lg-4 d-none d-sm-none d-md-block">
              <ul className="p-2 filters-list">
                <li>
                  <div className="text-center fs-3">Filters</div>
                </li>
                <li>
                  <div className="text-center">Breed</div>
                  <Dropdown>
                    <Dropdown.Toggle>Any</Dropdown.Toggle>
                    <Dropdown.Menu className="filters-list-dropdown">
                      <Dropdown.Item href="#/action-1" active>
                        Action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-4">
                        Separated link
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <div className="text-center">Age</div>
                  <Dropdown>
                    <Dropdown.Toggle>Any</Dropdown.Toggle>
                    <Dropdown.Menu className="filters-list-dropdown">
                      <Dropdown.Item href="#/action-1" active>
                        Action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#/action-4">
                        Separated link
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <div className="text-center">Size</div>
                  <Dropdown>
                    <Dropdown.Toggle>Any</Dropdown.Toggle>
                    <Dropdown.Menu className="filters-list-dropdown">
                      <Dropdown.Item href="#/action-1" active>
                        Action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#/action-4">
                        Separated link
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <div className="text-center">Gender</div>
                  <Dropdown>
                    <Dropdown.Toggle>Any</Dropdown.Toggle>
                    <Dropdown.Menu className="filters-list-dropdown">
                      <Dropdown.Item href="#/action-1" active>
                        Action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#/action-4">
                        Separated link
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
                      // location={res.city}
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
