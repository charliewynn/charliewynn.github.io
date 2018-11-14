import React, { Component } from "react";
import Feature from "./Feature";
import "./css/App.css";

class App extends Component {
  getCSS(ndx) {
    const backgrounds = [
      "rgb(157, 91, 196)",
      "rgb(91,196,157)",
      "rgb(196, 91, 193)"
    ];
    const colors = ["white", "white", "white"];
    const index = ndx % backgrounds.length;
    return { background: backgrounds[index], color: colors[index] };
  }
  render() {
    let colorNdx = 0;
    return (
      <div className="App">
        <header>Charlie Wynn</header>
        <section>
          <div className="features">
            <Feature
              link="./mema-football"
              name="Miller Family Football"
              css={this.getCSS(colorNdx++)}
            />
            <Feature
              name="Hanabi"
              link="./hanabi"
              css={this.getCSS(colorNdx++)}
            />
          </div>
        </section>
        <footer>footer</footer>
      </div>
    );
  }
}

export default App;
