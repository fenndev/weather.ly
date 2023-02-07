<script lang="ts">
    import SearchForm from './svelte/SearchForm.svelte';
    import WeatherInfo from './svelte/WeatherInfo.svelte';
    import WeatherController from './classes/WeatherController';
    import { WeatherModel, WeatherData } from './classes/WeatherModel';
    import { onMount } from 'svelte';
    import store from 'svelte/store';
</script>

