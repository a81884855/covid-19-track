import React from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function Zoom({ position, setPosition }) {
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  };

  return (
    <div className="controls">
      <FaPlusCircle className="controls-icons" onClick={handleZoomIn} />
      <FaMinusCircle className="controls-icons" onClick={handleZoomOut} />
    </div>
  );
}
