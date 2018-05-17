var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var statusCode = 200;
    if (req.url === '/') {
        fs.readFile('/Users/student/Desktop/hrsf96-web-historian/web/public/index.html', function(err, data) {
          if (err) {
            console.log('this is the err ', err);
          }

          defaultCorsHeaders['content-type'] = 'text/html';
          res.writeHead(statusCode, defaultCorsHeaders);
          res.write(data);
          res.end();
        });
    } else if (req.url === '/styles.css') {
       fs.readFile('/Users/student/Desktop/hrsf96-web-historian/web/public/styles.css', function(err, data) {
          if (err) {
            console.log('this is the err ', err);
          }

          defaultCorsHeaders['content-type'] = 'text/css';
          res.writeHead(statusCode, defaultCorsHeaders);
          res.write(data);
          res.end();
      });
    } else {  
      res.writeHead(404, defaultCorsHeaders);
      res.end();
    }
  } else if (req.method === 'POST') {
    var statusCode = 302;
    var url;
    // var data = [];
    req.on('data', (chunck) => {
      url = chunck.toString().slice(4) +'\n';
    });


    req.on('end', () => {
      // console.log(url);
      archive.addUrlToList(url, () => {
        defaultCorsHeaders['content-type'] = 'text/plain'
        res.writeHead(statusCode, defaultCorsHeaders);
        res.end('post end');
      });
    });
  }
};


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10
}
