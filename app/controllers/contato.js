module.exports = function (app) {

	var Contato = app.models.contato;

	var controller = {}

	controller.listaContatos = function(req, res) {

		Contato.find().populate('emergencia').exec()
			.then(
				function(contatos) {
					res.json(contatos);
				})
				.then(null, function(erro) {
					console.error(erro)
					res.status(500).json({error: erro.message});
				}
			);
	};

	controller.obtemContato = function(req, res) {

		var _id = req.params.id;
		Contato.findById(_id).exec()
			.then(
				function(contato) {
					if (!contato) throw new Error("Contato não encontrado");
					res.json(contato)
				})
				.then(null, function(erro) {
					console.log(erro);
					res.status(404).json({error: erro.message});
				});
	};

	controller.removeContato = function(req, res) {

		var _id = req.params.id;
		Contato.remove({"_id" : _id}).exec()
			.then(
				function() {
					res.status(204).end();
				})
				.then(null, function(erro) {
					return console.error(erro);
				}
			);
	};

	controller.salvaContato = function(req, res) {

		var _id = req.body._id;
		req.body.emergencia = req.body.emergencia || null;

		if(_id) {
			Contato.findByIdAndUpdate(_id, req.body).exec()
				.then(
					function(contato) {
						res.json(contato);
					})
					.then(null, function(erro) {
						console.error(erro)
						res.status(500).json({error: erro.message});
					}
				);
		} else {
			Contato.create(req.body)
				.then(
					function(contato) {
						res.status(201).json(contato);
					})
					.then(null, function(erro) {
						console.log(erro);
						res.status(500).json({error: erro.message});
					}
				);
		}
	};

	return controller;
};
