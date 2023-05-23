<script lang="ts">
    import { getContext } from 'svelte';
    import { date, time } from '../../classes/Store';
    import type WeatherData from '../../classes/WeatherData';
    const weather: WeatherData = getContext('weather');
</script>

<header>
    <section>
        <p>{date}</p>
        <p>{time}</p>
    </section>
    <section>
        <p>{weather.cityName}</p>
        <p>{weather.countryName}</p>
    </section>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
