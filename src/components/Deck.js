import React, { useState } from "react";
import { checkAvailableSeat, lastSeatColorPer, numRange } from "utils/main";
import Seat from "./Seat";
import Logo from "images/logo.PNG";
import Modal from "./Modal";

function Deck(props) {
  const { title, logo, seats } = props;
  const initial = { visible: false, content: {} };
  const [modal, setModal] = useState(initial);

  const onSeatClick = (number, isLast) => {
    let available_seat = checkAvailableSeat(number || isLast);

    if (!available_seat) return alert("Selected Seat already booked");
    const values = { ...modal };
    values["visible"] = !modal.visible;
    values["content"] = {
      seatno: available_seat,
      type: "new",
    };
    setModal(values);
  };

  const bookedSeats =
    Object.keys(JSON.parse(localStorage.getItem("booking")) || {}) || [];

  
  const colorPer = lastSeatColorPer(seats?.last) 

  return (
    <div className="container">
      <div className="deck">
        <span className="title">{title}</span>
        <div className="content">
          {logo && (
            <>
              <img src={Logo} alt={title} />
              <hr />
            </>
          )}
          <div className="sides" style={{ marginLeft: logo ? "0px" : "50px" }}>
            <div className="right__side">
              {numRange(seats?.right).map((seat, key) => (
                <div key={seat}>
                  <Seat
                    seatNumber={seat}
                    onClick={onSeatClick}
                    isBooked={bookedSeats.includes(`${seat}`)}
                  />
                </div>
              ))}
            </div>
            <div className="left__side">
              {numRange(seats?.left).map((seat, key) => (
                <div key={seat}>
                  <Seat
                    seatNumber={seat}
                    onClick={onSeatClick}
                    isBooked={bookedSeats.includes(`${seat}`)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="last_seat">
            <div
              className="seat last__row"
              onClick={() => onSeatClick(0, seats?.last)}
            >
              <div className="bg__last" style={{width:`${colorPer}%`}}/>
              <div className="seat__inner last__inner" />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={modal.visible}
        onClose={() => setModal(initial)}
        content={modal.content}
      />
    </div>
  );
}

export default Deck;
