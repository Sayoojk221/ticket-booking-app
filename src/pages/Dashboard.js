import Modal from "components/Modal";
import React, { useEffect, useState } from "react";
import { latestBookings } from "utils/main";

function Dashboard() {
  const [bookings,setBookings] = useState([]);
  const initial = { visible: false, content: {} };
  const [modal, setModal] = useState(initial);

  const onEdit = ({seatNo,fname,lname,email}) => {
    const values = { ...modal };
    values["visible"] = !modal.visible;
    values["content"] = {
      seatno: seatNo,
      type:'edit',
      fname,
      lname,
      email,
      onUpdate: () => setBookings(latestBookings())
    };
    setModal(values);
  }

  const onDelete = ({seatNo}) => {
    const afterDeleted = bookings?.filter((item) => item.seatNo !== seatNo)
    setBookings(afterDeleted)

    const latest = {}

    afterDeleted.map((item) => {
      latest[item.seatNo] = {...item}
    })


    localStorage.setItem('booking',JSON.stringify(latest))
    alert('You have deleted booking on seat No: A-'+seatNo)
        
  }

  useEffect(() => {
    setBookings(latestBookings())
  },[])

  return (
    <>
      {
        bookings?.length > 0 ? <table>
        <h1>Bookings</h1>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Seat No</th>
          <th>Booked Date</th>
          <th>Action</th>
        </tr>
        {bookings?.map((item, key) => (
          <tr key={key}>
            <td>
              {item?.fname} {item?.lname}
            </td>
            <td>{item?.email}</td>
            <td>A-{item?.seatNo}</td>
            <td>{item?.date}</td>
            <td>
              <button id="edit" onClick={() => onEdit(item)}>Edit</button>
              <button id="delete" onClick={() =>onDelete(item)}>Delete</button>
            </td>
          </tr>
        ))}
      </table> : <h4>There is no booking found.please book a seat</h4>
      }
      <Modal
        open={modal.visible}
        onClose={() => setModal(initial)}
        content={modal.content}
      />
    </>
  );
}

export default Dashboard;
