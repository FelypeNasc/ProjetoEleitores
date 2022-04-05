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
	console.log('validateDelete');
	next();
};

module.exports = {
	validateCreate,
	validateRead,
	validateUpdate,
	validateDelete,
};
