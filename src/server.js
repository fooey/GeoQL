import 'app-module-path/cwd';

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';

import DB from 'src/data/db';
import schema from 'src/schema';
import Loaders from 'src/data/loaders';

const GRAPHQL_PORT = process.env.PORT || 3000;


const graphQLServer = express();

DB.connect().then(() => {
	graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
		schema,
		context: { loaders: new Loaders() },
	}));
	graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

	graphQLServer.listen(GRAPHQL_PORT, () => console.log(
		`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
	));
});
