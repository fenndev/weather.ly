<script lang="ts">
    import { isLoading } from '../classes/Store';
    import fetchWeather from '../functions/FetchWeather';
    import RateLimiter from '../classes/RateLimiter';
    import { getContext, onMount, setContext } from 'svelte';
    import type WeatherData from '../classes/WeatherData';
    let rateLimiter: RateLimiter;
    let location: string = '';
    let selectedUnitSystem: string = '';
    let thrownError = null;
    const weather: WeatherData = getContext('weather');

    onMount(() => {
        rateLimiter = new RateLimiter();
        fetchWeatherInfo('seattle', 'imperial');
    });

    $: {
        if (weather) weather.convertUnits(selectedUnitSystem);
    }

    async function handleSubmit() {
        if (rateLimiter.isRateLimitReached()) return;
        fetchWeatherInfo(location, selectedUnitSystem);
    }

    async function fetchWeatherInfo(location: string, units: string) {
        try {
            isLoading.set(true);
            const weatherInfo = await fetchWeather(location, units);
            setContext('weather', weatherInfo);
            thrownError = null;
            isLoading.set(false);
        } catch (error: unknown) {
            thrownError = error;
            isLoading.set(false);
        }
    }
</script>

<header>
    <h1>weather.ly</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <div>
            <input
                bind:value={location}
                type="text"
                name="location"
                placeholder="Enter a location..."
            />
            <button type="submit">Submit</button>
            {#if thrownError}
                <div>
                    <span class="error">Error: {thrownError.message}</span>
                </div>
            {/if}
        </div>
    </form>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
    }
</style>
