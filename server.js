var http = require('http'),
    app = require("./config/express")();
    require('./config/passport')(),
    require('./config/database.js')('mongodb://localhost:27017/contatooh');

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server executando na porta "+app.get('port'));
});
