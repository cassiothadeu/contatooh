var http = require('http'),
	config = require('./config/config')(),
    app = require("./config/express")();
    require('./config/passport')(),
    require('./config/database.js')(config.db);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server executando na porta "+app.get('port'));
});
