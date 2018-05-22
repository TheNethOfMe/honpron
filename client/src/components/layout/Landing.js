import React, { Component } from "react";
import EntryList from "../entryDisplay/EntryList";
class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
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
