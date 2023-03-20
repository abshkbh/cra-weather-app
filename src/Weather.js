import React from 'react';

// Takes in a HTTP |response| and throws an error if it's not 200 else returns |response| as is.
function handleFetchErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// Shows the weather for a city.
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading_weather: true,
      // This will be a list of objects like this [{"date1" : {"min_temp" : min_temp, "max_temp": max_temp}, {"date2" : {"min_temp" : min_temp, "max_temp": max_temp}]
      weather_data: [],
    }

    this.loadWeather = this.loadWeather.bind(this)
  }

  loadWeather() {
    // TODO: Modify route for this.props.city.
    let route_to_fetch = "https://api.open-meteo.com/v1/forecast?latitude=30.06&longitude=31.25&daily=temperature_2m_max,temperature_2m_min&start_date=2023-03-19&end_date=2023-03-26&timezone=America%2FLos_Angeles"
    console.log('Posting to: ' + route_to_fetch)
    fetch(route_to_fetch,
      {
        method: 'GET',
      }
    ).then(handleFetchErrors)
      .then(response => {
        console.log("Weather API Response: ", response)
        return response.json()
      }
      )
      .then(data => {
        console.log("Weather API Data: ", data)
        const num_entries = data.daily.time.length
        let weather_data = []
        console.log("Weather API entries: ", num_entries)
        for (let i = 0; i < num_entries; i++) {
          let entry_date = data.daily.time[i];
          let entry = { "date": entry_date, "min_temp": data.daily.temperature_2m_min[i], "max_temp": data.daily.temperature_2m_max[i] };
          weather_data.push(entry)
        }
        console.log("Weather Data ", weather_data)
        this.setState({
          loading_weather: false,

          weather_data: weather_data,
        })
      }
      )
      .catch(error => {
        console.log("Weather API Error: ", error)
      })

  }

  componentDidMount() {
    this.loadWeather()
  }

  render() {
    if (this.state.loading_weather) {
      return (
        <h1>Loading weather for {this.props.city}</h1>
      );
    }

    return (
      <ul>
        {this.state.weather_data.map((obj, index) => (
          <li key={index}>
            <p>Date: {obj.date}</p>
            <p>Min Temp: {obj.min_temp}</p>
            <p>Max Temp: {obj.max_temp}</p>
          </li>
        ))}
      </ul>
    );
  }

}

export default Weather;