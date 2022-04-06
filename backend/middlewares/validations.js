const validateCreate = (req, res, next) => {
	console.log('validateCreate');
	next();
};

const validateRead = (req, res, next) => {
	console.log('validateRead');
	next();
};

const validateUpdate = (req, res, next) => {
	console.log('validateUpdate');
	next();
};

const validateDelete = (req, res, next) => {
	let query = req.query;
	if (query) {
		console.log('validateDelete');
		if (
			query.hasOwnProperty('userId') &&
			typeof Number(query.userId) == 'number'
		)
			next();
		else res.status(400).send('Invalid user id');
	} else {
		res.status(400).send('Set a valid id');
	}
};

module.exports = {
	validateCreate,
	validateRead,
	validateUpdate,
	validateDelete,
};
