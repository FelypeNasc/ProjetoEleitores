const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.put('/', validations.validateUpdate, async (req, res) => {
	try {
		const client = new Client();
		const { userId } = req.query;

		let query = `UPDATE public.eleitores SET nome_social = test WHERE id=$${userId}`;

		await client.connect();
		console.log('Connected to the database!');

		await client.query(query, [id]);

		res.send(await result.rows);
	} catch (error) {
		await client.query('ROLLBACK');
		console.error(error);
	} finally {
		await client.end();
		console.log('Connection closed!');
	}
});

module.exports = router;
