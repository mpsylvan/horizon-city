import React, { Component } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import EventGenre from "./EventGenre";
import NumberOfEvents from "./NumberOfEvents";
import "./App.css";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import "./nprogress.css";
import WelcomeScreen from "./WelcomeScreen";

// the root component

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 20,
    selectedLocation: "all",
    showWelcomeScreen: undefined, // flag for determining if / when to render Welcome Screen Component
  };

  // return a data array filled with objects created by : for every location in locations, run a tally of how many events have a matching location property, and then return that tally and the city string (without country) as 2x property object.

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    console.log(data);
    return data;
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
    if (window.location.href.startsWith("http://localhost")) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

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
        <h1>Welcome to the Horizon City App</h1>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer
            height={300}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                type="number"
                dataKey="number"
                name="# of events"
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#3fc" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
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
