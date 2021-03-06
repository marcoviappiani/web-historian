var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require("http-request");

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, "utf-8", function(error, data) {
    if (error) { throw error; }
    var fileContents = data.toString().split("\n");
    cb(fileContents);
  });

};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(urls) {
    var result = _.contains(urls, url);
    cb(result);
  });
};

exports.addUrlToList = function(url, cb){
  fs.appendFile(exports.paths.list, url + "\n", "utf-8", function(err) {
    if (err) { throw error; }
    cb();
  });
};

exports.isUrlArchived = function(url, cb){
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (err) {throw error;}
    var result = _.contains(files, url);
    cb(result);
  });
};

exports.downloadUrls = function(urls){
  for (var i=0; i < urls.length; i++) {
    var url = urls[i];
    http.get({url: url}, function(err, res) {
      fs.writeFile(exports.paths.archivedSites + "/" + url, res.buffer.toString(), function(err) {
        if (err) { throw err; }
      });
    });
  }
};
