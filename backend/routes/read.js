const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.get('/pesquisa', validations.validateRead, (req, res) => {		
	const client = new Client({
		user: 'postgres',
		password: 'toRyca123',
		host: 'lab.dudeful.com',
		port: '5432',
		database: 'eleitores',
	})

	let table;
	let query;
	let tipo = req.query.tipo;
	let id = parseInt(req.query.id);
	let id2 = parseInt(req.query.id2);
	let connect = true;
	
	switch(tipo){
		case "1":
			table = "renda_id";
			break;
		case "2":
			table = "nivel_escolar_id";
			break;
		default:
			connect = false;
			res.send("pesquisa não encontrada, cancelando pesquisa");
			return false;
			break;
	}
	if(isNaN(id)){
		id = 1;
	}
	if(isNaN(id2)){
		id2 = 20;
	}

	if(id < 1){
		connect = false;
		res.send('pesquisa invalida, o valor é menor que 1!');
	}
	else if(id2 < id){
		connect = false;
		res.send('pesquisa invalida, o segundo valor é menor que o primeiro!');
	}

	if(id2 && id < id2){
		query = `SELECT * FROM public.eleitores WHERE ${table} BETWEEN ${id} AND ${id2}`;
	}
	else{
		query = `SELECT id, nome FROM public.eleitores WHERE ${table} = ${id}`;
	}

	if(connect){
		client.connect()
		.then(() => console.log("conectado ao banco"))
		.then(() => client.query(query))
		.then(results => results.rows)
		.then(feedback => res.send(feedback))
		.catch(e => console.log(e))
		.finally(() => client.end(), console.log("cliente fechado"))
	}
});

module.exports = router;
