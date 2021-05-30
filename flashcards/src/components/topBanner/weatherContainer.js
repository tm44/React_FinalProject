import React from 'react';
import {Container, Col, Row } from 'react-bootstrap';

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
            <Row>
                <Col xs={5} style={{marginTop: "25px"}}>
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
                </Col>
                <Col xs={7}>
                    <Row>
                    <Col xs={6} style={{marginTop: "25px"}}>
                        <span id="weather-temp">{this.state.weather.main.temp}°</span>
                        <br />
                        <span id="weather-description">{this.state.weather.weather[0].main}</span>
                    </Col>
                    <Col xs={6}>
                        <img id="weather-icon" alt="Current conditions" src={"http://openweathermap.org/img/wn/" + this.state.weather.weather[0].icon + "@2x.png"} />
                    </Col>
                    </Row>
            </Col>
            </Row>
        )}

        </>
    )
        }
}

export default WeatherContainer;