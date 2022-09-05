import React, { useEffect, useState } from "react";
import close from "images/close.png";

function Modal({ open, onClose, content }) {
  const initial = {
    fname: "",
    lname: "",
    email: "",
  };
  const [details, setDetails] = useState(initial);

  const onChange = ({ target: { value, name } }) => {
    const latest = { ...details };
    latest[name] = value;
    setDetails(latest);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let booking = JSON.parse(localStorage.getItem("booking")) || {};
    let today = new Date();

    const customerDetails = {
      fname: details.fname,
      lname: details.lname,
      email: details.email,
      seatNo: `${content?.seatno}`,
      date: today.toDateString(),
    };

    booking[content?.seatno] = customerDetails;
    localStorage.setItem("booking", JSON.stringify(booking));
    setDetails(initial);

    content?.type === "new"
      ? alert(
          "You have booked seat number: A-" + content?.seatno,
          "Thank you...."
        )
      : alert("Booked details has updated seat number: A-" + content?.seatno);
    
    content.type === 'edit' && content.onUpdate()
    onClose();
  };

  useEffect(() => {
    if (content?.type === "edit") {
      setDetails({
        fname: content?.fname,
        lname: content?.lname,
        email: content?.email,
      });
    }
  }, [content]);

  return (
    <div
      id="open-modal"
      className="modal-window"
      style={
        open
          ? {
              visibility: "visible",
              opacity: "1",
              pointerEvents: "auto",
              background: "rgba(0,0,0,.1)",
            }
          : {}
      }
    >
      <div>
        <a href="#" onClick={() => onClose()} id="modelClose">
          <img src={close} width={20} height={20} />
        </a>
        <h4 className="form__title">
          {content?.type === "new"
            ? `Enter details to complete booking on seat No: A-${content?.seatno}`
            : "Edit details"}
        </h4>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            required
            name="fname"
            onChange={onChange}
            value={details.fname }
            id=""
            placeholder="First name"
          />
          <input
            type="text"
            required
            name="lname"
            onChange={onChange}
            value={details.lname }
            id=""
            placeholder="Last name"
          />
          <input
            type="text"
            required
            name="email"
            onChange={onChange}
            value={details.email}
            id=""
            placeholder="Email Id"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
