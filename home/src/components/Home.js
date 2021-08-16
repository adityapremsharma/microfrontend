import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Home App</h1>
      <div style={{ marginBottom: "2rem" }}>
        This is a demo micro frontend app. You must be Signed in in order to use Profile page.
      </div>
      <Link to="/dashboard" className="btn btn-primary">
        Dashboard
      </Link>
    </div>
  );
};

export default Home;
