const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

const client = new Client({
	user: 'postgres',
	password: 'toRyca123',
	host: 'lab.dudeful.com',
	port: '5432',
	database: 'eleitores',
});

router.get('/', validations.validateRead, (req, res) => {
	console.log(req);
	let query = 'SELECT nome FROM public.eleitores_nivel_escolar';
	client
		.connect()
		.then(() => console.log('conectado ao banco'))
		.then(() => client.query(query))
		.then((results) => console.table(results.rows))
		.catch((e) => console.log(e))
		.finally(() => client.end());
	res.send({ msg: 'hellofriend! you just READ a record.' });
});

module.exports = router;
