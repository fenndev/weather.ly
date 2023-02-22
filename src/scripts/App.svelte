<script lang="ts">
    import SearchForm from './svelte/SearchForm.svelte';
    import WeatherInfo from './svelte/WeatherInfo.svelte';
    import type WeatherData from './classes/WeatherData';
    import { weather } from './classes/Store.js';
    import Loader from './svelte/Loader.svelte';
</script>

<main>
    <Loader />
    <SearchForm />
    {#if $weather}
        <WeatherInfo />
    {/if}
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
