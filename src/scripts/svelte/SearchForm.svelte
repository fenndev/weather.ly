<script lang="ts">
    import { weather } from '../classes/Store';
    import fetchWeather from '../functions/FetchWeather';
    import RateLimiter from '../classes/RateLimiter';
    import { onMount } from 'svelte';
    let rateLimiter: RateLimiter;
    let location: string = '';
    let selectedUnitSystem: string = '';

    onMount(() => (rateLimiter = new RateLimiter()));

    $: {
        if ($weather) weather.convertUnits(selectedUnitSystem);
    }

    async function handleSubmit() {
        if (rateLimiter.isRateLimitReached()) return;
        fetchWeatherInfo(location, selectedUnitSystem);
    }

    async function fetchWeatherInfo(location: string, units: string) {
        const weatherInfo = await fetchWeather(location, units);
        weather.updateWeather(weatherInfo);
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div>
        <input
            bind:value={location}
            type="text"
            name="location"
            placeholder="Enter a location..."
        />
        <button type="submit">Submit</button>
    </div>
    <fieldset>
        <legend>Unit System: </legend>
        <div>
            <input
                required
                bind:group={selectedUnitSystem}
                type="radio"
                name="units"
                id="metric"
                value="metric"
            />
            <label for="metric">Metric</label>
        </div>
        <div>
            <input
                required
                bind:group={selectedUnitSystem}
                type="radio"
                name="units"
                id="imperial"
                value="imperial"
            />
            <label for="imperial">Imperial</label>
        </div>
    </fieldset>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    input[type='text'] {
        width: 400px;
        padding: 0;
        height: 40px;
        font-size: 18px;
        margin-right: 10px;
    }

    fieldset {
    }

    button[type='submit'] {
        width: 100px;
        height: 40px;
        background-color: blue;
        color: white;
        font-size: 19px;
        border: none;
        cursor: pointer;
    }
</style>
