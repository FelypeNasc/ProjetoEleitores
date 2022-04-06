const router = require('express').Router();
const validations = require('../middlewares/validations.js');
const { Client } = require('pg');

router.put('/', validations.validateUpdate, (req, res) => {
	res.send({ msg: 'hellofriend! you just UPDATED a record.' });
});

module.exports = router;
