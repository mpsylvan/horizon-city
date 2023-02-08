import React, {Component} from "react";
import { mockData } from "./mock_data";



/* 

    Each Event is going to have surface information { summary, start : {dateTime, timeZone},  }
    Each Event is going to also have a button that reveals further details upon click
*/




class Event extends Component{

    state = {
        details: false,
    }

    handleShowDetails = (event)=>{
        // const value = event.target.value;
        // const suggestions = this.props.locations.filter((location)=>{
        //     return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        // })
        // this.setState({
        //     query: value, 
        //     suggestions,
        // });
    }
    
    handleHideDetails = (event)=>{
        // this.setState({
        //     query: suggestion, 
        // })
    }

    render(){
        return (
            <>
                <h3 className="eventTitle">{mockData[0].summary}</h3>
                <p className="eventTime">{mockData[0].start.dateTime}({mockData[0].start.timeZone})</p>
                <p className="eventLocation">@{mockData[0].summary}||{mockData[0].location}</p>
                
                {!this.state.details?
                    (
                        <>
                            <button className= "showDetails" onClick>Show Details</button>
                            <h4 className="aboutHeader"></h4>
                            <a className="calendarLink"></a>
                        </>
                    )
                            :
                    (
                        <>
                            <button className= "collapseDetails" onClick>Collapse Details</button>
                            <h4 className="aboutHeader">About this event:</h4>
                            <a className="calendarLink" href={mockData[0].htmlLink}>See details on Google Calendar{mockData[0].htmlLink}</a>
                        </>
                    )
                }
                
            </>
        )
    }
}

export default Event;