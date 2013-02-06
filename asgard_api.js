//// object IO for REST-API

// send list with object-names a JSON-string
exports.sendObjNames = function(objDB, res){
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

exports.sendObj = function(objDB, id, res){
  res.contentType('application/json');
  tools.loadJSON(objDB, function(objs){
    if (objs[id]){
      res.send( JSON.stringify(objs[id]) );
    } else {
      res.send( JSON.stringify({}) );
    }
  });
};

exports.storeObj = function(objDB, obj, res){
  res.contentType('application/json');
  tools.loadJSON(objDB, function(objs){
    // add new obj
    var id = objs.push(obj);
    // save back
    tools.saveJSON(objs, objDB);
    res.send( JSON.stringify(id) );
  });
};

exports.updateObj = function(objDB, id, obj, res){
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

exports.updateObj = function(objDB, id, res){
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

