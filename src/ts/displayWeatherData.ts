import { WeatherData } from "./fetchWeatherData";

export default function displayWeatherData(weather: WeatherData) {
    const body = document.querySelector('body');
    const cityInfo = document.querySelector('.city-info');
    const timeDisplay = document.querySelector('.time-display');
    const dateDisplay = document.querySelector('.date-display');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherDescription = document.querySelector('.weather-description');
    const temperature = document.querySelector('.temperature');
    const windSpeed = document.querySelector('.wind-speed');
    const humidity = document.querySelector('.humidity');
    const imperialButton = document.querySelector('.imperial-button');
    const metricButton = document.querySelector('.metric-button');

    if(weather.stateName != undefined)
        cityInfo.textContent = `${weather.cityName}, ${weather.stateName}, ${weather.countryName}`;
    else
        cityInfo.textContent = `${weather.cityName}, ${weather.countryName}`;
    timeDisplay.textContent = new Date().toLocaleTimeString();
    dateDisplay.textContent = new Date().toLocaleDateString();
    // weatherIcon todo

    weatherDescription.textContent = weather.weatherDescription.toUpperCase();

    if(weather.units === 'imperial') {
        temperature.textContent = `${weather.temperature}°F`;
        windSpeed.textContent = `${weather.windSpeed} mph`;
        humidity.textContent = `${weather.humidity}%`;
    }
    else
    {
        temperature.textContent = `${weather.temperature}°C`;
        windSpeed.textContent = `${weather.windSpeed} km/h`;
        humidity.textContent = `${weather.humidity}%`;
    }
}