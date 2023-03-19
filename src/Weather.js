import React from 'react';

// Shows the weather for a city.
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading_weather: true,
    }
  }

  render() {
    if (this.state.loading_weather) {
      return (
        <h1>Loading weather for {this.props.city}</h1>
      );
    }

    return (
      <h1>TODO</h1>
    );
  }

}

export default Weather;