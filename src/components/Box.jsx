import React from "react";

const Box = ({ data, title, unit, bg }) => {
  return (
    <div className={`bg-${bg} card text-center h-300 p-2`}>
      <h5 className="p-1 text-light">{title}</h5>
      <h6 className="text-light">
        <strong>{data} </strong> {unit}
      </h6>
    </div>
  );
};

export default Box;
