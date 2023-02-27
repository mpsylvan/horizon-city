import React, { Component } from "react";

/* 

    Each Event is going to have surface information { summary, start : {dateTime, timeZone},  }
    Each Event is going to also have a button that reveals further details upon click
*/

class Event extends Component {
  state = {
    details: false,
  };

  handleShowDetails = (event) => {
    this.setState({
      details: true,
    });
  };

  handleHideDetails = (event) => {
    this.setState({
      details: false,
    });
  };

  render() {
    const genres = [
      "React",
      "JavaScript",
      "Node",
      "jQuery",
      "jQuery,",
      "AngularJS",
    ];
    const colors = ["#ade", "#46b", "#2cc", "#58d", "#58d", "#28f"];
    const { event } = this.props;
    const genre = event.summary
      .split(" ")
      .filter((word) => genres.includes(word))[0];

    return (
      <div
        className="eventCard"
        style={{ background: colors[genres.indexOf(genre)], margin: "5px" }}
      >
        <h3 className="eventTitle">{event.summary}</h3>
        <p className="eventTime">
          {event.start.dateTime}({event.start.timeZone})
        </p>
        <p className="eventLocation" style={{ color: "#000" }}>
          @{event.summary} || {event.location}
        </p>

        {!this.state.details ? (
          <>
            <button className="showDetails" onClick={this.handleShowDetails}>
              Show Details
            </button>
          </>
        ) : (
          <>
            <button
              className="collapseDetails"
              onClick={this.handleHideDetails}
            >
              Collapse Details
            </button>
            <h4 className="aboutHeader">About this event:</h4>
            <a className="calendarLink" href={event.htmlLink}>
              See details on Google Calendar
            </a>
            <p className="description">{event.description}</p>
          </>
        )}
      </div>
    );
  }
}

export default Event;
