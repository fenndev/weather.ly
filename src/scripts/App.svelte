<script lang="ts">
    import SearchForm from './svelte/SearchForm.svelte';
    import WeatherInfo from './svelte/WeatherInfo.svelte';
    import WeatherController from './classes/WeatherController';
    import type { WeatherModel, WeatherData } from './classes/WeatherModel';
    import { onMount } from 'svelte';
    import { weatherData } from './classes/Store.js';
    
    let units = 'imperial';
    let weatherInfo: WeatherData;
    let weatherController: WeatherController;
    onMount(() => {
        weatherController = new WeatherController();
    });

    async function fetchWeatherInfo(location: string) {
        weatherInfo = await weatherController.getWeatherInformation(location, units);
        weatherData.set(weatherInfo);
    }
</script>

<main>
    <SearchForm onSubmit={location => fetchWeatherInfo(location)}/>
    {#if $weatherData}
    <WeatherInfo weatherData={$weatherData}/>
    {/if}
</main>