import React from "react";
// import axios from "axios";
const ImageHelper = ({ book }) => {
  const imageurl = book
    ? `https://sdp-comiccart-backend.onrender.com/book/photo/${book._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

  return (
    <img
      src={imageurl}
      alt="book-img"
      style={{
        maxHeight: "200px",
        height: "50vh",
      }}
    />
  );
};

export default ImageHelper;
