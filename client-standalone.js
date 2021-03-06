var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: 'src-standalone',            // required, the root of the server file tree
  port: 8080,               // required, the port to listen
});
 
server.start(function () {
  console.log('Server listening to', server.port);
});
 
server.on('request', function (req, res) {
  // req.path is the URL resource (file name) from server.rootPath
  // req.elapsedTime returns a string of the request's elapsed time
  console.log(req.path);
});
 

server.on('response', function (req, res, err, file, stat) {
  // res.status is the response status sent to the client
  // res.headers are the headers sent
  // err is any error message thrown
  // file the file being served (may be null)
  // stat the stat of the file being served (is null if file is null)
 
  // NOTE: the response has already been sent at this point
});
