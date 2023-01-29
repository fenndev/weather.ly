import WeatherData from "./WeatherData";

export default class WeatherModel {
    private _currentWeather?: WeatherData;

    public parseWeatherData(
        city: string,
        state: string | null,
        country: string,
        temperature: number,
        weatherType: string,
        weatherID: number,
        windSpeed: number,
        humidity: number,
        units: string
        ) {
        this._currentWeather = new WeatherData(
            city.toLowerCase(),
            null,
            country.toLowerCase(),
            Number.parseFloat((temperature).toFixed(1)),
            weatherType.toLowerCase(),
            weatherID,
            Number.parseFloat((windSpeed).toFixed(1)),
            humidity,
            units
        );
        if(state) this._currentWeather.stateName = state;
    }

    // Convert units and return the current weather
    public convertUnits() {
        this._currentWeather?.convertUnits();
        return this.currentWeather;
    }

    // Return current weather information
    public get currentWeather(): WeatherData | undefined {
        return this._currentWeather;
    }
}