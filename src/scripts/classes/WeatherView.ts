import Observer from "./utility/Observer";
import WeatherData from "./WeatherData";

export default class WeatherView implements Observer {
    private weatherGUI!: HTMLElement;
    private searchForm!: HTMLFormElement;
    private searchField!: HTMLInputElement;

    // Main Functions

    constructor() {
        this.createForm();
    }

    update(weatherData: WeatherData) {
        if(weatherData) this.render(weatherData);
        else this.render();
    }
    
    private render(weatherData?: WeatherData): void {
        if(this.weatherGUI) this.clearNode(this.weatherGUI);
        this.createForm();
        if(weatherData)
            this.createWeatherInfo(weatherData);
    }

    // Utility Functions

    private clearNode(node: HTMLElement) { while(node.firstChild) node.removeChild(node.firstChild); }

    private createForm(): void {
        this.weatherGUI = document.createElement("main");
        this.weatherGUI.setAttribute('id', 'gui');
        this.searchForm = document.createElement("form");
        this.searchField = document.createElement("input");
        const submitButton = document.createElement("input");
        this.searchField.setAttribute('type', 'text');
        this.searchField.setAttribute('placeholder', 'Enter a location...');
        this.searchField.setAttribute('name', 'searchForm');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit');
        document.body.appendChild(this.weatherGUI);
        this.weatherGUI.appendChild(this.searchForm);
        this.searchForm.appendChild(this.searchField);
        this.searchForm.appendChild(submitButton);
        this.weatherGUI.appendChild(this.searchForm);
    }

    private createWeatherInfo(weatherData: WeatherData): void {
        const weatherInfo = document.createElement("div");
        let temperatureUnits: string;
        let windSpeedUnits: string;
        if(weatherData.units == 'metric') {
            temperatureUnits = '°C';
            windSpeedUnits = 'kph'
        }
        else {
            temperatureUnits = '°F';
            windSpeedUnits = 'mph';
        }
        const city = document.createElement("p");
        const cityText = document.createTextNode(`City: ${weatherData.cityName}`);
        city.appendChild(cityText);
        weatherInfo.appendChild(city);

        if(weatherData.stateName != null) {
            const state = document.createElement("p");
            const stateText = document.createTextNode(`State: ${weatherData.stateName}`);
            state.appendChild(stateText);
            weatherInfo.appendChild(state);
        }

        const country = document.createElement("p");
        const countryText = document.createTextNode(`Country: ${weatherData.countryName}`);
        country.appendChild(countryText);
        weatherInfo.appendChild(country);

        const temperature = document.createElement("p");
        const temperatureText = document.createTextNode(`Temperature: ${weatherData.temperature}${temperatureUnits}`);
        temperature.appendChild(temperatureText);
        weatherInfo.appendChild(temperature);

        const weatherType = document.createElement("p");
        const weatherTypeText = document.createTextNode(`Weather Type: ${weatherData.weatherType}`);
        weatherType.appendChild(weatherTypeText);
        weatherInfo.appendChild(weatherType);

        const windSpeed = document.createElement("p");
        const windSpeedText = document.createTextNode(`Wind Speed: ${weatherData.windSpeed} ${windSpeedUnits}`);
        windSpeed.appendChild(windSpeedText);
        weatherInfo.appendChild(windSpeed);

        const humidity = document.createElement("p");
        const humidityText = document.createTextNode(`Humidity: ${weatherData.humidity}`);
        humidity.appendChild(humidityText);
        weatherInfo.appendChild(humidity);

        const units = document.createElement("p");
        const unitsText = document.createTextNode(`Units: ${weatherData.units}`);
        units.appendChild(unitsText);
        weatherInfo.appendChild(units);

        this.weatherGUI.appendChild(weatherInfo);
    }
    
    // Getters & Setters

    public get inputText(): string { return this.searchField?.value; }

    public get searchFormElement() { return this.searchForm; }

    public get inputElement() { return this.searchField; }
}