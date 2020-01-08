var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

function checkUserExsit(userId, cb) {
    var PROTO_PATH_USER = '../protos/user.proto';
    var packageDefinition = protoLoader.loadSync(
        PROTO_PATH_USER,
        {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
        });
 var user = grpc.loadPackageDefinition(packageDefinition).user;
  var client = new user.UserService('localhost:50051', grpc.credentials.createInsecure());
  client.checkUserExist({id:userId}, function(error, response) {
    cb(error, response)
  });
}

module.exports = {
    checkUserExsit
}