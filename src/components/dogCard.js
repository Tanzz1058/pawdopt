import React from "react";
import { useNavigate } from "react-router";

import "../styles/dogList.css";

const DogCard = (props) => {
  const navigator = useNavigate();
  return (
    <div
      className="col-lg-4 col-md-4 col-sm-12"
      onClick={() => navigator(`/pet-details/${props.id}/`)}
    >
      <div className="dogCard">
        <div className="dogcard-image-container">
          <img src={props?.img} alt="dog" />
        </div>
        <div className="row d-flex flex-column dogcard-text text-center">
          <p className="mb-0">{props.name}</p>
          <p className="mb-0">
            <i class="fa fa-map-marker" aria-hidden="true"></i> {props.location}
          </p>
          {props.is_adopted && <p className="mb-0 green">Adopted!</p>}
        </div>
      </div>
    </div>
  );
};

export default DogCard;
