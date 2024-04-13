import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import ServiceDropdown from "./ServiceDropdown";
import "./style.css";

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
            {/* <Link to="/">Home</Link> */}
            <NavLink
              to="/"
              className={(navData) =>
                navData.isActive ? "active-tab" : "nav-item"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="p-2.5 m-2.5 cursor-pointer">
            {/* <Link to="/about">About</Link> */}
            <NavLink
              to="/about"
              className={(navData) =>
                navData.isActive ? "active-tab" : "nav-item"
              }
            >
              About
            </NavLink>
          </li>
          <li className="p-2.5 m-2.5 cursor-pointer">
            {/* <Link to="/services">Services</Link> */}
            <div
              className="dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="nav-item">Services</button>
              {/* {isDropDownVisible && <Dropdown />} */}
              {isDropDownVisible && <ServiceDropdown />}
            </div>
          </li>
          <li className="p-2.5 m-2.5 cursor-pointer">
            {/* <Link to="/about">About</Link> */}
            <NavLink
              to="/blog"
              className={(navData) =>
                navData.isActive ? "active-tab" : "nav-item"
              }
            >
              Blog
            </NavLink>
          </li>
          <li className="p-2.5 m-2.5 cursor-pointer">
            {/* <Link to="/contact">Contact</Link> */}
            <NavLink
              to="/contact"
              className={(navData) =>
                navData.isActive ? "active-tab" : "nav-item"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
