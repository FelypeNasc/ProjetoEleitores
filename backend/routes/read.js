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
	//let connect = true;
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
	if (isNaN(id) || id < 1) {
		id = 1;
	}
	if (isNaN(id2) || id2 < id) {
		if (table === 'renda_id') {
			id2 = 8;
		} else {
			id2 = 11;
		}
	}

	query = `SELECT eleitor_nome,eleitor_nome_social,data_nascimento,faixa_renda,nivel_escolar FROM public.informacoes_eleitores WHERE ${table} BETWEEN ${id} AND ${id2} AND deletada NOT IN(true)`;
	/* else {
		arrayQuery = [table, id];
		query =
			'SELECT eleitor_nome,eleitor_nome_social,data_nascimento,faixa_renda,nivel_escolar FROM public.informacoes_eleitores WHERE $1 = $2 AND deletada NOT IN(true)';
	} */
	console.log(query);
	await client
		.connect()
		.then(() => console.log('conectado ao banco'))
		.then(() => client.query(query))
		.then((results) => {
			res.send(results.rows);
		})
		.catch((e) => console.log(e))
		.finally(() => client.end(), console.log('cliente fechado'));
});

module.exports = router;
