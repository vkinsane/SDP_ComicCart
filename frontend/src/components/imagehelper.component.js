import React from "react";
// import axios from "axios";
const ImageHelper = ({ book }) => {
  const imageurl = book
    ? `https://backend-api-comiccart.herokuapp.com/book/photo/${book._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

  return <img src={imageurl} alt="book-img" height="200px" width="auto" />;
};

export default ImageHelper;
