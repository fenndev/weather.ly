<script lang="ts">
    import type { WeatherData } from '../classes/WeatherModel';
    export let weatherData: WeatherData;
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faThermometerHalf, faWind, faTint, faLocation, faRuler } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="container">
    <p>
        <Fa class="icon" icon = {faLocation} />
        {weatherData.cityName}{#if weatherData.stateName}, {weatherData.stateName}, {/if}{weatherData.countryName}
    </p>
    <p>
        <Fa class="icon" icon={faThermometerHalf} />
        Temperature: {weatherData.temperature} {weatherData.temperatureUnits}
    </p>
    <p>Weather Type: {weatherData.weatherType}</p>
    <p>
        <Fa class="icon" icon={faWind} />
        Wind Speed: {weatherData.windSpeed} {weatherData.windSpeedUnits}
    </p>
    <p>
        <Fa class="icon" icon={faTint} />
        Humidity: {weatherData.humidity}%
    </p>
    <p>
        <Fa class="icon" icon={faRuler} />
        Units: {weatherData.unitSystem}
    </p>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    p {
        margin: 10px 0;
        font-size: 18px;
        text-align: center;
    }
</style>