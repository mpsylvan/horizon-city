Feature: Show or Hide an event’s details
    Scenario: An Event Element is collapsed by default
        Given User has not clicked to trigger expanded details.
        When User has just landed on the page, and/or is looking at other elements of the page that don’t require clicking.
        Then All expanded event details will remain collapsed and data concealed.
    Scenario: User can expand event to reveal details
        Given User would like to access further details about an event that has interested them.
        When User clicks a “expand details” button.
        Then A List of further details expands before the user presented useful further data that’s connected to the event.
    Scenario: User can collapse event to conceal event details
        Given User wants to close an already expanded event.
        When User no longer needs to the info being displayed or is not interested in the event anymore.
        Then The expanded details will collapse returning the event to it’s reduced, unclicked state.