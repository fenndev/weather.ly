import { writable } from 'svelte/store';
import type WeatherData from './WeatherData';

export const weatherData = writable<WeatherData>(null);
