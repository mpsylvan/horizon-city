import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    number: 32,
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      number: value,
    });
  };

  resetInput = () => {
    this.setState({
      number: 32,
    });
  };

  render() {
    return (
      <>
        <label>
          Select how many events you'd like to see.
          <input
            className="numberInput"
            type="number"
            value={this.state.number}
            onChange={this.handleInputChange}
          />
          <button className="resetButton" onClick={this.resetInput}>
            Reset
          </button>
        </label>
      </>
    );
  }
}

export default NumberOfEvents;
