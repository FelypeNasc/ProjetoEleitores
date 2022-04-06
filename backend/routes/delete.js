const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.get('/', validations.validateDelete, (req, res) => {
	res.send(deleteUser());
});

async function deleteUser() {
    const client = new Client({
        user: 'postgres',
        password: 'toRyca123',
        host: 'lab.dudeful.com',
        port: '5432',
        database: 'eleitores',
    });
    try {
		let query = 'SELECT nome FROM public.eleitores_nivel_escolar WHERE id=3';
		await client.connect();
		console.log('conectado ao banco');
		let result = await client.query(query);
		await client.end();
		return result.rows;
	} catch (e) {
		console.log('erro:', e);
	} finally {
		await client.end();
		console.log('Fim da conexão');
	}
}

module.exports = router;
