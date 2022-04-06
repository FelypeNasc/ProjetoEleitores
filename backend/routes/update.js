const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.put('/', validations.validateUpdate, (req, res) => {
	const Client = new Client({
		user: 'postgres',
		password: 'lopiin20',
		host: 'localhost',
		port: 5432,
		database: 'lovelace'
	})
	res.send({ msg: 'hellofriend! you just UPDATED a record.' });
});

module.exports = router;
