import React from "react";
import NumberOfEvents from "../NumberOfEvents";
import { shallow } from "enzyme";

describe("<NumberOfEvents> component", () => {
  let NOEWrapper;
  beforeAll(() => {
    NOEWrapper = shallow(<NumberOfEvents />);
  });

  test("defaults to 32", () => {
    expect(NOEWrapper.state("number")).toBe(32);
  });

  test("renders a number input", () => {
    expect(NOEWrapper.find(".numberInput")).toHaveLength(1);
  });
  test("Input value is set to 32 based on state variable number being 32", () => {
    // expect the input's value prop to equal the state variable number
    expect(NOEWrapper.find(".numberInput").prop("value")).toEqual(
      NOEWrapper.state("number")
    );
  });
  test("new input should alter the state variable number", () => {
    const eventObject = { target: { value: 10 } };
    // simulate an event object being passed into the an handleInputChange function passed to the onChange prop.
    NOEWrapper.find(".numberInput").simulate("change", eventObject);
    expect(NOEWrapper.state("number")).toBe(eventObject.target.value);
  });

  test("renders a reset button", () => {
    expect(NOEWrapper.find(".resetButton")).toHaveLength(1);
  });

  test("clicking the button sets state to 32, (the default)", () => {
    NOEWrapper.find(".resetButton").simulate("click");
    expect(NOEWrapper.state("number")).toBe(32);
  });
});
