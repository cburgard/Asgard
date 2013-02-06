
var clone = function(obj){
  if ( obj === null ){
    return obj;
  }
  var c = {};
  for(var i in obj){
    if( typeof(obj[i]) === "object" ){
      c[i] = clone(obj[i]);
    } else {
      c[i] = obj[i];
    }
  }
  return c;
};
exports.clone = clone;

var fs = require('fs');

// save object as JSON string to given file
// (non-blocking IO)
exports.saveJSON = function(obj, filename){
  fs.writeFile(filename, JSON.stringify(obj), 'utf8', function(err){
    if (err) throw err;
  });
};

// load JSON-object from file.
// (non-blocking IO)
// callback function: function(obj) {...}
exports.loadJSON = function(jsonFile, callback){
  fs.exists(jsonFile, function(exists){
    if (exists){
      fs.readFile(jsonFile, 'utf8', function(err, data){
        if (err) throw err;
        if (data){
          callback(JSON.parse(data));
        } else {
          callback(undefined);
        }
      });
    } else {
      callback(undefined);
    }
  });
};

// take both arrays and build a hash-table ('{key: value, ...}') 
// from them.
exports.hashify = function(l1, l2){
  var i;
  var hash = {};
  for(i=0; i<l1.length; i++){
    hash[ l1[i] ] = l2[i];
  }
  return hash;
};

