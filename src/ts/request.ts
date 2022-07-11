export default class Request {
    isMetric: boolean;
    cityName: string;

    constructor(isMetric: boolean, cityName: string) {
        this.isMetric = isMetric;
        this.cityName = cityName;
    }
}

export class StateRequest extends Request {
    stateName: string;

    constructor(isMetric: boolean, cityName: string, stateName: string) {
        super(isMetric, cityName);
        this.stateName = stateName;
    }
}

export class CountryRequest extends Request {
    countryName: string;

    constructor(isMetric: boolean, cityName: string, countryName: string) {
        super(isMetric, cityName);
        this.countryName = countryName;
    }
}

export class StateCountryRequest extends StateRequest {
    countryName: string;

    constructor(isMetric: boolean, cityName: string, stateName: string, countryName: string) {
        super(isMetric, cityName, stateName);
        this.countryName = countryName;
    }
}