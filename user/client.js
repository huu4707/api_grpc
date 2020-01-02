var PROTO_PATH = '../protos/user.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var user = grpc.loadPackageDefinition(packageDefinition).user;

function main() {
  var client = new user.UserService('localhost:50051', grpc.credentials.createInsecure());
  client.list({}, function(err, response) {
    console.log('response', response)
  });
}

main();