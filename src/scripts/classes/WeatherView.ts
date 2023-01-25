import Observer from "./Observer";
import WeatherData from "./WeatherData";

export default class WeatherView implements Observer {
    private weatherGUI: HTMLElement | null;

    constructor() {
        this.weatherGUI = document.querySelector("#gui");
    }

    
    update(weatherData: WeatherData | undefined) {
        if(weatherData)
            this.render(weatherData);
    }

    private render(weatherData: WeatherData): void {
        if(this.weatherGUI == null) {
            this.weatherGUI = document.createElement("main");
            document.body.appendChild(this.weatherGUI);
        }
        this.clearNode(this.weatherGUI);

        //Creating elements 
        const weatherInfo = document.createElement("ul");

        const city = document.createElement("li");
        const cityText = document.createTextNode(`City: ${weatherData.cityName}`);
        city.appendChild(cityText);
        weatherInfo.appendChild(city);

        if(weatherData.stateName != null) {
            const state = document.createElement("li");
            const stateText = document.createTextNode(`State: ${weatherData.stateName}`);
            state.appendChild(stateText);
            weatherInfo.appendChild(state);
        }

        const country = document.createElement("li");
        const countryText = document.createTextNode(`Country: ${weatherData.countryName}`);
        country.appendChild(countryText);
        weatherInfo.appendChild(country);

        const temperature = document.createElement("li");
        const temperatureText = document.createTextNode(`Temperature: ${weatherData.temperature}`);
        temperature.appendChild(temperatureText);
        weatherInfo.appendChild(temperature);

        const weatherType = document.createElement("li");
        const weatherTypeText = document.createTextNode(`Weather Type: ${weatherData.weatherType}`);
        weatherType.appendChild(weatherTypeText);
        weatherInfo.appendChild(weatherType);

        const windSpeed = document.createElement("li");
        const windSpeedText = document.createTextNode(`Wind Speed: ${weatherData.windSpeed}`);
        windSpeed.appendChild(windSpeedText);
        weatherInfo.appendChild(windSpeed);

        const humidity = document.createElement("li");
        const humidityText = document.createTextNode(`Humidity: ${weatherData.humidity}`);
        humidity.appendChild(humidityText);
        weatherInfo.appendChild(humidity);

        const units = document.createElement("li");
        const unitsText = document.createTextNode(`Units: ${weatherData.units}`);
        units.appendChild(unitsText);
        weatherInfo.appendChild(units);

        this.weatherGUI.appendChild(weatherInfo);
    }

    private clearNode(node: HTMLElement) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}