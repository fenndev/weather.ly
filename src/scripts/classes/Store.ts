import { writable } from 'svelte/store';
import type WeatherData from './WeatherData';

function createWeather() {
    const { subscribe, set, update } = writable<WeatherData>(null);

    return {
        subscribe,
        updateWeather: (weatherData: WeatherData) => set(weatherData),
        convertUnits: () => update((weatherData) => weatherData.convertUnits()),
        reset: () => set(null),
    };
}

export const weather = createWeather();
