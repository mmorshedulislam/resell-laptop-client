import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";

const BookingModal = ({ booking, setBooking }) => {
  const { user } = useContext(AuthContext);
  const date = new Date();
  const bookingDate = format(date, "PP");
  const handleBookingForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.productName.value;
    const price = form.price.value;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const phone = form.phone.value;
    const location = form.location.value;

    const orderData = {
      productName,
      price,
      buyerName,
      buyerEmail,
      phone,
      location,
      sellerEmail: booking?.sellerEmail,
      productId: booking._id,
      bookingDate,
    };

    fetch(`${process.env.REACT_APP_PORT}/booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Booking Successfully Submitted.");
          setBooking(null);
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Booking Form</h3>
          <form onSubmit={handleBookingForm}>
            <div className="my-3">
              <p>Product Name</p>
              <input
                type="text"
                className="input input-bordered w-full"
                value={booking?.name}
                readOnly
                name="productName"
              />
            </div>
            <div className="my-3">
              <p>Product Price</p>
              <input
                type="text"
                className="input input-bordered w-full"
                value={booking?.currentPrice}
                readOnly
                name="price"
              />
            </div>
            <div className="my-3">
              <p>Your Name</p>
              <input
                type="text"
                className="input input-bordered w-full"
                value={user?.displayName}
                readOnly
                name="buyerName"
              />
            </div>
            <div className="my-3">
              <p>Email</p>
              <input
                type="text"
                className="input input-bordered w-full"
                value={user?.email}
                readOnly
                name="buyerEmail"
              />
            </div>
            <div className="my-3">
              <p>Phone</p>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Your Phone Number"
                autoFocus
                name="phone"
              />
            </div>
            <div className="my-3">
              <p>Location</p>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Meeting Location"
                name="location"
              />
            </div>
            <input
              type="submit"
              value={"Submit"}
              className="btn btn-bordered w-full"
            />
          </form>
          <div className="modal-action">
            <label type="submit" htmlFor="booking-modal" className="btn">
              Submit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;