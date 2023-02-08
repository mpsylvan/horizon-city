export const extractLocations = (events) =>{
    var extractLocations = events.map((event)=> event.location);
    const locations = [... new Set(extractLocations)];
    return locations;
}