
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

  , Asgard = require('./asgard')

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
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



var objTypes = [ 'characters'
                ,'combatskills'
                ,'creatures'
                ,'skills'
                ,'spells' ];

// JSON-DBs: dictionary with {name: path, ...} descriptions
//           for JSON-files of Asgard objects
var jsonDBs = tools.hashify(
                 dbNames
                ,dbNames.map(
                  function(x){return "./data/"+x+".json";}
                 ) );
 
app.get('/', routes.index);

// define behavior for GET, PUT, POST & DELETE
objTypes.map(function(objType){
  // GET name list; e.g. '/character' -> character names
  app.get('/'+objType, function(req, res){
    Asgard.sendObjNames(jsonDBs[objType+'s'], res);
  });
  // GET single object
  app.get('/'+objType+'/:id', function(req, res){
    Asgard.sendObj(jsonDBs[objType+'s'], req.params.id, res);
  });
  // create single object (POST)
  app.post('/'+objType, function(req, res){
    Asgard.storeObj(jsonDBs[objType+'s'], req.body, res);
  });
  // update single object (PUT)
  app.put('/'+objType+'/:id', function(req, res){
    Asgard.updateObj(jsonDBs[objType+'s'], req.params.id, req.body, res);
  });
  // DELETE single object
  app.delete('/'+objType+'/:id', function(req, res){
    Asgard.deleteObj(jsonDBs[objType+'s'], req.params.id, res);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
