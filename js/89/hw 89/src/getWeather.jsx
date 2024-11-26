import { Component } from "react";
import { DisplayWeather } from "./displayWeather"

export class GetWeather extends Component {

apiKey = '4d940566413cbb48ddbe156f2b502364';
     zip = 11691;

     state = {
      location: "Default location",
      image: "Default image",
      temp: "Default temp",
      desc: "Default desc",
      success: true, 
    };

  async componentDidMount() {

    try {
      const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.zip},US&appid=${this.apiKey}&units=imperial`);

      const weatherData = await r.json();

      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
      }

      console.log(weatherData);
      this.setState({
       location: weatherData.name,    
        image: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
        temp: weatherData.main.temp,
        desc: weatherData.weather[0].description,
      })
    }
    catch (e) {
      console.log(e);

      this.setState({
        success: false
       })
    }
  }

  render() {
    return (<>
      <DisplayWeather location={this.state.location} image={this.state.image} temp={this.state.temp} desc={this.state.desc} success = {this.state.success} />
    </>
    )
  }

}