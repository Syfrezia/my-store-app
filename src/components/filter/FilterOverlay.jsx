import React from "react";

const FilterOverlay = ({ overlayZindex, toggleCartOff }) => {
  return (
    <div
    onClick={toggleCartOff}
      className="overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: overlayZindex,
      }}
    ></div>
  );
};

export default FilterOverlay;
