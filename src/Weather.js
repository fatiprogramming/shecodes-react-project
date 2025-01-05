import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Weather() {
  const [city, setCity] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState('');
  const [icon, setIcon] = useState('');
  const [forecast, setForecast] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const apiKey = '5863935ee9cca4c02ed68203f807c65b';

  const displayTemperature = (response) => {
    const temperature = Math.round(response.data.main.temp);
    const city = response.data.name;
    const iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    const humidity = response.data.main.humidity;
    const windSpeed = response.data.wind.speed;

    setCity(city);
    setTemperature(temperature);
    setIcon(iconUrl);
    setWeatherDetails(
      `, humidity is ${humidity}% and wind speed is ${windSpeed} m/s`
    );
    getForecast(city);
    setSearchPerformed(true);
  };

  const search = (event) => {
    event.preventDefault();
    setCity(inputValue);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search(event);
    }
  };

  const getForecast = (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response) => {
      setForecast(response.data.list.slice(0, 5));
    });
  };

  return (
    <div className='all'>
      <div className='weather-app'>
        <div className='clouds-container'>
          <img src='images/clouds.png' alt='Clouds' className='image-clouds' />
        </div>
        <header>
          <form id='search-form' onSubmit={search}>
            <input
              type='search'
              placeholder='Enter a city..'
              required
              className='search-input'
              id='search-input'
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <input type='submit' value='Search' className='search-button' />
          </form>
        </header>
        <main>
          <div className='current-weather'>
            <div>
              <h1 className='current-city' id='current-city'>
                {searchPerformed ? city : 'Enter a city'}
              </h1>
              <p className='current-details'>
                <span id='current-date'>{new Date().toLocaleString()}</span>
                <span id='weather-details'>{weatherDetails}</span>
              </p>
            </div>
            <div className='current-temperature'>
              {searchPerformed && (
                <>
                  <span>
                    <img
                      src={icon}
                      alt='Weather Icon'
                      className='current-temperature-icon'
                    />
                  </span>
                  <span
                    className='current-temperature-value'
                    id='current-temperature'
                  >
                    {temperature !== null ? temperature : 0}
                  </span>
                  <span className='current-temperature-unit'>℃</span>
                </>
              )}
            </div>
          </div>
        </main>
        <section className='forecast'>
          {forecast.map((day, index) => (
            <div key={index} id='daily-forecast'>
              <p className='day'>
                {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                  weekday: 'short',
                })}
              </p>
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  className='forecast-icon'
                  alt='Forecast Icon'
                />
              </div>
              <span className='weather max'>
                {Math.round(day.main.temp_max)}º
              </span>
              <span className='weather min'>
                {Math.round(day.main.temp_min)}º
              </span>
            </div>
          ))}
        </section>
        <footer>
          <p>
            This project was coded by
            <a href='/' target='_blank' rel='noopener noreferrer'>
              {' '}
              Fátima Blanco
            </a>{' '}
            and is
            <a
              href='https://github.com/fatiprogramming/shecodes-react-project'
              target='_blank'
              rel='noopener noreferrer'
            >
              {' '}
              https://github.com/fatiprogramming/shecodes-react-project
            </a>
            on GitHub and hosted on Netlify
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Weather;

