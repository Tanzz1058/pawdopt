import React from "react";

import "../styles/dogList.css";

const DogCard = () => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-12">
      <div className="dogCard">
        <div className="dogcard-image-container">
          <img src="/images/homeDog.jpg" alt="dog" />
        </div>
        <div className="row d-flex flex-column dogcard-text text-center">
          <p className="mb-0">Dog name</p>
          <p className="mb-0">
            <i class="fa fa-map-marker" aria-hidden="true"></i> Location
          </p>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
