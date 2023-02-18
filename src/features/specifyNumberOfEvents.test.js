import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature("./src/features/SpecifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  let AppWrapper;
  test("User has not specified events list length so it defaults to twenty", ({
    given,
    when,
    then,
  }) => {
    given(
      "No number has been entered or selected to reduce the total events displayed.",
      () => {}
    );

    let AppWrapper;
    when(
      "User has just hit the page and has not made a decision, or they are fine browsing all twenty listed events.",
      () => {
        AppWrapper = mount(<App />);
      }
    );

    then(
      "The UI is configured to default to displaying twenty of the events within the array.",
      () => {
        expect(AppWrapper.state("numberOfEvents")).toEqual(20);
      }
    );
  });

  test("User is able to specify the number of events on display", ({
    given,
    when,
    then,
  }) => {
    given("User hard inputs a number or spins a number dial.", async () => {
      AppWrapper = await mount(<App />);
    });

    when(
      "User is trying to narrow their search criteria or view the events in smaller chunks.",
      async () => {
        AppWrapper.update();
        const NOEWrapper = AppWrapper.find(NumberOfEvents);
        const eventObject = { target: { value: 10 } };
        await NOEWrapper.find(".numberInput").simulate("change", eventObject);
      }
    );

    then(
      "The UI updates to display only the specified number of events.",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find(".eventCard")).toHaveLength(10);
      }
    );
  });
});
