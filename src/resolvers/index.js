
import ZipCode from './zipcode';
import City from './city';

const RootQuery = {
	zipcode: (root, args, context) => context.loaders.ZipCode.getZipCode.loadMany(args.zipCode),
	city: (root, args, context) => context.loaders.City.getBySlug.load(args),
	// author: (_, { id }) => find(authors, { id: id }),
};


const resolvers = {
	RootQuery,
	ZipCode,
	City,
};

export default resolvers;
