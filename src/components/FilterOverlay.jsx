import React from "react";

const FilterOverlay = ({ handleFilter }) => {
  return (
    <div
      onClick={handleFilter}
      className="overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2,
      }}
    ></div>
  );
};

export default FilterOverlay;
