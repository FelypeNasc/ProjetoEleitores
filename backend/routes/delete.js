const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.delete('/', validations.validateDelete, async (req, res) => {
	//FIXME change from 'id' to 'cpf'
	async function deleteUser(id) {
		const client = new Client();
		try {
			let query =
				'UPDATE public.eleitores SET deletada = true, data_delecao = current_timestamp WHERE id=$1';
			await client.connect();
			console.log('conectado ao banco');
			await client.query(query, [id]);
			console.log('query');
			await client.end();
			return 'end-conection';
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
