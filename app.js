
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

  , RESTapi = require('./asgard_api')
  , tools = require('./tools')

  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(err, req, res, next){
    console.error(err.stack);
    console.error('request method: ' + req.method);
    res.send(500, 'Something broke!');
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



var objTypes = [ 'character'
                ,'combatskill'
                ,'creature'
                ,'skill'
                ,'spell' ];

// JSON-DBs: dictionary with {name: path, ...} descriptions
//           for JSON-files of Asgard objects
var jsonDBs = tools.hashify(
                 objTypes
                ,objTypes.map(
                  function(x){return "./data/"+x+"s.json";}
                 ) );
 
app.get('/', routes.index);

// define behavior for GET, PUT, POST & DELETE
objTypes.map(function(objType){
  // GET name list
  app.get('/'+objType+'s', function(req, res){
    RESTapi.sendObjNames(jsonDBs[objType], res);
  });
  // GET single object
  app.get('/'+objType+'/:id', function(req, res){
    RESTapi.sendObj(jsonDBs[objType], req.params.id, res);
  });
  // create single object (POST)
  app.post('/'+objType, function(req, res){
    RESTapi.storeObj(jsonDBs[objType], req.body, res);
  });
  // update single object (PUT)
  app.put('/'+objType+'/:id', function(req, res){
    RESTapi.updateObj(jsonDBs[objType], req.params.id, req.body, res);
  });
  // DELETE single object
  app.delete('/'+objType+'/:id', function(req, res){
    RESTapi.deleteObj(jsonDBs[objType], req.params.id, res);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
