import React from "react";
import { useNavigate } from "react-router";

import "../styles/dogList.css";

const DogCard = (props) => {
  const navigator = useNavigate();
  return (
    <div
      className="col-lg-4 col-md-4 col-sm-12"
      onClick={() => navigator("/pet-details")}
    >
      <div className="dogCard">
        <div className="dogcard-image-container">
          <img src="/images/homeDog.jpg" alt="dog" />
        </div>
        <div className="row d-flex flex-column dogcard-text text-center">
          <p className="mb-0">{props.name}</p>
          <p className="mb-0">
            <i class="fa fa-map-marker" aria-hidden="true"></i> Location
          </p>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
