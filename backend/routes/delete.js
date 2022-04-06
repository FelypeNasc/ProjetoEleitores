const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const client = require('../config/postgres.js');

router.delete('/', validations.validateDelete, async (req, res) => {
	res.send(await deleteUser(req.body.userId));
});

let query = 'UPDATE public.eleitores SET deletada = true WHERE id=$1';

async function deleteUser(value) {
	try {
		await client.connect();
		console.log('conectado ao banco');
		await client.query(query, [value]);
		await client.end();
		return true;
	} catch (e) {
		await client.query('ROLLBACK');
		console.log('erro:', e);
	} finally {
		await client.end();
		console.log('Fim da conexão');
	}
}

module.exports = router;
