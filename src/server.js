import 'app-module-path/cwd';

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';

import DB from 'src/data/db';
import schema from 'src/schema';
import Loaders from 'src/data/loaders';

const GRAPHQL_PORT = process.env.PORT || 3000;
const app = express();

DB.connect().then(() => {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use('/graphql', graphqlExpress(req => {
		const loaders = new Loaders();

		return {
			schema,
			context: { req, loaders },
		};
	}));

	app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

	app.listen(GRAPHQL_PORT, () => console.log(
		`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
	));
});
