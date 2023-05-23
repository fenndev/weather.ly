<script lang="ts">
    import { weather } from '../classes/Store';
</script>

<div class="container">
    <p>
        {$weather.cityName}, {#if $weather.stateName}{$weather.stateName},
        {/if}{$weather.countryName}
    </p>
    <p>
        Temperature: {$weather.temperature}
        {$weather.temperatureUnits}
    </p>
    <p>Weather Type: {$weather.weatherType}</p>
    <p>
        Wind Speed: {$weather.windSpeed}
        {$weather.windSpeedUnits}
    </p>
    <p>
        Humidity: {$weather.humidity}%
    </p>
    <p>
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
