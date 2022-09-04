import React from "react";
import "../css/Food.css";

function Food() {
  return (
    <div className="Food">
      <p>
        Everywhere in the plaza besides Wienerschnitzel is closed on Mondays
      </p>
      <p>
        <b>Inside the plaza:</b>
      </p>
      <a
        className="Restaurants"
        href="https://holdaak.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Holdaak: Korean Fried Chicken
      </a>
      <br />
      <a
        className="Restaurants"
        href="https://www.yelp.com/biz/poke-district-orange"
        target="_blank"
        rel="noopener noreferrer"
      >
        Poke District
      </a>
      <br />
      <a
        className="Restaurants"
        href="https://www.bobateaque.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        bobaTEAque
      </a>
      <br />
      <a
        className="Restaurants"
        href="https://www.daryarestaurant.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Darya Middle Eastern Food
      </a>
      <br />
      <a
        className="Restaurants"
        href="https://www.wienerschnitzel.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wienerschnitzel
      </a>
      <br />
      <br />
      <p>
        <b>Near By:</b>
      </p>
      <a
        className="Restaurants"
        href="https://www.yelp.com/biz/dona-meche-mexican-food-2-orange"
        target="_blank"
        rel="noopener noreferrer"
      >
        Don Meche
      </a>
      <br />
      <a
        className="Restaurants"
        href="https://www.yelp.com/biz/in-n-out-burger-orange-7"
        target="_blank"
        rel="noopener noreferrer"
      >
        In N Out
      </a>
      <br />
      <a
        className="Restaurants"
        href="https://www.yelp.com/biz/starbucks-orange-19"
        target="_blank"
        rel="noopener noreferrer"
      >
        Starbucks
      </a>
      <br />
    </div>
  );
}

export default Food;
