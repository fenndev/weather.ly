<script lang="ts">
    import SearchForm from './svelte/SearchForm.svelte';
    import WeatherInfo from './svelte/WeatherInfo.svelte';
    import type WeatherData from './classes/WeatherData';
    import { weather } from './classes/Store.js';
</script>

<main>
    <SearchForm />
    {#if $weather}
        <WeatherInfo />
    {/if}
</main>
