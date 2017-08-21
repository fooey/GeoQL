
// import {
// 	// getZipCode,
// 	getZipCodeCityByType,
// } from 'src/data/zipcode';


const resolvers = {
	Query: {
		zipcode: (root, args, context) => context.loaders.getZipCode.loadMany(args.zipCode),
		// author: (_, { id }) => find(authors, { id: id }),
	},

	ZipCode: {
		alternativeCityNames: (zipCode, _, context) => context.loaders.getZipCodeAlternativeCityNames.load(zipCode.zipCode),
		unacceptableCityNames: (zipCode, _, context) => context.loaders.getZipCodeUnacceptableCityNames.load(zipCode.zipCode),
	},
};


export default resolvers;
