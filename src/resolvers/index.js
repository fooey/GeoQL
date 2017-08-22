
import ZipCode from 'src/resolvers/zipcode';

const RootQuery = {
	zipcode: (root, args, context) => context.loaders.ZipCode.getZipCode.loadMany(args.zipCode),
	// author: (_, { id }) => find(authors, { id: id }),
};


const resolvers = {
	RootQuery,
	ZipCode,
};

export default resolvers;
