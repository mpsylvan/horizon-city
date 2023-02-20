import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    number: 0,
    errorText: "",
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    if (value > 32 || value < 0)
      this.setState({
        number: value,
        errorText: "only values from 1 - 32 can be specified.",
      });
    else {
      this.setState({
        number: value,
        errorText: "",
      });
    }
    this.props.updateEvents(undefined, value);
  };

  render() {
    return (
      <div className="NOE" style={{ display: "flex", flexDirection: "column" }}>
        <label>
          Select how many events to show:
          <input
            className="numberInput"
            type="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            min="1"
          />
        </label>
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
