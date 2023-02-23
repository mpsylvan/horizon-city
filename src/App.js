import React, { Component } from "react";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import "./App.css";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import "./nprogress.css";
import WelcomeScreen from "./WelcomeScreen";

// the root component

class App extends Component {
  // root component has two key states: 1) an array of events 2) an array of locations.
  // an updateEvents function is declared that updates that state of events to be either a full list of all events returned from the getEvents helper function
  // or a filtered array that matches the location parameter passed in at the call site.
  // this function gets passed through props to the citySearch component where it get's called each time a suggestion is clicked, and a location is loaded into the function.
  state = {
    events: [],
    locations: [],
    numberOfEvents: 20,
    selectedLocation: "all",
    showWelcomeScreen: undefined, // flag for determining if / when to render
  };

  // updateEvents function has two parameters either of which can be passed at the call site, and called as undefined.
  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      if (location) {
        const locationEvents =
          location === "all"
            ? events
            : events
                .filter((event) => event.location === location)
                .slice(0, this.state.numberOfEvents);
        this.setState({
          events: locationEvents,
          selectedLocation: location,
        });
      }
      if (eventCount) {
        // const eventsStateArray = [...this.state.events];
        const locationEvents =
          this.state.selectedLocation === "all"
            ? events
            : events.filter(
                (event) => event.location === this.state.selectedLocation
              );
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      }
    });
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);

    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App" style={{ display: "flex", flexDirection: "column" }}>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
