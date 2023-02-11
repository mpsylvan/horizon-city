import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { extractLocations, getEvents } from "../api";
import { mockData } from "../mock_data";

// test scope for App component
describe("<App /> component", () => {
  // consolidate the shallow wrapper into one beforeAll function.
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render single event list", () => {
    // expect only 1 Event List component within AppWrapper
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
  test("<City Search> component", () => {
    // expect 1 CitySearch component to exist
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("<NumberOfEvents> component", () => {
    // expect 1 NumberOfEvents component to exist
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// integration testing suite
describe("<App /> integration", () => {
  test("<App/> passes 'events' state to <EventList/> prop", () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find("EventList").prop("events")).toEqual(AppEventsState);
    AppWrapper.unmount();
  });
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });
  test("clicking an suggestion should update the event list rendered", async () => {
    const AppWrapper = mount(<App />);
    // CitySearch component variable
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    // an events to show array, filled with only events with a location proper equal to the selected city.
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
  test("get a list of all events when 'see all events' item is selected", async () => {
    const AppWrapper = mount(<App />);
    // grab an array of all of the suggestion elements being rendered
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });
});
