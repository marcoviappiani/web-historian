var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var urlParser = require("url");
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var parts = urlParser.parse(req.url);
    
  if (req.method === "GET") {   
    
    if (parts.pathname === '/') {
      httpHelpers.serveAssets(res, "/public/index.html")
    
    } else {
      var url = parts.pathname.slice(1);
      archive.isUrlArchived(url, function(actuallyArchived) {
  
        if (actuallyArchived) {
          httpHelpers.serveAssets(res, "../archives/sites/" + url);
    
        } else {
          res.writeHead(404);
          res.write("Not Found! HERE!");
          res.end();
        }
      });
    }
  }

  if (req.method === "POST") {
    var data = '';
    req.on('data',  function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      archive.addUrlToList(JSON.parse(data).url, function() {
        res.writeHead(302, headers);
        res.end();
      });
    });
  }
  // THIS IS PROBABLY IMPORTANT DON'T FORGET ABOUT IT
  //res.end(archive.paths.list);

};

