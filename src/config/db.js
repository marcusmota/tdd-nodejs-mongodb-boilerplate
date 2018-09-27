
const mongoose = require('mongoose');
const parametros = require('./db.json');

var connectString = "";
var debug = false;


if(process.env.NODE_ENV == "production"){
  connectString = parametros.production.database;
}else if(process.env.NODE_ENV == "development"){
  debug = true;
  connectString = parametros.development.database; 
}else if(process.env.NODE_ENV == "test"){
  connectString = parametros.test.database; 
  debug = true;
}
 
mongoose.Promise = global.Promise;

mongoose.connect(connectString);

mongoose.set('debug', debug);

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});