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

function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

// Create a store for the current date
const currentDate = writable(
    (() => {
        const date = new Date();
        const day = date.getDate();
        const suffix = getDaySuffix(day);

        return (
            date.toLocaleDateString([], {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            }) + suffix
        );
    })()
);

// Create a store for the current time
const currentTime = writable(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
);

// Update the current date and time every minute
setInterval(() => {
    currentDate.set(
        (() => {
            const date = new Date();
            const day = date.getDate();
            const suffix = getDaySuffix(day);

            return (
                date.toLocaleDateString([], {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                }) + suffix
            );
        })()
    );
    currentTime.set(
        new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    );
}, 60000);

export const date = currentDate;
export const time = currentTime;
