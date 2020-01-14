import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";




function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [className, setClassName] = useState("app");


  const search = evt => {
    if (evt.key === "Enter") {
      axios.get(`$${process.env.REACT_APP_API}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
          setQuery('');
          setWeather(response.data);
          setClassName("app " + response.data.weather[0].main)
          console.log("hjkgfjgdsjgf", response);

        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Make sure location is spelled Correctly',

          })
        })
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }



  return (
    <div className={className}>



      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp * 9 / 5 + 32)}°F
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>


        ) : (

            <div className="start">
              Search city to check weather!
       </div>
          )}
      </main>
    </div>
  );
}

export default App;
