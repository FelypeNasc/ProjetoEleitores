const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.get('/pesquisa', validations.validateRead, async (req, res) => {
	const client = new Client();

	let table;
	let query;
	let tipo = req.query.tipo;
	let id = parseInt(req.query.id);
	let id2 = parseInt(req.query.id2);
	let connect = true;
	let arrayQuery;

	switch (tipo) {
		case '1':
			table = 'renda_id';
			break;
		case '2':
			table = 'nivel_id';
			break;
		default:
			connect = false;
			res.send('pesquisa não encontrada, cancelando pesquisa');
			return false;
			break;
	}
	if (isNaN(id)) {
		id = 1;
	}
	if (isNaN(id2)) {
		id2 = 20;
	}

	if (id < 1) {
		connect = false;
		res.send('pesquisa invalida, o valor é menor que 1!');
	} else if (id2 < id) {
		connect = false;
		res.send('pesquisa invalida, o segundo valor é menor que o primeiro!');
	}

	if (id2 && id < id2) {
		arrayQuery = [table, id, id2];
		query =
			'SELECT eleitor_nome,eleitor_nome_social,data_nascimento,faixa_renda,nivel_escolar FROM public.informacoes_eleitores WHERE $1 BETWEEN $2 AND $3 AND deletada NOT IN(true)';
	} else {
		arrayQuery = [table, id];
		query =
			'SELECT eleitor_nome,eleitor_nome_social,data_nascimento,faixa_renda,nivel_escolar FROM public.informacoes_eleitores WHERE $1 = $2 AND deletada NOT IN(true)';
	}

	if (connect) {
		await client
			.connect()
			.then(() => {
				console.log('conectado ao banco');
				return client.query(query, arrayQuery);
			})
			.then((results) => {
				res.send(results.rows);
			})
			.catch((e) => console.log(e))
			.finally(() => client.end(), console.log('cliente fechado'));
	}
});

module.exports = router;
