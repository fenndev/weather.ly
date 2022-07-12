import { countryList } from "./countryList";

export default function getFullCountryName(abbreviation: string) {
    try {
        if(!countryList.hasOwnProperty(abbreviation))
            throw new Error(`Country with abbreviation ${abbreviation} not found`);
        return countryList[abbreviation];
    }

    catch(error) {
        console.log(error);
    }
}