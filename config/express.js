var express = require('express'),
	load = require('express-load'),
  	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport'),
  	methodOverride = require('method-override')(),
  	helmet = require('helmet')
	;

module.exports = function(){
  var app = express();

  //configuração de ambiente
  app.set('port', 3000);
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  //middleware
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride);
  app.use(express.static('./public'));
  app.use(cookieParser());
  app.use(session(
  	{ 	secret: 'homem avestruz',
  		resave: true,
  		saveUnitialized: true
  	}
  ));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.disable('x-powered-by');

  load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

  app.get('*', function(req, res) {
     res.status(404).render('404');
  });

  return app;
};
