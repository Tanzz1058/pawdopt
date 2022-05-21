import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router";

import "../styles/header.css";

const Header = () => {
  const userType = localStorage.getItem("userType");
  const userInfoId = localStorage.getItem("userInfoId");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };
  const username = localStorage.getItem("userName");
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
            <span className="username">
              {username}
              {"  "}
            </span>
            <i class="fa fa-lg fa-user-circle-o white" aria-hidden="true"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-50">
            {userType == "CUS" ? (
              <>
                <Dropdown.Item onClick={() => navigate("/user-details")}>
                  Profile
                </Dropdown.Item>
                {/* <Dropdown.Item>Saved Posts</Dropdown.Item> */}
                <Dropdown.Item onClick={() => navigate("/findpets")}>
                  Search
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/applications")}>
                  My Applications
                </Dropdown.Item>
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item onClick={() => navigate("/details")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate(`/organisation/posts/${userInfoId}`)}
                >
                  Posts
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/post-pet-info")}>
                  Post a pet
                </Dropdown.Item>

                {/* <Dropdown.Item>Saved Posts</Dropdown.Item> */}
                {/* <Dropdown.Item>Search</Dropdown.Item> */}
                <Dropdown.Item onClick={() => navigate("/applications")}>
                  Applications
                </Dropdown.Item>
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
