<script lang="ts">
    import { weather } from '../classes/Store';
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faThermometerHalf,
        faWind,
        faTint,
        faLocation,
        faRuler,
    } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="container">
    <p>
        <Fa class="icon" icon={faLocation} />
        {$weather.cityName}, {#if $weather.stateName}{$weather.stateName},
        {/if}{$weather.countryName}
    </p>
    <p>
        <Fa class="icon" icon={faThermometerHalf} />
        Temperature: {$weather.temperature}
        {$weather.temperatureUnits}
    </p>
    <p>Weather Type: {$weather.weatherType}</p>
    <p>
        <Fa class="icon" icon={faWind} />
        Wind Speed: {$weather.windSpeed}
        {$weather.windSpeedUnits}
    </p>
    <p>
        <Fa class="icon" icon={faTint} />
        Humidity: {$weather.humidity}%
    </p>
    <p>
        <Fa class="icon" icon={faRuler} />
        Units: {$weather.unitSystem}
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
