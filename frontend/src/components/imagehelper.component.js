import React from "react";
import axios from "axios";
const ImageHelper = ({ book }) => {
  const imageurl = book
    ? `http://localhost:8080/book/photo/${book._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  // book
  // ? `${API}/product/photo/${book._id}`
  //   : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <img
      src={imageurl}
      alt="photo"
      height="200px"
      width="auto"
      // style={{ maxHeight: "100%", maxWidth: "100%" }}
      // className="rounded p-0.5"
    />
  );
};

export default ImageHelper;
