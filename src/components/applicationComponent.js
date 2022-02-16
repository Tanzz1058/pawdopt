import React from "react";
import "../styles/applicationComponent.css";

const ApplicationComponent = (props) => {
  return (
    <tr className="invite-row-child">
      <td className="customer-cell-invite ">
        <div className="invite-customer-name">
          <div className="invite-image">
            <img src={props?.image || "/images/user.png"} alt="user" />
          </div>
          <div className="invite-name-description">
            <h1>{props?.name || "Person Name"}</h1>
            {/* <span>{props?.location || "city"}</span> */}
          </div>
        </div>
      </td>

      <td className="customer-cell-invite ">
        <div className="job-invite">
          <h3>{props?.job || "Smile foundation"}</h3>
        </div>
      </td>

      <td className="customer-cell-invite ">
        <div className="date-invite">
          <h3>{props?.postedOn || "9 / 9 / 21"}</h3>
        </div>
      </td>

      <td className="customer-cell-invite ">
        <div className="date-invite">
          <h3>{props?.postedOn || "pending"}</h3>
        </div>
      </td>

      <td className="customer-cell-invite ">
        <div className="date-invite">
          <button>Click to view</button>
        </div>
      </td>
    </tr>
  );
};

export default ApplicationComponent;
