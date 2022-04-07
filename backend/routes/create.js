const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.post('/', validations.validateCreate, (req, res) => {
	const client = new Client();
	const query = `INSERT INTO eleitores (nome, nome_social, cpf, data_nascimento, renda_id, 
		nivel_escolar_id, deletada, data_criacao) VALUES ($1, $2, $3, $4, $5, $6, false, current_timestamp)`;
	const values = [
		req.body.nome,
		req.body.nome_social,
		req.body.cpf,
		req.body.data_nascimento,
		req.body.renda_id,
		req.body.nivel_escolar_id,
	];
	const selectQuery = 'SELECT * FROM eleitores';
	client
		.connect()
		.then(() => console.log('Connected to database!'))
		.then(() => client.query('BEGIN TRANSACTION'))
		.then(() => client.query(query, values))
		// .then(() => client.query(selectQuery))
		// .then((results) => results.rows)
		// .then((feedback) => res.send(feedback))
		.then(() => client.query('COMMIT'))
		.then(() => res.send('Created!'))
		.catch((e) => console.log(e), client.query('ROLLBACK'))
		.finally(() => client.end(), console.log('Connection closed!'));
});

module.exports = router;
