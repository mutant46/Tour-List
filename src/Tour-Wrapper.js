import React from "react";
import Tour from "./tour";

const Tours = ({ data, removeTour }) => {
  return (
    <div className="tourWrapper">
      {data.map((hotel) => {
        return <Tour {...hotel} key={hotel.id} removeTour={removeTour} />;
      })}
    </div>
  );
};

export default Tours;
