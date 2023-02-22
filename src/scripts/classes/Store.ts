import { writable } from 'svelte/store';
import type WeatherData from './WeatherData';

function createWeather() {
    const { subscribe, set, update } = writable<WeatherData>(null);

    return {
        subscribe,
        updateWeather: (weatherData: WeatherData) => set(weatherData),
        convertUnits: (selectedUnits: string) =>
            update((weatherData) => weatherData.convertUnits(selectedUnits)),
        reset: () => set(null),
    };
}

const loading = writable<boolean>(false);

export const weather = createWeather();
export const isLoading = loading;
