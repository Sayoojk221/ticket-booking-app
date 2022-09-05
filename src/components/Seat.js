import React from "react";

function Seat({ isBooked, seatNumber,onClick }) {

  return (
    <div
      className="seat"
      style={{ backgroundColor: isBooked ? "#d84e55" : "#fff" }}
      onClick={() => onClick(seatNumber)}
    >
      <div className="seat__inner" />
    </div>
  );
}

export default Seat;
