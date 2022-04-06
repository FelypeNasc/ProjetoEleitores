const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.get('/:tipo/:id/:id2', validations.validateRead, (req, res) => {
	console.log(req.params.tipo);
	console.log(req.params.id);
	console.log(req.params.id2);
	const client = new Client({
		user: 'postgres',
		password: 'lopiin20',
		host: 'localhost',
		port: 5432,
		database: 'lovelace'
	})

	let tipo = parseInt(req.params.tipo);
	console.log(tipo);
	let id = parseInt(req.params.id);
	let id2 = parseInt(req.params.id2);
	let table;
	let query;
	let feedback;
	switch(tipo){
		case 1:
			table = "renda_id";
			break;
		case 2:
			table = "nivel_escolar_id";
			break;
		default:
			table = "nda";
			break;
	}

	if(id < 1){
		res.send('pesquisa invalida, o valor é menor que 1!');
	}
	else if(id2 < id){
		res.send('pesquisa invalida, o segundo valor é menor que o primeiro!');
	}

	if(table === "nda"){
		res.send("pesquisa não encontrada");
	}
	console.log(table);

	if(id2 && id < id2){
		query = `SELECT id, nome FROM public.eleitores WHERE ${table} BETWEEN ${id} AND ${id2}`;
		console.log(query);
	}
	else{
		query = `SELECT id, nome FROM public.eleitores WHERE ${table} = ${id}`;
		console.log(query);
	}
	client.connect()
		.then(() => console.log("conectado ao banco"))
		.then(() => client.query(query))
		.then(results => feedback = results.rows)
		.then(() => console.log("é nois" + feedback), res.send(feedback))
		.catch(e => console.log(e))
		.finally(() => client.end(), console.log("cliente fechado"))
});

module.exports = router;
