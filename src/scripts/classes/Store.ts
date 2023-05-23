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

// Create a store for the current date
const currentDate = writable(new Date().toLocaleDateString());

// Create a store for the current time
const currentTime = writable(new Date().toLocaleTimeString());

// Update the current date and time every minute
setInterval(() => {
    currentDate.set(new Date().toLocaleDateString());
    currentTime.set(new Date().toLocaleTimeString());
}, 60000);

export const date = currentDate;
export const time = currentTime;
