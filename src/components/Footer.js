import React from "react";
import "../css/Footer.css";
import discordLogo from "../img/discord-logo.png";
import fbLogo from "../img/f_logo_RGB-Blue_512.png";
import yelpLogo from "../img/yelp_favicon.png";
import tcgLogo from "../img/tcgplayer-com-logos-idEcUqmZLQ.png";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="SocialsContainer">
        <a
          href="https://discord.gg/RyA9tpm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={discordLogo} className="Discord" alt="logo" />
        </a>
        <a
          href="https://facebook.com/spellholdgames"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={fbLogo} className="Fb" alt="logo" />
        </a>
        <a
          href="https://www.yelp.com/biz/spellhold-games-orange-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={yelpLogo} className="Yelp" alt="logo" />
        </a>
        <a
          href="https://shop.tcgplayer.com/sellerfeedback/3090ff69"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={tcgLogo} className="TCGPlayer" alt="logo" />
        </a>
        <p className="PhoneNum">
          Phone:{" "}
          <a className="StoreLinks" href="tel:7145869517">
            (714) 586-9517
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;
