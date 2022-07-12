export default class WeatherData {
    cityName: string;
    stateName: string;
    countryName: string;
    temperature: number;
    weatherDescription: string;
    windSpeed: number;
    humidity: number;
    units: string;
    constructor(
        cityName: string,
        stateName: string,
        countryName: string,
        temperature: number,
        weatherDescription: string,
        windSpeed: number,
        humidity: number,
        units: string,
    ) {
    this.cityName = cityName;
    if(stateName != cityName)
        this.stateName = stateName;
    this.countryName = countryName;
    this.temperature = temperature;
    this.weatherDescription = weatherDescription;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.units = units;
    }
    public convertUnits() {
        if (this.units === 'imperial') {
            this.temperature = Number.parseFloat(((this.temperature - 32) * (5 / 9)).toFixed(1));
            this.windSpeed = Number.parseFloat((this.windSpeed * 1.609).toFixed(1));
            this.units = 'metric';
        }
        else {
            this.temperature = Number.parseFloat((this.temperature * (9 / 5) + 32).toFixed(1));
            this.windSpeed = Number.parseFloat((this.windSpeed / 1.609).toFixed(1));
            this.units = 'imperial';
        }
    }
};