import React from 'react';
import {shallow} from 'enzyme';
import CitySearch from "../CitySearch";
import { mockData } from '../mock_data';
import { extractLocations } from '../api';


// 7 tests on the CitySearch component logic
describe("<CitySearch /> component", ()=>{
    let locations, CitySearchWrapper;
    beforeAll(()=>{
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations = {locations} />);
    });

    // expect that the CitySearch component renders a text input.
    test('render text input', ()=>{
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    // expect that the CitySearch componentn renders a suggestion list.
    test('renders a list of suggestions', ()=>{
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });
    // expect that the value prop of the .city input field is equal to value of the states query prop. 
    test('renders list of data correctly', ()=>{
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('state updates to match input query', () =>{
        CitySearchWrapper.setState({
            query: 'Munich',
        });
        const eventObject = {target: {value: 'Berlin'}};
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
    });

    test('render list of suggestions correctly', ()=>{
        CitySearchWrapper.setState({
            suggestions: locations,
        })
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i; i < suggestions.length + 1; i+=1){
            expect(CitySearchWrapper.find('suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });

    test('suggestion list filtered by input query', ()=>{
        CitySearchWrapper.setState({query:'', suggestions:[]});
        CitySearchWrapper.find('.city').simulate("change", {
            target: {value: "Berlin"},
        });
        const query = CitySearchWrapper.state("query");
        const filteredLocations = locations.filter((location)=>{
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });
        expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations); // toEqual for a comparison of complex arrays
    });

    test('selecting a suggestion updates query state', ()=>{
        CitySearchWrapper.setState(
            {query: 'Berlin'},
        );
        const suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);

    })

})