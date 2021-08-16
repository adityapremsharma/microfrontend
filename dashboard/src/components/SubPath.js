import React from "react";
import { Link } from "react-router-dom";

const SubPath = () => {
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
      <h1 style={{ marginBottom: "2rem" }}>Dashboard App</h1>
      <Link to="/dashboard" className="btn btn-primary">
        Back to dashboard
      </Link>
    </div>
  );
};

export default SubPath;
