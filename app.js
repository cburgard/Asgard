
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


// JSON-DBs: dictionary with {name: path, ...} descriptions
//           for JSON-files of Asgard objects
var jsonDBs = (function(path){
  var dbNames = [  'characters'
                  ,'combatskills'
                  ,'creatures'
                  ,'skills'
                  ,'spells' ];
  return tools.hashify(
           dbNames
          ,dbNames.map(function(x){return path+x+".json";})
  );
})("./data");


app.get('/', routes.index);

// character management
app.get('/character', function(req, res){
  Asgard.sendObjNames(jsonDBs['characters'], res);
});
app.get   ('/character/:id' , character.get    );
app.post  ('/character'     , character.create );
app.put   ('/character/:id' , character.update );
app.delete('/character/:id' , character.remove );

// magic management
app.get   ('/magic'     , magic.getList);
app.get   ('/magic/:id' , magic.get    );
app.post  ('/magic'     , magic.create );
app.put   ('/magic/:id' , magic.update );
app.delete('/magic/:id' , magic.remove );

// skill management
app.get   ('/skill'     , skill.getList);
app.get   ('/skill/:id' , skill.get    );
app.post  ('/skill'     , skill.create );
app.put   ('/skill/:id' , skill.update );
app.delete('/skill/:id' , skill.remove );

// combat skill management
app.get   ('/combatskill'     , combatskill.getList);
app.get   ('/combatskill/:id' , combatskill.get    );
app.post  ('/combatskill'     , combatskill.create );
app.put   ('/combatskill/:id' , combatskill.update );
app.delete('/combatskill/:id' , combatskill.remove );

// armor management
app.get   ('/armor'     , armor.getList);
app.get   ('/armor/:id' , armor.get    );
app.post  ('/armor'     , armor.create );
app.put   ('/armor/:id' , armor.update );
app.delete('/armor/:id' , armor.remove );

// creatures
app.get   ('/creature'     , creature.getList);
app.get   ('/creature/:id' , creature.get    );
app.post  ('/creature'     , creature.create );
app.put   ('/creature/:id' , creature.update );
app.delete('/creature/:id' , creature.remove );




http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
