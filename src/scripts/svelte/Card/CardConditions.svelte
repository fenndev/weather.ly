<script lang="ts">
    import { weather } from '../../classes/Store';
    import type WeatherData from '../../classes/WeatherData';
</script>

<section class="conditions">
    <div class="conditions__main">
        <p>{$weather.temperature}{$weather.temperatureUnits}</p>
        <p>{$weather.weatherType}</p>
    </div>
    <div class="conditions__secondary">
        <div class="conditions__box">
            <p>Humidity</p>
            <p>{$weather.humidity}%</p>
        </div>
        <div class="conditions__box">
            <p>Wind Speed</p>
            <p>{$weather.windSpeed}{$weather.windSpeedUnits}</p>
        </div>
        <!-- Not Implemented Yet -->
        <div class="conditions__box">
            <p>Pressure</p>
            <p>Placeholder Pressure Data</p>
        </div>
    </div>
</section>
