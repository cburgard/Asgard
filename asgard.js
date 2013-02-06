
var Asgard = Asgard || {};

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

// body parts:
//	'head', 'torso', 'extremity'
Asgard.bodyPartArmor = {
   type         : "bodyPartArmor"
 , bodyPartType : null
 , protection   : null
 , handicap     : null
};

Asgard.combatskill = {
    type        : "combatskill"
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
      );
    } else {
      // send empty list
      res.send( JSON.stringify([]) );
    }
  });
};


exports = Asgard;

