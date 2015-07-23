var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var urlParser = require("url");
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var headers = httpHelpers.headers;
  var parts = urlParser.parse(req.url);
  var url = parts.pathname.slice(1);

  if (req.method === "GET") {   
    
    if (parts.pathname === '/') {
      httpHelpers.serveAssets(res, "/public/index.html")
    
    } else {
      
      archive.isUrlArchived(url, function(actuallyArchived) {
  
        if (actuallyArchived) {
          httpHelpers.serveAssets(res, archive.paths.archivedSites + "/" + url);
    
        } else {
          res.writeHead(404);
          res.write("Not Found! HERE!");
          res.end();
        }
      });
    }
  }

  else if (req.method === "POST") {

    var data = '';
    req.on('data',  function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      
      var externalUrl = JSON.parse(data).url;
      
      archive.isUrlInList(externalUrl, function(inList) {

        if (inList) {
          
          archive.isUrlArchived(externalUrl, function(isArchived) {  
            if (isArchive) {
              httpHelpers.serveAssets(res, archive.paths.archivedSites + "/" + externalUrl);
            } else {
              headers["Location"] = "http://127.0.0.1:8080/public/loading.html";
              res.writeHead(302, headers);
              res.end();
            }
          });

        } else {

          archive.addUrlToList(externalUrl, function() {
            // headers["Location"] = "http://127.0.0.1:8080/public/loading.html";
            res.writeHead(302, headers);
            res.end();
          });

        }
      });
    });
  }
  // THIS IS PROBABLY IMPORTANT DON'T FORGET ABOUT IT
  //res.end(archive.paths.list);

};

