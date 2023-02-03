#Feature 1: Filter Events by City

Scenario 1 : When user hasn’t searched for a city, show upcoming events from all cities.

Given user hasn’t searched for any city

When the user opens the app

Then the user should see a list of all upcoming events

Scenario 2 : User should see a list of selections when they search for a city

Given the main page is open

When user starts typing in the city textbox

Then the user should see a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list.

Given the user was typing “Berlin” in the city textbox

And the list of suggested cities is showing

When the user selects a city (e.g., “Berlin, Germany”) from the list

Then their city should be changed to that city (i.e., “Berlin, Germany”)

And the user should receive a list of upcoming events in that city

Feature 2 : Show or Hide an event’s details

Scenario 1 : An Event Element is collapsed by default

Given: User has not clicked to trigger expanded details.

When: User has just landed on the page, and/or is looking at other elements of the page that don’t require clicking.

Then: All expanded event details will remain collapsed and data concealed.

Scenario 2: User can expand event to reveal details

Given: User clicks a “expand details” button.

When: User would like to access further details about an event that has interested them.

Then: A List of further details expands before the user presented useful further data that’s connected to the event.

Scenario 3: User can collapse event to conceal event details

Given: User clicks a “close details” button.

When: User no longer needs to the info being displayed or is not interested in the event anymore.

Then: The expanded details will collapse returning the event to it’s reduced, unclicked state.

Feature 3: Specify number of events
Scenario 1: User has not specified events list length so it defaults to 32

Given: No number has been entered or selected to reduce the total events displayed.

When: User has just hit the page and hasn’t made a decision, or they are fine browsing all 32 listed events.

Then: The UI is configured to default to displaying 32 of the events within the array.

Scenario 2: User is able to specify the number of events on display

Given: User hard inputs a number or spins a number dial

When: User is trying to narrow their search criteria or view the events in smaller chunks.

Then: The UI updates to display only the specified number of events.

Feature 4 : Show or Hide an event’s details

Scenario 1: User can access offline version of app with cached data

Given: User is opening app in an offline without access to WIFI/Data.

When: User is attempted to refer to a state of the app displaying loaded details about a specific cities events in a specific or timeframe e.g.

Then: The data has been cached on the front end is displayed for the user even in an offline state.

Scenario 2: Show error when user changes the settings (city, time range)

Given: User attempts to select new filters for data such as city, timeframe.

When: User is needs to update their search criteria or change it entirely to a different city.

Then: Error message is alerted to user explaining that these changes can’t be made until internet access is restored.

Feature 5: Data visualization
Scenario 1: Show a chart with upcoming events in each city

Given: User clicks a “display chart view” from the toolbar.

When: User wants to understand the events landscape broken out in a different perspective that shows each city as a hub containing respective activities.

Then: UI responds by opening up a chart view that displays the data in a different format then the list view.
