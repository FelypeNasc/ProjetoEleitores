const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.delete('/', validations.validateDelete, async (req, res) => {
	//FIXME change from 'id' to 'cpf'
	async function deleteUser(cpf) {
		const client = new Client();
		try {
			let query =
				'UPDATE public.eleitores SET deletada = true, data_delecao = current_timestamp WHERE cpf=$1';
			await client.connect();
			console.log('conectado ao banco');
			await client.query(query, [cpf]);
			console.log('query');
			await client.end();
			return 'USUÁRIO DELETADO COM SUCESSO';
		} catch (e) {
			await client.query('ROLLBACK');
			console.log('erro:', e);
		} finally {
			await client.end();
			console.log('Fim da conexão');
		}
	}
	res.send(await deleteUser(req.body.cpf));
});

module.exports = router;
