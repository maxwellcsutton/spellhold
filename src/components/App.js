import React from "react";
import logo from "../img/Spellhold Games Logo.png";
// import title from "../img/Spellhold Games Title.png";
import "../css/App.css";
import NavBar from "./Navbar.js";
import Footer from "./Footer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="header">
          <a href="/">
            <img src={logo} className="spellhold-logo" alt="logo" />
          </a>
          <div className="spellhold-title">Spellhold Games</div>
        </div>
        <div className="delineator"></div>
        <NavBar className="navbar" />
        <div className="page-content">{this.props.component}</div>
        <Footer className="footer" />
      </div>
    );
  }
}

export default App;
