const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.post('/', validations.validateCreate, (req, res) => {
	const client = new Client();

	// console.log({
	// 	nome: req.body.nome,
	// 	nome_social: req.body.nome_social,
	// 	cpf: req.body.cpf,
	// 	data_nascimento: req.body.data_nascimento,
	// 	renda_id: req.body.renda_id,
	// 	nivel_escolar_id: req.body.nivel_escolar_id,
	// });

	client
		.connect()
		.then(() => {
			// const query = `BEGIN TRANSACTION INSERT INTO eleitores (nome, nome_social, cpf, data_nascimento, renda_id, nivel_escolar_id, deletada, data_criacao) VALUES (
			// 	${req.body.nome},
			// 	${req.body.nome_social},
			// 	${req.body.cpf},
			// 	${req.body.data_nascimento},
			// 	${req.body.renda_id},
			// 	${req.body.nivel_escolar_id},
			// 	"false",
			// 	"current_timestamp"")`;
			const query = 'SELECT * FROM eleitores';
			client.query(query);
		})
		.then(() => {
			client.query('COMMIT');
		})
		.catch((err) => {
			console.error('shit');
			client.query('ROLLBACK');
		})
		.finally(() => {
			client.end();
			res.send({ msg: 'hellofriend! you just CREATED a record.' });
		});
});

module.exports = router;
