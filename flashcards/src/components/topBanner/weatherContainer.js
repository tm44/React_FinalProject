import React from 'react';

class WeatherContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherCity: 'Barcelona',
            weather: {},
            loading: true
        }
    }

    apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    componentDidMount() {
        this.getWeatherForCity();
    }

    getWeatherForCity() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.weatherCity}&units=imperial&appid=${this.apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    weather: data,
                    loading: false
                });
            });
    }

    handleCityChange = (e) => {
        this.setState({
            weatherCity: e.target.value
        }, () => this.getWeatherForCity());
    }


    render() {
        return (
        <>
        {this.state.loading && <span>Loading weather...</span>}
        {!this.state.loading && (
            <div className="row">
                <div className="col-sm-4" style={{marginTop: "25px"}}>
                    <select onChange={this.handleCityChange}>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Galicia">Galicia</option>
                        <option value="Malaga">Malaga</option>
                        <option value="Murcia">Murcia</option>
                        <option value="Seville">Seville</option>
                        <option value="Zaragoza">Zaragoza</option>
                    </select>
                </div>
                <div className="col-sm-8">
                    <div className="row">
                    <div className="col-sm-3" style={{marginTop: "25px"}}>
                        <span id="weather-temp">{this.state.weather.main.temp}°</span>
                        <br />
                        <span id="weather-description">{this.state.weather.weather[0].main}</span>
                    </div>
                    <div className="col-sm-9">
                        <img id="weather-icon" alt="Current conditions" src={"http://openweathermap.org/img/wn/" + this.state.weather.weather[0].icon + "@2x.png"} />
                    </div>
                </div>
            </div>
        </div>
        )}

        </>
    )
        }
}

export default WeatherContainer;