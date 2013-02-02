
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

