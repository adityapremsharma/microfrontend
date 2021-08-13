import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Header = (props) => {
  const pathname = useLocation().pathname;
  const { isSignedIn, toggleSignedIn } = props;

  useEffect(() => {
    const toggleMenu = () => {
      var element = document.querySelector(".menu");
      element.classList.toggle("active-menu");
    };

    document.querySelector(".menu-icon") && document.querySelector(".menu-icon").addEventListener("click", toggleMenu);
    document.querySelector(".active") && document.querySelector(".active").addEventListener("click", toggleMenu);
    [...document.querySelectorAll(".not-active")].map((element) => element.addEventListener("click", toggleMenu));

    return () => {
      document.querySelector(".menu-icon") &&
        document.querySelector(".menu-icon").removeEventListener("click", toggleMenu);
      document.querySelector(".active") && document.querySelector(".active").removeEventListener("click", toggleMenu);
      [...document.querySelectorAll(".not-active")].map((element) => element.removeEventListener("click", toggleMenu));
    };
  }, []);

  useEffect(() => {
    const checkbox = document.querySelector("#theme");

    // Access theme from localstorage
    const theme = localStorage.getItem("theme");

    if (theme) {
      document.body.classList.add(theme);
      checkbox.checked = true;
    }

    // Toggle theme on click

    const toggleTheme = () => {
      if (checkbox.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.removeItem("theme");
      }
    };
    checkbox.addEventListener("change", toggleTheme);

    return () => {
      checkbox.removeEventListener("change", toggleTheme);
    };
  }, []);

  return (
    <nav className="navbar">
      <i className="fas fa-minus-square menu-icon"></i>
      <div className="menu">
        <div className="left">
          <h1>Host</h1>
        </div>
        <div className="middle">
          <Link to="/" className={pathname === "/" ? "active" : "not-active"}>
            Home
          </Link>
          <Link to="/dashboard" className={pathname === "/dashboard" ? "active" : "not-active"}>
            Dashboard
          </Link>
          <Link to="/profile" className={pathname === "/profile" ? "active" : "not-active"}>
            Profile
          </Link>
        </div>
        <div className="right">
          <button className="btn-primary not-active" onClick={toggleSignedIn}>
            {isSignedIn ? "Log Out" : "Sign In"}
          </button>
        </div>
      </div>
      <div className="checkbox-primary">
        <input id="theme" type="checkbox" />
        <label htmlFor="theme"></label>
      </div>
    </nav>
  );
};

Header.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  toggleSignedIn: PropTypes.func.isRequired,
};

export default Header;
