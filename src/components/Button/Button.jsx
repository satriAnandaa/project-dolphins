import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button() {
  return (
    <Link to="create">
      <button className="btn">Create Account</button>
    </Link>
  );
}

export default Button;
