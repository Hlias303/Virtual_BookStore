import React from "react";
import { useNavigate } from "react-router-dom";

function BookItem({ image, name, price, bookId }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Books/${bookId}`)
  }

  return (
    <div className="bookItem" onClick={handleClick}>
      <img src={image}></img>
      <h1> {name} </h1>
      <p> ${price} </p>
    </div>
  );
}

export default BookItem;