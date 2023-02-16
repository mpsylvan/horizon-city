import React, {Component} from "react";




/* 

    Each Event is going to have surface information { summary, start : {dateTime, timeZone},  }
    Each Event is going to also have a button that reveals further details upon click
*/

class Event extends Component {
  state = {
    details: false,
  };

    handleShowDetails = (event)=>{
        this.setState({
            details: true,
        })
    }
    
    handleHideDetails = (event)=>{
       this.setState({
        details: false,
       })
    }

    render(){
        const {event} = this.props;
        return (
            <div className="eventCard"style={{border: "1px solid black", margin: "5px", background: "#7a8", color: "#fff"}}>
                <h3 className="eventTitle">{event.summary}</h3>
                <p className="eventTime">{event.start.dateTime}({event.start.timeZone})</p>
                <p className="eventLocation" style={{color: "#000"}}>@{event.summary} || {event.location}</p>
                
                {!this.state.details?
                    (
                        <>
                            <button className= "showDetails" onClick = {this.handleShowDetails}>Show Details</button>
                        </>
                    )
                            :
                    (
                        <>
                            <button className= "collapseDetails" onClick ={this.handleHideDetails}>Collapse Details</button>
                            <h4 className="aboutHeader">About this event:</h4>
                            <a className="calendarLink" href={event.htmlLink}>See details on Google Calendar</a>
                            <p className="description">{event.description}</p>
                        </>
                    )
                }
                
            </div>
        )
    }
}

export default Event;
