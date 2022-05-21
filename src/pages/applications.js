import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ApplicationComponent from "../components/applicationComponent";
import Header from "../components/header";
import Spinner from "../components/spinner";

const Applications = () => {
  const userInfoId = localStorage.getItem("userInfoId");
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const [load, setLoad] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const endpoint =
      userType == "AS"
        ? `/api/v1/adoption_form/?animal_shelter_id__id=${userInfoId}`
        : `/api/v1/adoption_form/?user_id__id=${userId}`;

    setLoad(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}${endpoint}`)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
        setLoad(false);
      })
      .catch((e) => {
        setLoad(false);
        message.error("Something went wrong");
      });
  }, []);

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
      <div className="page_content ">
        <div className="container">
          <h2 className="text-center">Applications</h2>

          {/* <div className="row"> */}
          <div className="invites-list ">
            <table className="scrollable-list">
              {!load && list?.length != 0 && (
                <tr className="invite-row">
                  <td className="heading-cell ">
                    <div className="invite-customer-name">
                      <div className="invite-name-description">
                        <h1>
                          {userType == "AS"
                            ? "Applicant Name"
                            : "Name of the Organisation"}
                        </h1>
                      </div>
                    </div>
                  </td>
                  <td className="heading-cell ">
                    <div className="job-invite">
                      <h3>Pet Name</h3>
                    </div>
                  </td>
                  <td className="heading-cell ">
                    <div className="date-invite">
                      <h3>Applied On</h3>
                    </div>
                  </td>
                  <td className="heading-cell ">
                    <div className="date-invite">
                      <h3>Status</h3>
                    </div>
                  </td>
                  <td className="heading-cell ">
                    <div className="date-invite">
                      <h3>Action</h3>
                    </div>
                  </td>
                </tr>
              )}
              {!load && list?.length == 0 && (
                <h6 className="text-center">No results found</h6>
              )}
              {!load &&
                list?.length != 0 &&
                list.map((data) => (
                  <ApplicationComponent
                    key={data.id}
                    name={
                      userType == "AS"
                        ? data.customer_name
                        : data.animal_shelter_name
                    }
                    postedOn={data.created_at}
                    status={data.status}
                    id={data.id}
                    image={
                      userType == "AS"
                        ? data.customer_pic
                        : data.animal_shelter_pic
                    }
                    petName={data.pet_name}
                  />
                ))}
            </table>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Applications;
