import {
	makeExecutableSchema,
} from 'graphql-tools';
import resolvers from './resolvers';
// import mocks from './mocks';

const typeDefs = `
type ZipCode {
	zipCode: String
	cityName: String
	countyName: String
}

type Query {
	zipcode(zipCode: String!): [ZipCode]
}
`;
	// testString: String

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
