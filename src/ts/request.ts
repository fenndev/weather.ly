export default class Request {
    key: string;
    isMetric: boolean;
    cityName: string;

    constructor(key: string, isMetric: boolean, cityName: string) {
        this.key = key;
        this.isMetric = isMetric;
        this.cityName = cityName;
    }
}