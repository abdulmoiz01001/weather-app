import { useState } from "react"
import React from 'react'

const Weather = () => {

    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState({});

    const api = {
        key: "89804c829f4711e5f33de03367889049",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${cityName}&units=metric&appid=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result);
                    setCityName("");
                })

        }
    }

    const DateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();

        return ` ${day} ,${date} ${month} ${year}`;
    }

    return (
    
            <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'appWarm' : 'app') : 'app'}>

                <input value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="SearchBar"
                    onKeyPress={search}

                />

                {(typeof weather.main != "undefined") ? (
                    <div className='weatherBox'>
                        <div className="weatherName">
                            {weather.name} ,{weather.sys.country}
                        </div>
                        <div className="dateBox">
                            {DateBuilder(new Date())}
                        </div>
                        <div className="temp">
                            {Math.round(weather.main.temp)}°C
                        </div>
                        <div className="WeatherType">
                            {weather.weather[0].main}
                        </div>
                    </div>
                ) : ("Search Weather")}
            </div>

    )
}

export default Weather