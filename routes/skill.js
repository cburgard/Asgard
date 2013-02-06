
var tools = require('../tools');
var skillsDB = '../data/skills.json';
var asgard = require('../asgard');

// GET list of skills (JSON)
exports.getList = function(req, res){
  asgard.sendObjNames(skillsDB, res);
};


// GET skill (JSON)
exports.get = function(req, res){

};

// create skill
exports.create = function(req, res){

};

// update skill
exports.update = function(req, res){

};

// delete skill
exports.remove = function(req, res){

};

