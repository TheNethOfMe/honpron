import React, { Component } from "react";

class Snes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "top"
    };
    this.onSwitch = this.onSwitch.bind(this);
  }
  onSwitch(display) {
    this.setState({ display });
  }
  render() {
    const top100 = (
      <div>
        <h2>The Top 100!</h2>
        <p>The best SNES games EVER!</p>
      </div>
    );
    const theCollection = (
      <div>
        <h2>The Collection</h2>
        <p>Good SNES games that didn't quite crack the Top 100.</p>
      </div>
    );
    const theBin = (
      <div>
        <h2>The Bin</h2>
        <p>SNES games that are not very good, but not the worst.</p>
      </div>
    );
    const bottom25 = (
      <div>
        <h2>The Bottom 25!</h2>
        <p>The 25 worst SNES games ever made.</p>
      </div>
    );
    return (
      <div className="card display-entry">
        <div className="card-body">
          <h1 className="accent-text">SNEScapades Rankings</h1>
          <ul className="nav hp-nav justify-content-center nav-pills">
            <li className="nav-item">
              <p
                className={
                  this.state.display === "top"
                    ? "nav-link hp-nav-active"
                    : "nav-link hp-nav-inactive"
                }
                onClick={() => this.onSwitch("top")}
              >
                Top 100!
              </p>
            </li>

            <li className="nav-item">
              <p
                className={
                  this.state.display === "collection"
                    ? "nav-link hp-nav-active"
                    : "nav-link hp-nav-inactive"
                }
                onClick={() => this.onSwitch("collection")}
              >
                The Collection
              </p>
            </li>

            <li className="nav-item">
              <p
                className={
                  this.state.display === "bin"
                    ? "nav-link hp-nav-active"
                    : "nav-link hp-nav-inactive"
                }
                onClick={() => this.onSwitch("bin")}
              >
                The Bin
              </p>
            </li>

            <li className="nav-item">
              <p
                className={
                  this.state.display === "bottom"
                    ? "nav-link hp-nav-active"
                    : "nav-link hp-nav-inactive"
                }
                onClick={() => this.onSwitch("bottom")}
              >
                Bottom 25
              </p>
            </li>
          </ul>
          <div className="hp-card">
            {this.state.display === "top" && top100}
            {this.state.display === "collection" && theCollection}
            {this.state.display === "bin" && theBin}
            {this.state.display === "bottom" && bottom25}
          </div>
        </div>
      </div>
    );
  }
}

export default Snes;
