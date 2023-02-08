import React from 'react';
import Event from "../Event";
import {shallow} from 'enzyme';
import { mockData } from '../mock_data';

describe(' <Event /> component', ()=>{
    let EventWrapper;
    let event;
    beforeAll(()=>{
        event = mockData[0];       
        EventWrapper = shallow(<Event event = {event}/>);
    });

    test('render a Title Element', ()=>{
        expect(EventWrapper.find('.eventTitle')).toHaveLength(1);
    })

    test('Title Element has correct data', ()=>{
        const titleElement = EventWrapper.find('.eventTitle');
        const titleElementText = titleElement.text();
        const  summaryExtracted = event.summary;
        expect(titleElementText).toEqual(summaryExtracted);
    })

    test('render a Time <p> Element', ()=>{
        expect(EventWrapper.find('.eventTitle')).toHaveLength(1);
    })

    test('Time <p> element data rendered properly', ()=>{
        const timeElement = EventWrapper.find('.eventTime');
        const timeElementText = timeElement.text();
        const dateTimeExtracted = event.start.dateTime;
        const timeZoneExtracted = event.start.timeZone;
        expect(timeElementText).toEqual(`${dateTimeExtracted}(${timeZoneExtracted})`);
    })

    test('render a Location <p> Element', ()=>{
        expect(EventWrapper.find('.eventLocation')).toHaveLength(1);
    })

    test('Location <p> element data rendered properly', ()=>{
        const locationElement = EventWrapper.find('.eventLocation');
        const locationElementText = locationElement.text();
        const summaryExtracted = event.summary;
        const locationExtracted = event.location;
        expect(locationElementText).toEqual(`@${summaryExtracted}||${locationExtracted}`)
    })

    test('render a Details Button', ()=>{
        expect(EventWrapper.find('.showDetails')).toHaveLength(1);
    })

    test("elements are intially collapsed and details button text === Show Details", ()=>{
        expect(EventWrapper.state('details')).toBe(false);
        expect(EventWrapper.find('.showDetails').text()).toBe('Show Details');
        
    })
})