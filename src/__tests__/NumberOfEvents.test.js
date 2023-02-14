import { shallow } from 'enzyme';
import React from 'react';
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents> component', ()=>{

    let NOEWrapper; 
    beforeAll(()=>{
        NOEWrapper = shallow(<NumberOfEvents/>)
    })
    
    test('default is 32', ()=>{
        expect(NOEWrapper.state("number")).toBe(32);
    })
    
    test("renders a number input element", ()=>{
        expect(NOEWrapper.find('.numberInput')).toHaveLength(1);
    } )

    test("input value is tied to the state of number variable", ()=>{
        expect(NOEWrapper.find(".numberInput").prop('value')).toEqual(NOEWrapper.state("number"));
    })

    test("new input should alter the state variable number", ()=>{
        NOEWrapper.find(".numberInput").simulate("change", {target: {value: 10}})
        expect(NOEWrapper.state("number")).toBe(10);
    })

    test("renders a reset button", ()=>{
        expect(NOEWrapper.find(".resetButton")).toHaveLength(1);
    })

    test("clicking reset button, returns state to 32", ()=>{
        NOEWrapper.find(".resetButton").simulate("click");
        expect(NOEWrapper.state("number")).toBe(32);
    })
})