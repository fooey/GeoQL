import {
	makeExecutableSchema,
} from 'graphql-tools';
import resolvers from 'src/resolvers';

import ZipCode from 'src/schema/zipcode';
// import mocks from './mocks';

const RootQuery = `
	type RootQuery {
		zipcode(zipCode: [String!]): [ZipCode]
	}
`;
const SchemaDefinition = `
	schema {
		query: RootQuery
	}
`;

const schema = makeExecutableSchema({
	typeDefs: [
		SchemaDefinition,
		RootQuery,
		ZipCode,
	],
	resolvers,
});

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
