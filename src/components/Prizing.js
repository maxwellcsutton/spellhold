import "../css/Prizing.css";
import React from "react";

class Prizing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Prizing">
        <p>
          <b>Draft Prizing:</b> 1 Pack Per Win
        </p>
        <p>
          <b>Constructed Events:</b>
        </p>
        <table className="FourRoundTable">
          <tbody>
            <tr>
              <th>4 Round Events</th>
            </tr>
            <tr>
              <th>Record</th>
              <th>Store Credit</th>
            </tr>
            <tr>
              <td>4-0</td>
              <td>$32</td>
            </tr>
            <tr>
              <td>3-0-1</td>
              <td>$24</td>
            </tr>
            <tr>
              <td>3-1</td>
              <td>$16</td>
            </tr>
            <tr>
              <td>2-1-1</td>
              <td>$8</td>
            </tr>
          </tbody>
        </table>
        <table className="ThreeRoundTable">
          <tbody>
            <tr>
              <th>3 Round Events</th>
            </tr>
            <tr>
              <th>Record</th>
              <th>Store Credit</th>
            </tr>
            <tr>
              <td>3-0</td>
              <td>$16</td>
            </tr>
            <tr>
              <td>2-0-1</td>
              <td>$12</td>
            </tr>
            <tr>
              <td>2-1</td>
              <td>$8</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Prizing;
