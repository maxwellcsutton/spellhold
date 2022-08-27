import React, { setState, useState, useEffect } from "react";
import "../css/PricingSearchBar.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Autocomplete from "../api/autocomplete.js";
import { useNavigate } from "react-router-dom";

export default function PricingSearchBar() {
  const autocomplete = new Autocomplete();
  const navigate = useNavigate();
  const [cardNames, setCardNames] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function getCardNames() {
      try {
        let cardNames = await autocomplete.fetchCardNames();
        setCardNames(cardNames);
      } catch (err) {
        console.log(err);
      }
    }
    getCardNames();
  }, []);

  const HandleOnSubmit = (event) => {
    event.preventDefault();
    console.log(keyword);
    navigate("/results", { state: { cardName: keyword } });
  };

  const handleOnSelect = (item) => {
    console.log(item.name);
    setKeyword(item.name);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ marginBottom: 20 }}>Type a card name:</div>
        <form
          onSubmit={HandleOnSubmit}
          onChange={(e) => setKeyword(e.target.value)}
        >
          {" "}
          <ReactSearchAutocomplete
            items={cardNames}
            styling={{ zIndex: 4 }} // To display it on top of the search box below
            autoFocus
            placeholder="Type a card name..."
            maxResults={5}
            onSelect={handleOnSelect}
          />
        </form>
      </header>
    </div>
  );
}
