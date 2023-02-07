<script lang="ts">
    import type WeatherData from '../classes/WeatherModel';
    export let weatherData: WeatherData;
    let temperatureUnits: string;
    let windSpeedUnits: string;
    
    if(weatherData.units == 'metric') {
        temperatureUnits = '°C';
        windSpeedUnits = 'kph';
    }
    else {
        temperatureUnits = '°F';
        windSpeedUnits = 'mph';
    }
</script>

<div>
    <p>City: {weatherData.cityName}</p>
    {#if weatherData.stateName != null}
    <p>State: {weatherData.stateName}</p>
    {/if}
    <p>Country: {weatherData.countryName}</p>
    <p>Temperature: {weatherData.temperature}{temperatureUnits}</p>
    <p>Weather Type: {weatherData.weatherType}</p>
    <p>Wind Speed: {weatherData.windSpeed}{windSpeedUnits}</p>
    <p>Humidity: {weatherData.humidity}</p>
    <p>Units: {weatherData.units}</p>
</div>
