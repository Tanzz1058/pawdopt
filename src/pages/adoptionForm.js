import React from "react";
import { Form, FormControl, FormLabel, Dropdown } from "react-bootstrap";
import Header from "../components/header";

const AdoptionForm = () => {
  return (
    <>
      <Header />
      <div className="page_content">
        <div className="container">
          <div className="row">
            <h1 className="text-center mb-4">Adoption Form</h1>
            <div className="form-container">
              <Form>
                <FormLabel className="bold fs-4">Personal Details</FormLabel>
                <div className="row">
                  <div className="col-6">
                    <FormLabel>First Name</FormLabel>
                    <FormControl type="text" placeholder="" className="mb-3 " />
                  </div>
                  <div className="col-6">
                    <FormLabel>Last Name</FormLabel>

                    <FormControl type="text" placeholder="" className="mb-3 " />
                  </div>
                </div>
                <FormLabel>Phone Number</FormLabel>
                <FormControl type="phone" placeholder="" className="mb-3" />
                <FormLabel>Email</FormLabel>
                <FormControl type="email" placeholder="" className="mb-3" />
                <FormLabel>Occupation</FormLabel>
                <FormControl type="text" placeholder="" className="mb-3 " />
                <FormLabel>Employer's Phone Number(If applicable)</FormLabel>
                <FormControl type="phone" placeholder="+91" className="mb-3 " />

                <FormLabel className="bold fs-4">Address</FormLabel>
                <div className="row">
                  <div className="col-6">
                    <FormControl
                      type="text"
                      placeholder="State"
                      className="mb-3 "
                    />
                  </div>
                  <div className="col-6">
                    <FormControl
                      type="text"
                      placeholder="City"
                      className="mb-3 "
                    />
                  </div>
                </div>
                <FormControl
                  type="text"
                  placeholder="Street Address"
                  className="mb-3 "
                />
                <FormControl
                  type="text"
                  placeholder="Pincode"
                  className="mb-3 "
                />

                <FormLabel className="bold fs-4">Adoption Question</FormLabel>
                <br />
                <FormLabel>Do you rent a house or have your own ?</FormLabel>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle>Any</Dropdown.Toggle>
                  <Dropdown.Menu className="filters-list-dropdown">
                    <Dropdown.Item active></Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Rented</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Own House</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <FormLabel>
                  Does anyone in your house have allergies to pets ?
                </FormLabel>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle>Any</Dropdown.Toggle>
                  <Dropdown.Menu className="filters-list-dropdown">
                    <Dropdown.Item active></Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Yes</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">No</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <FormLabel>Do you have a fenced yard?</FormLabel>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle>Any</Dropdown.Toggle>
                  <Dropdown.Menu className="filters-list-dropdown">
                    <Dropdown.Item active></Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Yes</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">No</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <FormLabel>Why do you want a dog?</FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                ></textarea>

                <FormLabel>
                  How will your dog be confined to your own property?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                ></textarea>

                <FormLabel>
                  How will you provide exercise for your dog?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                ></textarea>

                <FormLabel>
                  What training are you willing to provide for your dog?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                ></textarea>

                <FormLabel>
                  How will you correct your dog if it misbehaves?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                ></textarea>

                <FormLabel>
                  How much do you think it takes to support a dog?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
                ></textarea>

                <FormLabel>
                  Why did you choose this particular dog to adopt?
                </FormLabel>
                <textarea
                  className="form-control mb-3"
                  id="textAreaExample1"
                  rows="4"
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
