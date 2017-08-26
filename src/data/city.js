// import _ from 'lodash';
import DataLoader from 'dataloader';

import DB from './db';
// import {
// 	// quotedList,
// 	// mapToKeys,
// 	// mapToKeysMany,
// } from './util';



export default class City {
	getBySlug = new DataLoader(args => getBySlug(args), {
		cacheKeyFn: (args) => (`${args.stateAbbr}::${args.cityNameUrl}`).toLowerCase(),
	});
}

const reValidSlug = /^[a-z-]+$/gi;
const reValidStateAbbr = /^[a-z]{2}$/gi;

export async function getBySlug(args) {
	const keys = args.map(r =>(`${r.stateAbbr}::${r.cityNameUrl}`).toLowerCase());

	console.log('getBySlug', args);
	console.log('getBySlug', keys);

	args.forEach(arg => {
		console.log({arg});
		if (!reValidSlug.test(arg.cityNameUrl)) {
			throw `Invalid cityNameUrl: ${arg.cityNameUrl}`;
		}
		if (!reValidStateAbbr.test(arg.stateAbbr)) {
			throw `Invalid stateAbbr: ${arg.stateAbbr}`;
		}
	});

	const qryString = `
		SELECT TOP (1000)
			stateName
			, stateAbbr
			, cityName
			, cityNameUrl
			, stateNameUrl
			, latMin
			, latMax
			, latAvg
			, lonMin
			, lonMax
			, lonAvg
		FROM Cities WITH(READUNCOMMITTED)
		WHERE 1=1
			${args.map(p => `
				AND (
					cityNameUrl = '${p.cityNameUrl}'
					AND stateAbbr = '${p.stateAbbr}'
				)
			`)}
		ORDER BY stateAbbr, cityName;
	`;
	// ${!_.isEmpty(sanitizedCityTypes) ? `AND cityType IN (${quotedList(sanitizedCityTypes)})` : ``}

	console.log(qryString);

	const result = await DB.pool.request().query(qryString);

	result.recordset.forEach(r => {
		r.id = (`${r.stateAbbr}::${r.cityNameUrl}`).toLowerCase();
	});

	console.log('result.recordset', result.recordset);

	return result.recordset;
	// return result.recordset;
}
