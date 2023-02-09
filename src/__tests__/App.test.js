import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";

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
