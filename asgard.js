
var Asgard = Asgard || {};

// body parts:
//	'head', 'torso', 'extremity'
Asgard.bodyPartArmor = {
   type         : "bodyPartArmor"
 , bodyPartType : null
 , protection   : null
 , handicap     : null
};

Asgard.armor = {
   type           : "armor"
 , name           : null
 , bodyPartArmors : []
 , handicap : {
        speed         : null
      , agility       : null
      , attackBonus   : null
      , defenseBonsus : null
   }
};

Asgard.combatSkill = {
    type        : "combatSkill"
  , name        : null
  , ew          : null
  , defEw       : null
  , defEwOffset : null
  , pp          : 0
  , ewUnskilled : null
  , requirements: {}
  , attackModes : []
  , comment     : null
};

Asgard.attackMode = {
    type                : "attackMode"
  , name                : null
  , damage              : null
  , energyCosts         : 0
  , damageMultiplicator : 1
  , requirements        : {}
};

Asgard.creature = {
   type      : "creature"
 , name      : null
 , bodyParts : []
 // TODO: finish
};

Asgard.bodyPart = {
   type         : "bodyPart"
 , name         : null
 , diceRange    : null
   // body part types:
   //	'head', 'torso', 'extremity'
 , bodyPartType : null
};


Asgard.spell = {
    type        : "spell"
  , name        : null
  , costs       : null
  , process     : null
  , agens       : null
  , reagens     : null
  , origin      : null
  , kind        : null
  , rank        : null
  , castingtime : null
  , range       : null
  , duration    : null
  , scope       : null
  , target      : null
  , material    : null
  , rune        : false
  , seal        : false
  , wonder      : false
  , dweomer     : false
  , description : null
};

Asgard.enchantingDance = {
    type        : "enchantingDance"
  , name        : null
  , costs       : null
  , process     : null
  , agens       : null
  , reagens     : null
  , origin      : null
  , kind        : null
  , rank        : null
  , castingtime : null
  , range       : null
  , duration    : null
  , scope       : null
  , target      : null
  , description : null
};

Asgard.bardSong = {
    type        : "bardSong"
  , name        : null
  , costs       : 4
  , process     : null
  , agens       : null
  , reagens     : null
  , origin      : 'bardisch'
  , kind        : 'Geste'
  , rank        : 0
  , castingtime : '-'
  , range       : '-'
  , duration    : '-'
  , scope       : '-'
  , target      : null
  , instrument  : null
  , description : null
};

Asgard.magicSalt = {
    type        : "magicSalt"
  , name        : null
  , costs       : 2
  , process     : null
  , agens       : null
  , reagens     : null
  , origin      : 'dämonisch'
  , kind        : 'Gedanke'
  , rank        : 1
  , castingtime : '1 sec'
  , range       : '500 m'
  , duration    : '-'
  , scope       : '1 Wesen'
  , target      : 'Körper'
  , material    : 'Zaubersalz (10 KS)'
  , description : null
};

Asgard.money = {
    type : "money"
  , value : null
};

Asgard.skill = {
    type         : "skill"
  , name         : null
  , ew           : -1
  , pp           : 0
  , ewUnskilled  : -1
  , requirements : {}
};


//// object IO for REST-API

// send list with object-names a JSON-string
Asgard.sendObjNames = function(objDB, res){
  res.contentType('application/json');
  tools.loadJSON(objDB, function(objs){
    if (objs){
      // send list of names
      res.send( JSON.stringify(
        objs.map(function(o){return o.name;})
      ));
    } else {
      // send empty list
      res.send( JSON.stringify([]) );
    }
  });
};

Asgard.sendObj = function(objDB, id, res){
  res.contentType('application/json');
  tools.loadJSON(objDB, function(objs){
    if (objs[id]){
      res.send( JSON.stringify(objs[id]) );
    } else {
      res.send( JSON.stringify({}) );
    }
  });
};

Asgard.storeObj = function(objDB, obj, res){
  res.contentType('application/json');
  tools.loadJSON(objDB, function(objs){
    // add new obj
    var id = objs.push(obj);
    // save back
    tools.saveJSON(objs, objDB);
    res.send( JSON.stringify(id) );
  });
};

Asgard.updateObj = function(objDB, id, obj, res){
  res.contentType('application/json');
  tools.loadJSON(objDB, function(objs){
    if (objs[id]){
      objs[id] = obj;
      tools.saveJSON(objs, objDB);
      res.send( JSON.stringify(id) );
    } else {
      res.send( JSON.stringify(null) );
    }
  });
};

Asgard.updateObj = function(objDB, id, res){
  res.contentType('application/json');
  tools.loadJSON(objDB, function(objs){
    if (objs[id]){
      // important: set null, do not delete!
      //            otherwise object ids would
      //            get shuffled.
      objs[id] = null;
      res.send( JSON.stringify(id) );
    } else {
      res.send( JSON.stringify(null) );
    }
  });
};

exports = Asgard;

