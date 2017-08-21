import DataLoader from 'dataloader';

import {
	getZipCode,
	getZipCodeAlternativeCityNames,
	getZipCodeUnacceptableCityNames,
	// getZipCodeCityByType,
} from 'src/data/zipcode';


// function createLoaders() {
// 	return {
// 		getZipCode: new DataLoader(zipcodes => getZipCode(zipcodes)),
// 		getZipCodeAlternativeCityNames: new DataLoader(zipcode => getZipCodeAlternativeCityNames(zipcode)),
// 		getZipCodeUnacceptableCityNames: new DataLoader(zipcode => getZipCodeUnacceptableCityNames(zipcode)),
// 		getZipCodeCityByType: new DataLoader((zipcode, cityType) => getZipCodeCityByType(zipcode, cityType)),
// 	};
// }

class Loaders {
	getZipCode = new DataLoader(zipcodes => getZipCode(zipcodes));

	getZipCodeAlternativeCityNames = new DataLoader(zipcode => getZipCodeAlternativeCityNames(zipcode));

	getZipCodeUnacceptableCityNames = new DataLoader(zipcode => getZipCodeUnacceptableCityNames(zipcode));

	// getZipCodeCityByType = new DataLoader((zipcode, cityType) => getZipCodeCityByType(zipcode, cityType))
}

export default Loaders;
