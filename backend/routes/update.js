const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.put('/', validations.validateUpdate, async (req, res) => {
	const client = new Client();

	try {
		//apiURL: edtech.dudeful.com:8000/update/?field=nome_social&fieldValue=hellofriend&userId=2
		const { field, fieldValue, userId } = req.query;

		const updateData = [fieldValue, userId];

		console.log(updateData);

		let query = `UPDATE public.eleitores SET ${field}=$1 WHERE id=$2 RETURNING *`;

		await client.connect();
		console.log('Connected to database!');

		const result = await client.query(query, updateData);

		console.log(result.rows);

		res.send({ result: result.rows });
	} catch (error) {
		await client.query('ROLLBACK');
		console.error(error);
	} finally {
		await client.end();
		console.log('Connection closed!');
	}
});

module.exports = router;
