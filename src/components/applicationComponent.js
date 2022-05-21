import React from "react";
import { useNavigate } from "react-router";
import "../styles/applicationComponent.css";

const ApplicationComponent = (props) => {
  const navigate = useNavigate();
  return (
    <tr className="invite-row-child">
      <td className="customer-cell-invite ">
        <div className="invite-customer-name">
          <div className="invite-image">
            <img
              src={props?.image || "/images/user.png"}
              alt="user"
              onError={(e) => (e.target.src = "/images/user.png")}
            />
          </div>
          <div className="invite-name-description">
            <h1>
              {props.name.length > 30
                ? props.name.substring(1, 27) + "..."
                : props.name}
            </h1>
            {/* <span>{props?.location || "city"}</span> */}
          </div>
        </div>
      </td>

      <td className="customer-cell-invite ">
        <div className="job-invite">
          <h3>{props?.petName || "Smile foundation"}</h3>
        </div>
      </td>

      <td className="customer-cell-invite ">
        <div className="date-invite">
          <h3>{new Date(props.postedOn).toLocaleDateString()}</h3>
        </div>
      </td>

      <td className="customer-cell-invite ">
        <div className="date-invite">
          <h3>{props?.status || "Pending"}</h3>
        </div>
      </td>

      <td className="customer-cell-invite ">
        <div className="date-invite">
          <button onClick={() => navigate(`/applications/${props.id}`)}>
            Click to view
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ApplicationComponent;
