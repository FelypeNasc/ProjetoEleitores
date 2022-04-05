const router = require('express').Router();
const validations = require('../middlewares/validations.js');

router.post('/', validations.validateCreate, (req, res) => {
	res.send({ msg: 'hellofriend! you just CREATED a record.' });
});

module.exports = router;
