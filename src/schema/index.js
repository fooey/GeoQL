import {
	makeExecutableSchema,
} from 'graphql-tools';
import resolvers from 'src/resolvers';
// import mocks from './mocks';

const typeDefs = `
type ZipCode {
	id: ID
	zipCode: String
	cityName: String
	countyName: String
	cityTypeCode: String
	countyName: String
	countyFIPS: String
	stateName: String
	stateAbbr: String
	stateFIPS: String
	msaCode: String
	areaCode: String
	timeZone: String
	utc: Float
	dst: String
	latitude: Float
	longitude: Float
	alternativeCityNames: [String]
	unacceptableCityNames: [String]
}

type Query {
	zipcode(zipCode: [String!]): [ZipCode]
}
`;
	// testString: String

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
