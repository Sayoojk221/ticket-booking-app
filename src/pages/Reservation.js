import Deck from "components/Deck";
import React from "react";
function Reservation() {
  const desks = [
    {
      title: "Lower Deck",
      logo: true,
      seats: {
        right: "1-10",
        left: "11-15",
        last: "16-20",
      },
    },
    {
      title: "Upper Deck",
      seats: {
        right: "21-30",
        left: "31-35",
        last: "36-40",
      },
    },
  ];

  return (
    <>
      <span className="notification">
        click on an available seat to proceed with your transaction.
      </span>
      {desks.map((props, key) => (
        <div key={key}>
          <Deck {...props} />
        </div>
      ))}
    </>
  );
}

export default Reservation;
