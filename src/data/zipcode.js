import _ from 'lodash';
import DataLoader from 'dataloader';

import DB from 'src/data/db';
import {
	quotedList,
	mapToKeys,
	mapToKeysMany,
} from 'src/data/util';



export default class ZipCode {
	getZipCode = new DataLoader(zipcodes => getZipCode(zipcodes));
	getAlternativeCityNames = new DataLoader(zipcode => getZipCodeAlternativeCityNames(zipcode));
	getUnacceptableCityNames = new DataLoader(zipcode => getZipCodeUnacceptableCityNames(zipcode));
}


export async function getZipCode(zipCodes) {
	console.log('getZipCode', zipCodes);

	const sanitizedZipCodes = zipCodes.map(z => z.replace(/^\D/gi, ''));

	const qryString = `
		SELECT
			zipCode AS id
			, zipCode
			, cityName
			, cityType AS cityTypeCode
			, countyName
			, countyFIPS
			, stateName
			, stateAbbr
			, stateFIPS
			, msaCode
			, areaCode
			, timeZone
			, utc
			, dst
			, latitude
			, longitude
		FROM ZipCodes WITH(READUNCOMMITTED)
		WHERE cityType = 'D'
			AND zipcode IN (${quotedList(sanitizedZipCodes)})
		ORDER BY zipcode, cityName;
	`;
	// ${!_.isEmpty(sanitizedCityTypes) ? `AND cityType IN (${quotedList(sanitizedCityTypes)})` : ``}

	// console.log(qryString);

	const result = await DB.pool.request().query(qryString);

	// console.log('result.recordset', result.recordset);

	return mapToKeys(zipCodes, result.recordset);
}


export async function getZipCodeAlternativeCityNames(zipCodes) {
	console.log('getZipCodeAlternativeCityNames', zipCodes);

	return getZipCodeCityByType(zipCodes, 'A');
}

export async function getZipCodeUnacceptableCityNames(zipCodes) {
	console.log('getZipCodeUnacceptableCityNames', zipCodes);

	return getZipCodeCityByType(zipCodes, 'N');
}

export async function getZipCodeCityByType(zipCodes, cityType) {
	const qryString = `
		SELECT
			zipCode AS id
			, zipCode
			, cityName
		FROM ZipCodes WITH(READUNCOMMITTED)
		WHERE zipCode IN (${quotedList(zipCodes)})
			AND cityType = '${cityType}'
		ORDER BY cityName;
	`;

	// console.log(qryString);

	const result = await DB.pool.request().query(qryString);

	if (!Array.isArray(result.recordset)) {
		return result.recordset;
	}

	return mapToKeysMany(zipCodes, result.recordset)
		.map(z =>  _.map(z, 'cityName'));
}
