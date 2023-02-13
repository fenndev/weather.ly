<script lang="ts">
    import SearchForm from './svelte/SearchForm.svelte';
    import WeatherInfo from './svelte/WeatherInfo.svelte';
    import WeatherController from './classes/WeatherController';
    import type { WeatherData } from './classes/WeatherModel';
    import { onMount } from 'svelte';
    import { weatherData } from './classes/Store.js';
    
    let weatherInfo: WeatherData;
    let weatherController: WeatherController;
    onMount(() => {
        weatherController = new WeatherController();
    });

    async function fetchWeatherInfo(location: string, units: string) {
        weatherInfo = await weatherController.getWeatherInformation(location, units);
        weatherData.set(weatherInfo);
    }
</script>

<main>
    <SearchForm onSubmit={(location, units) => fetchWeatherInfo(location, units)}/>
    {#if $weatherData}
    <WeatherInfo weatherData={$weatherData}/>
    {/if}
</main>