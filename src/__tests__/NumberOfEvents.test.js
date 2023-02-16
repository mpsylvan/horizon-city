import { shallow } from 'enzyme';
import React from 'react';
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents> component', ()=>{

    let NOEWrapper; 
    beforeAll(()=>{
        NOEWrapper = shallow(<NumberOfEvents/>)
    })
    
    test("renders a number input element", ()=>{
        expect(NOEWrapper.find('.numberInput')).toHaveLength(1);
    } )

    test("input value is tied to the state of number variable", ()=>{
        expect(NOEWrapper.find(".numberInput").prop('value')).toEqual(NOEWrapper.state("number"));
    })


})