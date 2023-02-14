import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../App';
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents"
import {extractLocations, getEvents} from "../api";
import { mockData } from '../mock_data';

// unit test scope for App component
describe('<App /> component', ()=>{

    // consolidate the shallow wrapper into one beforeAll function.
    let AppWrapper;
    beforeAll(()=>{
        AppWrapper = shallow(<App />);
    })

    test('render single event list', ()=>{
        // expect only 1 Event List component within AppWrapper 
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    })
    test('City Search', ()=>{
        // expect 1 CitySearch component to exist
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    })

    test("<NumberOfEvents> component", ()=>{
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    })
});

// integration test scope for App component
describe('<App /> component integration', ()=>{
    test("<App /> passes events state to <EventList /> props", ()=>{
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state("events");
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).prop('events')).toEqual(AppEventsState);
        AppWrapper.unmount();
    })
    test("<App /> passes locations state to <CitySearch /> props", ()=>{
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state("locations");
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).prop('locations')).toEqual(AppLocationsState);
        AppWrapper.unmount();
    })
    
    test("clicking a suggestion updates the event list rendered", async ()=>{
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({suggestions: locations});
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * suggestions.length);
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        // an events array filled with on events with a location prop equal to selectedCity
        const eventsToShow = allEvents.filter((event)=>event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    })

    test("get a list of all events when user selects see all", async ()=>{
        const AppWrapper = mount(<App />);
        // grab ann array of all suggestion items being rendered.
        const suggestionItems =AppWrapper.find(CitySearch).find(".suggestions li");
        suggestionItems.at(suggestionItems.length -1).simulate("click");
        const allEvents = await getEvents();
        expect(AppWrapper.state("events")).toEqual(allEvents);
        AppWrapper.unmount();
    })

})