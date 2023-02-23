import React, { Component } from "react";
import Event from "./Event";
import { CacheData } from "./Alert";

class EventList extends Component {
  state = {
    showCacheAlert: true,
  };

  hideAlert = () => {
    this.setState({
      showCacheAlert: false,
    });
  };

  render() {
    const { events } = this.props;
    return (
      <div>
        {!navigator.onLine ? (
          <div
            onClick={this.hideAlert}
            style={
              this.state.showCacheAlert
                ? { display: "flex", justifyContent: "center" }
                : { display: "none" }
            }
          >
            <CacheData text="Data is coming from cache, internet connection required for updated events, click/tap to hide " />
          </div>
        ) : (
          <></>
        )}
        <ul className="EventList">
          {events.map((event) => (
            <li key={event.id}>
              <Event event={event} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EventList;
