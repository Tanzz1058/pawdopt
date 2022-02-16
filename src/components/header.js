import React from "react";
import { Dropdown } from "react-bootstrap";

import "../styles/header.css";

const Header = () => {
  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };
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
        <Dropdown className="col-6 text-end">
          <Dropdown.Toggle
            className="bold text-end fs-4 header-title"
            style={{ width: "fit-content" }}
          >
            <span className="username fs-4">username{"  "}</span>
            <i class="fa fa-lg fa-user-circle-o white" aria-hidden="true"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-50">
            <Dropdown.Item>My Profile</Dropdown.Item>
            <Dropdown.Item>Saved Posts</Dropdown.Item>
            <Dropdown.Item>Search</Dropdown.Item>
            <Dropdown.Item>My Enquiries</Dropdown.Item>
            <Dropdown.Item>My Applications</Dropdown.Item>
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
