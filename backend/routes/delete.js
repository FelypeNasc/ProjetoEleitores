const router = require('express').Router();
const validations = require('../middlewares/validations.js');

router.delete('/', validations.validateDelete, (req, res) => {
	res.send({ msg: 'hellofriend! you just DELETED a record.' });
});

module.exports = router;
