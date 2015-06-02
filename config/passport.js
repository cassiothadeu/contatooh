var passport = require('passport'),
	GitHubStrategy = require('passport-github').Strategy,
	mongoose = require('mongoose');

module.exports = function(){
	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID: '6766ce8a76f693f77df8',
		clientSecret: '3f4519ccaa0bdaee7c6fa6351619a309a5470541',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done) {
		Usuario.findOrCreate(
			{ "login" : profile.username}, 
			{ "nome" : profile.username},  
			function(erro, usuario) {
				if(erro) {
					return done(erro);
				} 
				return done(null, usuario);
			}
		);
	}));

	passport.serializeUser(function(usuario, done) {
	  done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done) {
	  Usuario.findById(id).exec()
	  .then(function(usuario) {
	  	done(null, usuario);	
	  });
	});
};