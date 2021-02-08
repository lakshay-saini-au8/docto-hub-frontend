import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
const CustomLoader = ({ size, margin, color }) => {
  return (
    <div className="w-100 m-auto p-4 d-flex justify-content-center align-items-center">
      <PulseLoader size={size} margin={margin} color={color || "#09dca4"} />
    </div>
  );
};

export default CustomLoader;
