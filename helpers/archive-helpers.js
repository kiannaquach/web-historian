var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

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
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) console.log(err);
    callback(data.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) console.log(err);
    if (data.toString().includes(url)) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, function(err, data) {
    if (err) throw err;
    callback(data);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    // console.log(files);
    if (err) throw err;

    if (files.includes(url)) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.downloadUrls = function(urls) {
  // console.log(urls);

  // urls.forEach((url) => {
  //   var options = {
  //     hostname: url,
  //     path: '/index',
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'text/html'
  //     }
  //   }
  
  //   http.request(options, function(res) {
  //     res.on('data', (chunk) => {
  //       console.log(chunk);
  //     })
  //   })
  // });

  urls.forEach((url) => {
  
    fs.writeFile(exports.paths.archivedSites + '/' + url, 'hello',function(err) {
      if (err) throw err;
    });
  });
  // for each urls
  //   download url
  //   create/write data to new file in that directory
  // fs.writeFile(exports.paths.archivedSites, , function)
};














