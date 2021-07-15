import React, { useState } from "react";

const Tour = ({ name, info, image, price, id, removeTour }) => {
  const [readmore, setReadmore] = useState(false);

  const FullText = (e) => {
    setReadmore(!readmore);
  };

  return (
    <div className="tour">
      <img src={image} alt="Hotel" />
      <div className="text">
        <div className="info">
          <h3> {name} </h3> <span> $ {price} </span>
        </div>
        <p>
          {readmore ? info : info.slice(0, info.length / 3)}
          <a onClick={FullText}>{!readmore ? "Read more" : "Show less"} </a>
        </p>
      </div>

      <button type="button" onClick={() => removeTour(id)}>
        Not Interested
      </button>
    </div>
  );
};

export default Tour;
