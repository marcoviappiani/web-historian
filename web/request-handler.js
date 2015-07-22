var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

var actions = {
  "GET": httpHelpers.serveAssets,
  "POST": httpHelpers.writeUrl
};


exports.handleRequest = function (req, res, path) {
  
  var action = actions[req.method];
  
  if (action) {

    action(res, path);

  } else {
  
    res.writeHead(404);
    res.write("Not Found! http-helpers");
    res.end();
  
  }

  // THIS IS PROBABLY IMPORTANT DON'T FORGET ABOUT IT
  //res.end(archive.paths.list);
};
