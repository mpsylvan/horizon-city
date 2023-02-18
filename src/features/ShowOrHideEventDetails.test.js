import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import Event from "../Event";
import EventList from "../EventList";
import { mockData } from "../mock_data";
import { extractLocations } from "../api";

const feature = loadFeature("./src/features/ShowOrHideEventDetails.feature");

defineFeature(feature, (test) => {
  test("An Event Element is collapsed by default", ({ given, when, then }) => {
    given("User has not clicked to trigger expanded details.", () => {});
    let AppWrapper;
    when(
      "User has just landed on the page, and/or is looking at other elements of the page that don’t require clicking.",
      () => {
        AppWrapper = mount(<App />);
      }
    );

    then(
      "All expanded event details will remain collapsed and data concealed.",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find(".eventCard .showDetails")).toHaveLength(
          mockData.length
        );
        expect(AppWrapper.find(".eventCard .collapseDetails")).toHaveLength(0);
      }
    );
  });

  test("User can expand event to reveal details", ({ given, when, then }) => {
    let AppWrapper;
    given(
      "User would like to access further details about an event that has interested them.",
      () => {
        AppWrapper = mount(<App />);
      }
    );

    when("User clicks a “expand details” button.", () => {
      AppWrapper.update();
      AppWrapper.find(".eventCard .showDetails").at(0).simulate("click");
    });

    then(
      "A List of further details expands before the user presented useful further data that’s connected to the event.",
      () => {
        expect(AppWrapper.find(".eventCard .description")).toHaveLength(1);
        expect(AppWrapper.find(".eventCard .collapseDetails")).toHaveLength(1);
        expect(AppWrapper.find(".eventCard .showDetails")).toHaveLength(
          mockData.length - 1
        );
      }
    );
  });

  test("User can collapse event to conceal event details", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("User wants to close an already expanded event.", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find(".eventCard .showDetails").at(0).simulate("click");
    });

    when(
      "User no longer needs to the info being displayed or is not interested in the event anymore.",
      () => {
        AppWrapper.update();
        AppWrapper.find(".eventCard .collapseDetails").at(0).simulate("click");
      }
    );

    then(
      "The expanded details will collapse returning the event to it’s reduced, unclicked state.",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find(".eventCard .description")).toHaveLength(0);
        expect(AppWrapper.find(".eventCard .collapseDetails")).toHaveLength(0);
        expect(
          AppWrapper.find(".eventCard").at(0).find(".showDetails")
        ).toHaveLength(1);
      }
    );
  });
});
