const getStartEnd = (range) => {
  const value = range.split("-");
  let start = parseInt(value[0]);
  let end = parseInt(value[1]);
  return { start, end };
};

export const numRange = (range) => {
  const { start, end } = getStartEnd(range);
  const listNumber = [];
  let num = start;

  while (num <= end) {
    listNumber.push(num);
    num++;
  }

  return listNumber;
};

export const checkAvailableSeat = (seatNumber) => {
  const booking = Object.keys(JSON.parse(localStorage.getItem("booking")) || {}) || [];
  let available_seat = false;

  if (isNaN(seatNumber)) {
    const range = numRange(seatNumber);
    range.map((seat) => {
      if (!booking.includes(`${seat}`)) {
        available_seat = seat;
      }
      return false;
    });
  } else {
    available_seat = !booking.includes(`${seatNumber}`) && seatNumber;
  }

  return available_seat;
};


export const latestBookings = () => {
  const latest = []
  const bookings = JSON.parse(localStorage.getItem('booking')) || {}
  Object.keys(bookings).map((item) => {
    latest.push({...bookings[item]})
  })

  return latest

}

export const lastSeatColorPer = (seats) => {
  const range = numRange(seats)
  let percentage = 0
  const bookings = Object.keys(JSON.parse(localStorage.getItem('booking')) || {}) || []
  range.map((item) => {
    if(bookings.includes(`${item}`)){
      percentage += 20;
    }
  })


  return percentage
}