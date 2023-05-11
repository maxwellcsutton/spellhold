import React from "react";
import "../css/HoursAndEvents.css";

function HoursAndEvents() {
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
            <td>Monday: 4pm-11pm</td>
            <td>Modern @7:30pm</td>
          </tr>
          <tr>
            <td>Tuesday: 4pm-11pm</td>
            <td>Legacy @7:30pm</td>
          </tr>
          <tr>
            <td>Wednesday: 4pm-11pm</td>
            <td>Pauper @7:30pm</td>
          </tr>
          <tr>
            <td>Thursday: 4pm-11pm</td>
            <td>Pioneer @7:30pm</td>
          </tr>
          <tr>
            <td>Friday: 4pm-11pm</td>
            <td>Draft @7:30pm | Pioneer @7:30pm</td>
          </tr>
          <tr>
            <td>Saturday: 12pm-8pm</td>
            <td>Commander All Day & Open Play</td>
          </tr>
          <tr>
            <td>Sunday: 12pm-8pm</td>
            <td>Commander All Day & Open Play</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HoursAndEvents;
