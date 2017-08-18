import sql from 'mssql';

class DB {
	constructor() {
		this.connectionString = `mssql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/zipcodes`;

		this.pool = undefined;
	}

	connect() {
		return sql.connect(this.connectionString)
			.then(pool => {
				this.pool = pool;

				return pool;
			})
			.catch(err => {
				console.error('DB', 'connect', err);

				throw err;
			});
	}
}

export default new DB();
