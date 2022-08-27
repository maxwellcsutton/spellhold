import React from "react";
import logo from "../img/Spellhold Games Logo.png";
import title from "../img/Spellhold Games Title.jpeg";
import "../css/App.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-header">
          <img src={title} className="App-title" alt="Spellhold Games" />
        </div>
        <Navbar />
        {this.props.component}
        <Footer />
      </div>
    );
  }
}

export default App;
