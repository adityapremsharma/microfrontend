import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
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
      <Link to="/dashboard/subpath" className="btn btn-primary">
        Dashboard subpath
      </Link>
    </div>
  );
};

export default Dashboard;
