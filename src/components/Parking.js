import React from "react";
import "../css/Parking.css";
import parking from "../img/Parking Map.png";

class Parking extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Parking">
        <img src={parking} className="ParkingMap" />
        <div className="ParkingText">
          <p>Areas marked in green are the allowed parking areas</p>
          <p>Red arrows are store entrances</p>
          <p>You can enter the store from either the front or back door</p>
        </div>
      </div>
    );
  }
}

export default Parking;
