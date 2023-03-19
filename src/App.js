import React from 'react';
import Constants from './Constants';

// The parent component for the app.
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
    }

    this.updateInput = this.updateInput.bind(this)
    this.handleGetWeather = this.handleGetWeather.bind(this)
  }

  // Updates all the text input values.
  updateInput(e) {
    const value = e.target.value
    const id = e.target.id

    if (id === Constants.CITY_INPUT_ID) {
      this.setState({
        city: value
      })
    } else {
      console.log("Unrecognized input field:" + id)
    }
  }

  // Get the weather on a button click.
  handleGetWeather() {
    console.log("Get Weather for city: " + this.state.city)
  }

  render() {
    return (
      < div className="App" >
        <h1>Welcome To Weather App</h1>
        <label>{Constants.CITY_INPUT_LABEL}</label>
        <input id={Constants.CITY_INPUT_ID} onChange={this.updateInput} />
        <button onClick={this.handleGetWeather}>
          {Constants.GET_WEATHER_BUTTON_LABEL}
        </button>
      </div >
    );
  }
}

export default App;