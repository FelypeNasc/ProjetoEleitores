require('dotenv').config({ path: __dirname + '/.env' });

const conf = {
	user: 'postgres',
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	database: 'eleitores',
};

module.exports = conf;
