import React from "react";

import "./Intro.css";

const Intro = ({ myRef }) => {
  return (
    <div className="intro">
      <h2>Discover where recyclable materials go!</h2>
      <p>
        Recycling is the process of collecting and processing materials that
        would otherwise be thrown away as trash and turning them into new
        products. Recycling can benefit your community and the environment.
      </p>
      <p>
        Aluminum and steel cans, cardboard, glass, newspapers and plastic
        bottles are all recyclable.These items can be made into new products
        including cans that hold food and drinks, the steel used to build
        skyscrapers and school buses, cardboard boxes, glass jars and bottles,
        newspaper and office paper, plastic laundry detergent bottles and even
        playground equipment!
      </p>
      <div className="img-holder">
        <img src={require("../assets/recycling-bins.png")} alt="bins"></img>
      </div>
      <button
        className="intro-btn"
        onClick={() => {
          document.body.scrollTop = document.body.scrollHeight;
          document.documentElement.scrollTop = document.body.scrollHeight;
        }}
      >
        Get started <i class="fas fa-arrow-alt-circle-down"></i>
      </button>
    </div>
  );
};

export default Intro;
