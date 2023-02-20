import React, { Component } from "react";
import { InfoAlert } from "./Alert";
class CitySearch extends Component {
  // shorthand syntax for initializing state variables in class component
  state = {
    query: "",
    suggestions: [],
    showSuggestions: undefined,
    infoText: "",
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        suggestions,
        query: value,
        infoText:
          "Unable to match a city to that search, please check your search",
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: "",
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText: "",
    });
    this.props.updateEvents(suggestion, undefined);
  };

  render() {
    return (
      <>
        <div
          className="CitySearch"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <InfoAlert text={this.state.infoText} />
          <input
            style={{ marginBottom: "20px" }}
            className="city"
            type="text"
            placeholder="Search for a city"
            value={this.state.query}
            onChange={this.handleInputChange}
            onFocus={() => {
              this.setState({ showSuggestions: true });
            }}
          />
          <ul
            className="suggestions"
            style={this.state.showSuggestions ? {} : { display: "none" }}
          >
            {this.state.suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}
              >
                {suggestion}
              </li>
            ))}
            <li
              key="all"
              onClick={() => {
                this.handleItemClicked("all");
              }}
            >
              {" "}
              <b>See all cities</b>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default CitySearch;
