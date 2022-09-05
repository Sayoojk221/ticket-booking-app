import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const onNavigate = ({ target: { value } }) => {
    navigate(value);
  };
  return (
    <div className="navbar">
      <span className="company__name">
        <Link to={'/home'}>Bus Ticket Booking</Link>
      </span>
      <select className="nav__items" onChange={onNavigate}>
        <option value={"home"}>Dashabord</option>
        <option value={"reservation"}>Reservation</option>
      </select>
    </div>
  );
}

export default NavBar;
