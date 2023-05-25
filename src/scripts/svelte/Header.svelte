<script lang="ts">
    import fetchWeather from '../functions/FetchWeather';
    import RateLimiter from '../classes/RateLimiter';
    import { onMount } from 'svelte';
    import { weather } from '../classes/Store';
    import type WeatherData from '../classes/WeatherData';
    let rateLimiter: RateLimiter;
    let location: string = '';
    let thrownError: any = null;

    onMount(() => {
        rateLimiter = new RateLimiter();
        fetchWeatherInfo('seattle', 'imperial');
    });

    async function handleSubmit() {
        if (rateLimiter.isRateLimitReached()) return;
        if (thrownError) thrownError = null;
        await fetchWeatherInfo(location, $weather.unitSystem);
    }

    async function fetchWeatherInfo(
        location: string,
        units: string = 'imperial'
    ) {
        try {
            weather.updateWeather(await fetchWeather(location, units));
        } catch (error: any) {
            thrownError = error;
        }
    }
</script>

<header
    class="col-start-3 col-end-11 col-span-full flex flex-col items-start pt-4 gap-4"
>
    <h1 class="text-center w-full flex-initial text-4xl font-bold">
        weather.ly
    </h1>
    <form
        on:submit|preventDefault={handleSubmit}
        class="flex flex-col w-full flex-1 gap-4 items-center"
    >
        <input
            bind:value={location}
            type="text"
            name="location"
            placeholder="Enter a location..."
            class="text-center btn"
        />
        <button type="submit" class="btn">Submit</button>
        {#if thrownError != null}
            <div>
                <span class="error">Error: {thrownError.message}</span>
            </div>
        {/if}
    </form>
</header>
