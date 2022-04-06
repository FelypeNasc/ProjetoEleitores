const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.delete('/', validations.validateDelete, async (req, res) => {
	async function deleteUser(id) {
		const client = new Client(conf);
		try {
			let query = 'UPDATE public.eleitores SET deletada = true WHERE id=$1';
			await client.connect();
			console.log('conectado ao banco');
			await client.query(query, [id]);
			await client.end();
			return result.rows;
		} catch (e) {
			await client.query('ROLLBACK');
			console.log('erro:', e);
		} finally {
			await client.end();
			console.log('Fim da conexão');
		}
	}
	res.send(await deleteUser(req.query.userId));
});

module.exports = router;
