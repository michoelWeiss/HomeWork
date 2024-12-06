import { Component } from "react";
import { DisplayWeather } from "./displayWeather"

export class GetWeather extends Component {

apiKey = '4d940566413cbb48ddbe156f2b502364';

     state = {
      location: "Default location",
      image: "Default image",
      temp: "Default temp",
      desc: "Default desc",
      success: true, 
      zip: ''
    };

  async loadWeather(zip) {
    try {
      const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${this.apiKey}&units=imperial`);

      const weatherData = await r.json();

      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
      }

      
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
       });
    }
  }
  handleChange = e => {
    let temp = e.target.value;
    this.setState({
      zip : temp
    });

    if(this.state.zip.length === 4)
      this.loadWeather(temp);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('handle submit of', this.state);
  }

  render() {
    const { zip, location, image, temp, success, desc } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div id="inputContainer">
            Zip: <input value={zip} name="zip" onChange={this.handleChange} />
          </div>
        </form>

        <DisplayWeather
          location={location}
          image={image}
          temp={temp}
          desc={desc}
          success={success}
        />
      </>
    );
  }
}
