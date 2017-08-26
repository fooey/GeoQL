import {
	makeExecutableSchema,
} from 'graphql-tools';
import resolvers from '../resolvers';

import ZipCode from './zipcode';
import City from './city';

const RootQuery = `
	type RootQuery {
		zipcode(zipCode: [String!]): [ZipCode]
		city(cityNameUrl: String!, stateAbbr: String!): [City]
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
		City,
	],
	resolvers,
});

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
