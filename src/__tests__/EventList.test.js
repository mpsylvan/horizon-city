import React from 'react';
import {shallow} from 'enzyme';
import EventList from "../EventList";
import Event from "../Event";
import { mockData } from '../mock_data';


// test scope for EventList events
describe('<EventList /> component', ()=>{
    test('list populates n events', ()=>{
        // create a shallow render of EventList with an events array prop of 4x
        const EventListWrapper = shallow(<EventList events ={mockData} />);
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    })
})