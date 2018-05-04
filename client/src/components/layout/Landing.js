import React, { Component } from "react";
import EntryList from "../entryDisplay/EntryList";
class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Honest Piranha Labs</h1>
                <div className="container">
                  <EntryList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
