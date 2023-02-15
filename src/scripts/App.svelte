<script lang="ts">
    import SearchForm from './svelte/SearchForm.svelte';
    import WeatherInfo from './svelte/WeatherInfo.svelte';
    import WeatherController from './classes/WeatherController';
    import type WeatherData from './classes/WeatherData';
    import { onMount } from 'svelte';
    import { weather } from './classes/Store.js';

    let weatherInfo: WeatherData;
    let weatherController: WeatherController;
    onMount(() => {
        weatherController = new WeatherController();
    });

    async function fetchWeatherInfo(location: string, units: string) {
        weatherInfo = await weatherController.getWeatherInformation(
            location,
            units
        );
        weather.updateWeather(weatherInfo);
    }

    function handleUnitChange() {
        if (!weatherInfo) return;
        weatherInfo = weatherInfo.convertUnits();
        weather.updateWeather(weatherInfo);
    }
</script>

<main>
    <SearchForm
        onSubmit={(location, units) => fetchWeatherInfo(location, units)}
        onUnitChange={() => handleUnitChange()}
    />
    {#if $weather}
        <WeatherInfo weatherData={$weather} />
    {/if}
</main>
