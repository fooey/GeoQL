import DB from './db';
import sql from 'mssql';

const resolvers = {
	Query: {
		zipcode: (root, args) => getZipCode(args.zipCode),
		// author: (_, { id }) => find(authors, { id: id }),
	},
	// ZipCode: (root, args, context) => {
	// 	console.log({args});
	//
	// 	return getZipCode(context.db, args.zipCode);
	// },
};

async function getZipCode( zipCode) {
	const result = await DB.pool.request()
		.input('zipCode', sql.VarChar, zipCode)
		.query(`
			SELECT DISTINCT
				zipCode,
				cityName,
				cityType,
				countyName,
				countyFIPS,
				stateName,
				stateAbbr,
				stateFIPS,
				msaCode,
				areaCode,
				timeZone,
				utc,
				dst,
				latitude,
				longitude
			FROM zipcodes WITH(READUNCOMMITTED)
			WHERE zipcode LIKE @zipCode
				AND cityType = 'd'
			ORDER BY zipcode
		`);

	return result.recordset;
}

export default resolvers;
