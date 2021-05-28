import React, { useState, useEffect } from 'react';

export default function WeatherContainer(props)  {
    // TODO: Add state for weatherCity

    const [weatherCity, setWeatherCity] = useState('Barcelona');
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        setLoading(true);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&units=imperial&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                setLoading(false);
            });
    }, [weatherCity, apiKey]);

    const handleCityChange = (e) => {
        setWeatherCity(e.target.value);
    }

    return (
        <>
        {loading && <span>Loading weather...</span>}
        {!loading && (
            <div className="row">
                <div className="col-sm-4" style={{marginTop: "25px"}}>
                    <select onChange={handleCityChange}>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Madrid">Madrid</option>
                    </select>
                </div>
                <div className="col-sm-8">
                    <div className="row">
                    <div className="col-sm-3" style={{marginTop: "25px"}}>
                        <span id="weather-temp">{weather.main.temp}°</span>
                        <br />
                        <span id="weather-description">{weather.weather[0].main}</span>
                    </div>
                    <div className="col-sm-9">
                        <img id="weather-icon" alt="Current conditions" src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"} />
                    </div>
                </div>
            </div>
        </div>
        )}

        </>
    )
}
