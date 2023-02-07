import { writable } from 'svelte/store';
import type { WeatherData } from '../WeatherModel';

export const weatherData = writable<WeatherData | null>(null);