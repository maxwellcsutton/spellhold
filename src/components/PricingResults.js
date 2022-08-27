import React from "react";
import { useLocation } from "react-router-dom";

export default function PricingResults() {
  const location = useLocation();
  return (
    <div style={{ color: "white", marginTop: "20%" }}>
      {location.state.cardName}
    </div>
  );
}
