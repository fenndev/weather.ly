<script lang="ts">
    import type { WeatherData } from '../classes/WeatherModel';
    export let weatherData: WeatherData;
</script>

<div>
    <p>{weatherData.cityName}</p>
    <p>{#if weatherData.stateName}{weatherData.stateName}, {/if}{weatherData.countryName}</p>
    <p>Temperature: {weatherData.temperature} {weatherData.temperatureUnits}</p>
    <p>Weather Type: {weatherData.weatherType}</p>
    <p>Wind Speed: {weatherData.windSpeed} {weatherData.windSpeedUnits}</p>
    <p>Humidity: {weatherData.humidity}%</p>
    <p>Units: {weatherData.unitSystem}</p>
</div>
