Feature: Specify number of events
    Scenario: User has not specified events list length so it defaults to twenty
        Given No number has been entered or selected to reduce the total events displayed.
        When User has just hit the page and has not made a decision, or they are fine browsing all twenty listed events.
        Then The UI is configured to default to displaying twenty of the events within the array.
    Scenario: User is able to specify the number of events on display
        Given User hard inputs a number or spins a number dial.
        When User is trying to narrow their search criteria or view the events in smaller chunks.
        Then The UI updates to display only the specified number of events.