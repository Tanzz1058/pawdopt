import React from "react";

import "../styles/header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="row align-items-center justify-content-between header-inner">
        <p className="bold fs-4 header-title col-6">
          Pawd
          <span>
            <i class="fa fa-paw white" aria-hidden="true"></i>
          </span>
          pt
        </p>
        <p className="bold text-end fs-4 header-title col-6 ">
          Username{"   "}
          <i class="fa fa-lg fa-user-circle-o white" aria-hidden="true"></i>
        </p>
      </div>
    </div>
  );
};

export default Header;
