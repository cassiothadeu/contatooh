var express = require('express'),
	load = require('express-load'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override')()
	;

module.exports = function(){
  var app = express();

  //configuração de ambiente
  app.set('port', 3001);
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  //middleware
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride);
  app.use(express.static('./public'));


  load('models', {cwd: 'app'})
  	.then('controllers')
  	.then('routes')
  	.into(app);

  return app;
};
