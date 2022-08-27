import React from "react";
import logo from "../img/Spellhold Games Logo.png";
import title from "../img/Spellhold Games Title.jpeg";
import "../css/App.css";
import NavBar from "./Navbar.js";
import Footer from "./Footer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <div className="App-header">
          <a href="/">
            <img src={title} className="App-title" alt="Spellhold Games" />
          </a>
        </div>
        <NavBar />
        {this.props.component}
        <Footer />
      </div>
    );
  }
}

export default App;
