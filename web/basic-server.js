var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var urlParser = require("url");

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
// creating archive dir and archive site.txt file if they don't exist
// we aren't tracking those files since they are in .gitignore

initialize();

var routes = {
  '/' : handler.handleRequest
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req, res) {

  var parts = urlParser.parse(req.url);
  var route = routes[parts.pathname];

  if (route) {
    route(req, res)
  } else {
    res.writeHead(404);
    res.write("Not Found! HERE!");
    res.end();
  }
});

// the module that requires this module
if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

