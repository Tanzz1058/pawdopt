import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Spinner from "../components/spinner";
import "../styles/applicationView.css";
import Modals from "../components/modal";

const ApplicationView = () => {
  const params = useParams();
  const userInfoId = localStorage.getItem("userInfoId");
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [accepted, setAccept] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = () => {
    setLoad(true);
    setModal(false);

    if (accepted === true) {
      axios
        .patch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/adoption_form/${params.id}/`,
          {
            status: "Accepted",
          }
        )
        .then((res) => {
          console.log(res.data);
          setLoad(false);
          message.success(
            "Status updated.You can now proceed the adoption procedure."
          );
          navigate("/applications");
        })
        .catch((e) => {
          setLoad(false);
          message.error("Something went wrong");
        });
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/adoption_form/${params.id}/`,
          {
            status: "Rejected",
          }
        )
        .then((res) => {
          console.log(res.data);
          setLoad(false);
          message.success("This application has been rejected.");
          navigate("/applications");
        })
        .catch((e) => {
          setLoad(false);
          message.error("Something went wrong");
        });
    }
  };

  useEffect(() => {
    setLoad(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/adoption_form/${params.id}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        // console.log(res.data.status != "Accepted");
        setLoad(false);
      })
      .catch((e) => {
        setLoad(false);
        message.error("Something went wrong");
      });
  }, []);

  const accept = () => {
    setModal(true);
    setAccept(true);
  };

  const reject = () => {
    setAccept(false);
    setModal(true);
  };

  return (
    <>
      {load ? (
        <div className="spinner-container">
          <div className="d-flex justify-content-center">
            <Spinner size="large" show={true} />
          </div>
        </div>
      ) : (
        <></>
      )}
      <Header />
      <Modals
        isModalVisible={modal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        body={"Are you sure?"}
      />
      <div className="page_content ">
        {!load && data && (
          <div className="container">
            <div className="row adoption-response">
              <h1 className="text-center mb-4">Adoption Form Response</h1>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Submitted On
                </span>{" "}
                : {new Date(data.created_at).toLocaleDateString()}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Pet name
                </span>{" "}
                : {data.pet_name}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Status
                </span>{" "}
                : {data.status}
              </p>
              <p className="form-p">
                <span class="accent" style={{ width: "50%" }}>
                  Applicant Name
                </span>{" "}
                :{data.customer_name}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Email
                </span>{" "}
                : {data.user_email}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Pincode
                </span>{" "}
                : {data.user_pincode}
              </p>

              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  State
                </span>{" "}
                : {data.user_state}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  City
                </span>{" "}
                : {data.user_city}
              </p>

              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Street Address
                </span>{" "}
                :{data.street_address}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Contact No.
                </span>{" "}
                :{data.phone_number}
              </p>

              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Do you rent a house or have your own ?
                </span>{" "}
                : {data.house}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Does anyone in your house have allergies to pets ?
                </span>{" "}
                : {data.is_allergies}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Do you have a fenced yard?
                </span>{" "}
                : {data.is_fenced}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Why do you want a dog?
                </span>{" "}
                : {data.why_do_you_want_a_dog}
              </p>

              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  How will your dog be confined to your own property?
                </span>
                : {data.dog_be_confined_to_your_own_property}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  How will you provide exercise for your dog?
                </span>{" "}
                : {data.provide_exercise}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  What training are you willing to provide for your dog?
                </span>{" "}
                : {data.training_willing_to_provide}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  How will you correct your dog if it misbehaves?
                </span>{" "}
                : {data.correct_dog_if_misbehaves}
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  How much do you think it takes to support a dog?
                </span>{" "}
                :<span> {data.takes_to_support_a_dog}</span>
              </p>
              <p className="form-p">
                <span className="accent" style={{ width: "50%" }}>
                  Why did you choose this particular dog to adopt?
                </span>{" "}
                : {data.choose_this_particular_dog}
              </p>
            </div>
            {userType == "AS" && data.status == "pending" && (
              <div className="row" style={{ width: "80%", margin: "auto" }}>
                <div className="col-6">
                  <button
                    className="theme-color-pink text-center p-2  align-items-center login-submit mb-3"
                    type="submit"
                    onClick={() => accept()}
                  >
                    Accept
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="bg-white pink text-center p-2  align-items-center login-submit mb-3"
                    type="button"
                    style={{ border: "2px solid #f36e6f" }}
                    onClick={() => reject()}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationView;
