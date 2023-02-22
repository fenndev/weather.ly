import sanitizeQuery from './SanitizeQuery';
import WeatherData from '../classes/WeatherData';

export default async function fetchWeather(
    query: string,
    units = 'imperial'
): Promise<WeatherData> {
    try {
        const sanitizedQuery: string = sanitizeQuery(query);
        console.log(sanitizedQuery);
        if (!sanitizedQuery) throw new Error(`Query is undefined.`);
        const response = await fetch(
            `https://weatherlee.cyclic.app/?q=${query}&units=${units}`
        );
        const parsedResponse = await response.json();
        const {
            cityName,
            stateName,
            countryName,
            temperature,
            weatherType,
            weatherID,
            windSpeed,
            humidity,
            unitSystem,
        } = parsedResponse;
        return new WeatherData(
            cityName,
            stateName,
            countryName,
            temperature,
            weatherType,
            weatherID,
            windSpeed,
            humidity,
            unitSystem
        );
    } catch (error) {
        console.error(error.message);
    }
}
