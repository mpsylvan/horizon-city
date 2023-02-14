import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    number: 32,
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      number: value,
    });
  };

  resetInput = () => {
    this.setState({
      number: 32,
    });
  };

class NumberOfEvents extends Component{

    state = {
        number : 32, 
    }

    handleInputChange = (event) =>{
        const value = event.target.value;
        this.setState({
            number: value,
        });
    };

    resetInput = () =>{
        this.setState({
            number: 32,
        })
    }

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
                    />
                </label>
                <button 
                    className ='resetButton'
                    onClick={this.resetInput } 
                >
                    Reset to 32
                </button>
            </>
            
        )
    }
}

export default NumberOfEvents;
