import React from "react";
import ApplicationComponent from "../components/applicationComponent";
import Header from "../components/header";

const Applications = () => {
  return (
    <>
      <Header />
      <div className="page_content ">
        <div className="container">
          {/* <div className="row"> */}
          <div className="invites-list ">
            <table className="scrollable-list">
              <tr className="invite-row">
                <td className="heading-cell ">
                  <div className="invite-customer-name">
                    <div className="invite-name-description">
                      <h1>Dog Name</h1>
                    </div>
                  </div>
                </td>
                <td className="heading-cell ">
                  <div className="job-invite">
                    <h3>Name of the Organisation</h3>
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
              <ApplicationComponent />
              <ApplicationComponent />

              <ApplicationComponent />
              <ApplicationComponent />
              <ApplicationComponent />
              <ApplicationComponent />
              <ApplicationComponent />
              <ApplicationComponent />
            </table>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Applications;
