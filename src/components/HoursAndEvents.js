import React from "react";
import "../css/HoursAndEvents.css";

class HoursAndEvents extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="HoursAndEvents">
        <p>
          Come visit us at{" "}
          <a
            className="StoreLinks"
            href="https://goo.gl/maps/pUvb2XPUSc7uHC5n9"
            target="_blank"
            rel="noopener noreferrer"
          >
            1940 N Tustin St Unit 107, Orange CA 92865
          </a>
        </p>
        <p>
          Call us at{" "}
          <a className="StoreLinks" href="tel:7145869517">
            (714) 586-9517
          </a>
        </p>
        <table className="HoursTable">
          <tbody>
            <tr>
              <th>Hours</th>
              <th>Event Schedule</th>
            </tr>
            <tr>
              <td>Monday: 5pm-11pm</td>
              <td>Modern @7:30pm</td>
            </tr>
            <tr>
              <td>Tuesday: 5pm-11pm</td>
              <td>Legacy @7:30pm</td>
            </tr>
            <tr>
              <td>Wednesday: Closed</td>
              <td></td>
            </tr>
            <tr>
              <td>Thursday: 5pm-11pm</td>
              <td>Pioneer @7:30pm</td>
            </tr>
            <tr>
              <td>Friday: 5pm-12am</td>
              <td>Pauper @7:30pm | Draft @7:45pm</td>
            </tr>
            <tr>
              <td>Saturday: Closed</td>
              <td></td>
            </tr>
            <tr>
              <td>Sunday: Closed</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default HoursAndEvents;
