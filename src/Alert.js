import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle() {
    return {
      color: this.color,
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}> {this.props.text} </p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "blue";
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "red";
    this.fontSize = 20;
  }
  getStyle() {
    return {
      color: this.color,
      fontSize: this.fontSize,
    };
  }
}

class CacheData extends Alert {
  constructor(props) {
    super(props);
    this.color = "#44b";
  }
}

export { InfoAlert, ErrorAlert, CacheData };
