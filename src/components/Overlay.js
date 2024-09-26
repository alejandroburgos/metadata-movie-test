import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Overlay() {
  const [is3D, setIs3D] = useState(false);
  return (
    <Link
      className="title-overlay"
      to={is3D ? "/" : "/3d"}
      onClick={() => setIs3D(!is3D)}
    >
      {is3D ? "2D" : "3D"}
    </Link>
  );
}
