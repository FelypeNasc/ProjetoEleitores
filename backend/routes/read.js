const router = require('express').Router();
const validations = require('../middlewares/validations.js');

router.get('/', validations.validateRead, (req, res) => {
	res.send({ msg: 'hellofriend! you just READ a record.' });
});

module.exports = router;
