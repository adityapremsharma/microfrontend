import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
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
      <h1 style={{ marginBottom: "2rem" }}>Profile App</h1>
      <Link to="/profile/subpath" className="btn btn-primary">
        Profile subpath
      </Link>
    </div>
  );
};

export default Profile;
