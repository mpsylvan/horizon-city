import React, { Component } from "react";

class NumberOfEvents extends Component{
    
   state = {
        number : 0
    }
    

    handleInputChange = (event) =>{
        const value = event.target.value;
        this.setState({
            number: value,
        });
        this.props.updateEvents(undefined, value);
    };

  

    render(){
        
        return(
            <>
                <label>
                    Select how many events to show: 
                    <input 
                        className='numberInput'
                        type = "number"
                        value = {this.state.number}
                        onChange={this.handleInputChange}
                        min = "1"
                    />
                </label>
            </>
            
        )
    }
}

export default NumberOfEvents;
