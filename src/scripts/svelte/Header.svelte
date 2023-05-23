<script lang="ts">
    import fetchWeather from '../functions/FetchWeather';
    import RateLimiter from '../classes/RateLimiter';
    import { onMount } from 'svelte';
    import { weather } from '../classes/Store';
    import type WeatherData from '../classes/WeatherData';
    let rateLimiter: RateLimiter;
    let location: string = '';
    let selectedUnitSystem: string = '';
    let thrownError: any = null;

    onMount(() => {
        rateLimiter = new RateLimiter();
        fetchWeatherInfo('seattle', 'imperial');
        console.log(thrownError);
    });

    $: {
        if ($weather) $weather.convertUnits(selectedUnitSystem);
    }

    async function handleSubmit() {
        if (rateLimiter.isRateLimitReached()) return;
        await fetchWeatherInfo(location, selectedUnitSystem);
    }

    async function fetchWeatherInfo(location: string, units: string) {
        try {
            weather.updateWeather(await fetchWeather(location, units));
        } catch (error: any) {
            console.log(error.message);
            thrownError = error;
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
            {#if thrownError != null}
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
