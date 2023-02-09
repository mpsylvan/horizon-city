import React, { Component } from "react";
import { mockData } from "./mock_data";

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
    return (
      <>
        <h3 className="eventTitle">{mockData[0].summary}</h3>
        <p className="eventTime">
          {mockData[0].start.dateTime}({mockData[0].start.timeZone})
        </p>
        <p className="eventLocation">
          @{mockData[0].summary}||{mockData[0].location}
        </p>

        {!this.state.details ? (
          <>
            <button className="showDetails" onClick={this.handleShowDetails}>
              Show Details
            </button>
          </>
        ) : (
          <div className="moreDetails">
            <button
              className="collapseDetails"
              onClick={this.handleHideDetails}
            >
              Collapse Details
            </button>
            <h4 className="aboutHeader">About this event:</h4>
            <a className="calendarLink" href={mockData[0].htmlLink}>
              See details on Google Calendar
            </a>
            <p className="eventDescription">{mockData[0].description}</p>
          </div>
        )}
      </>
    );
  }
}

export default Event;
