// utility file for all api calls and processing functions 
import { mockData } from "./mock_data";

export const extractLocations = (events) =>{
    var extractLocations = events.map((event)=> event.location);
    const locations = [...new Set(extractLocations)];
    return locations;
}

export const getEvents = async ()=>{
    return mockData;
}