const validateCreate = (req, res, next) => {
	console.log('validateCreate');
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	const nameRegex = /^[a-zA-Z\s]+$/;
	const cpfRegex = /^\d{1,11}$/;
	const rendaRegex = /^([1-8])$/;
	const escolarRegex = /^([1-9]|1[01])$/;
	const {
		nome,
		nome_social,
		cpf,
		data_nascimento,
		renda_id,
		nivel_escolar_id,
	} = req.body;
	if (!nome || !nameRegex.test(nome)) {
		res.status(400).send('Invalid "nome"');
	} else if (nome_social && !nameRegex.test(nome_social)) {
		res.status(400).send('Invalid "nome_social"');
	} else if (typeof cpf !== 'string' || !cpfRegex.test(cpf)) {
		res.status(400).send('Invalid "cpf"');
	} else if (
		typeof data_nascimento !== 'string' ||
		!dateRegex.test(data_nascimento)
	) {
		res.status(400).send('Invalid "data_nascimento"');
	} else if (typeof renda_id !== 'number' || !rendaRegex.test(renda_id)) {
		res.status(400).send('Invalid "renda_id"');
	} else if (
		typeof nivel_escolar_id !== 'number' ||
		!escolarRegex.test(nivel_escolar_id)
	) {
		res.status(400).send('Invalid "nivel_escolar_id"');
	} else {
		if (!nome_social) req.felype = null;
		console.log('All validations passed');
		next();
	}
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
	console.log(query);
	if (query) {
		console.log('validateDelete');
		if (
			query.hasOwnProperty('userId') &&
			typeof Number(query.userId) == 'number'
		) {
			console.log('Tem userId');
			next();
		} else res.status(400).send('Invalid user id');
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
