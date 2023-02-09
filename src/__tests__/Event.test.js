import React from "react";
import Event from "../Event";
import { shallow } from "enzyme";
import { mockData } from "../mock_data";

describe("<Event /> component", () => {
  let EventWrapper;
  let event;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test("render a Title Element", () => {
    // expect the event title element to render 1 time.
    expect(EventWrapper.find(".eventTitle")).toHaveLength(1);
  });

  test("Title Element has correct data", () => {
    const titleElement = EventWrapper.find(".eventTitle");
    const titleElementText = titleElement.text();
    const summaryExtracted = event.summary;
    // expect the appropriate summary element rendering correct data
    expect(titleElementText).toEqual(summaryExtracted);
  });

  test("render a Time <p> Element", () => {
    expect(EventWrapper.find(".eventTitle")).toHaveLength(1);
  });

  test("Time <p> element data rendered properly", () => {
    const timeElement = EventWrapper.find(".eventTime");
    const timeElementText = timeElement.text();
    const dateTimeExtracted = event.start.dateTime;
    const timeZoneExtracted = event.start.timeZone;
    // expection the rendered time element to match the approriate string/data
    expect(timeElementText).toEqual(
      `${dateTimeExtracted}(${timeZoneExtracted})`
    );
  });

  test("render a Location <p> Element", () => {
    expect(EventWrapper.find(".eventLocation")).toHaveLength(1);
  });

  test("Location <p> element data rendered properly", () => {
    const locationElement = EventWrapper.find(".eventLocation");
    const locationElementText = locationElement.text();
    const summaryExtracted = event.summary;
    const locationExtracted = event.location;
    // expection the rendered location element to match the approriate string/data
    expect(locationElementText).toEqual(
      `@${summaryExtracted}||${locationExtracted}`
    );
  });

  test("render a Details Button", () => {
    // expect the show details button to exist 1 time.
    expect(EventWrapper.find(".showDetails")).toHaveLength(1);
  });

  test("elements are intially collapsed and details button text === Show Details", () => {
    //expect the default state of details to be false
    expect(EventWrapper.state("details")).toBe(false);
    // expect the show details button to display the correct message
    expect(EventWrapper.find(".showDetails").text()).toBe("Show Details");
  });

  test("when ShowDetails is clicked state of details is true, and Hide Details a button renders", () => {
    EventWrapper.find(".showDetails").simulate("click");
    // expect the state of details to change to true.
    expect(EventWrapper.state("details")).toEqual(true);
    //expect the collapse details button to render proper text
    expect(EventWrapper.find(".collapseDetails").text()).toBe(
      "Collapse Details"
    );
    // expect the about header to render
    expect(EventWrapper.find(".aboutHeader")).toHaveLength(1);
    // expect the calendar link to have the correct href
    expect(EventWrapper.find(".calendarLink").prop("href")).toBe(
      mockData[0].htmlLink
    );
    // expect the event description to have the correct data.
    expect(EventWrapper.find(".eventDescription").text()).toBe(
      mockData[0].description
    );
  });

  test("when Hide Details button is clicked, state details revers to true, button is swapped, extra details elements removed", () => {
    EventWrapper.find(".collapseDetails").simulate("click");
    // expect the state of details to revert to false after click
    expect(EventWrapper.state("details")).toBe(false);
    // expect the show details button to be rendered
    expect(EventWrapper.find(".showDetails")).toHaveLength(1);
    //expect the show details button to display proper text
    expect(EventWrapper.find(".showDetails").text()).toBe("Show Details");
    //expect the collapse details button to not render
    expect(EventWrapper.find(".collapseDetails").exists()).toBe(false);
    //expect the parent div holding the further details to not render
    expect(EventWrapper.find(".moreDetails").exists()).toBe(false);
  });
});
