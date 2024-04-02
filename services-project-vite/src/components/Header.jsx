// import React from "react";

import { Link } from "react-router-dom";
import { useState } from "react";
import ServiceDropdown from "./ServiceDropdown";

const Header = () => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsDropDownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownVisible(false);
  };

  return (
    <div className="header flex flex-wrap justify-between px-5 py-0 items-center">
      <div className="logo-container ">
        <img
          className="logo size-20"
          src="https://img.freepik.com/premium-vector/house-repair-logo-images-illustration_600494-933.jpg"
          alt="logo"
        />
      </div>

      <div className="nav-items">
        <ul className="flex text-2xl">
          <li className="p-2.5 m-2.5 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2.5 m-2.5 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="p-2.5 m-2.5 cursor-pointer">
            {/* <Link to="/services">Services</Link> */}
            <div
              className="dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button>Services</button>
              {/* {isDropDownVisible && <Dropdown />} */}
              {isDropDownVisible && <ServiceDropdown />}
            </div>
          </li>
          <li className="p-2.5 m-2.5 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
