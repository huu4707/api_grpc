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

/**
 * Implements the SayHello RPC method.
 */
const data = [
    { id: '1', name: 'Note 1'},
    { id: '2', name: 'Note 2'}
]

function list(call, callback) {
  callback(null, { users: data } );
}

function checkUserExist(call, callback) {
  let id = call.request.id;
  let check = data.map(x=> x.id).includes(id);
  if(check) {
    callback(null,{status: true, message: "User exist"})
  } else{
    callback(null, {status: false, message: "User not exist"})
  }
}


/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(user.UserService.service, {list: list, checkUserExist: checkUserExist });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  console.log('Server running at http://0.0.0.0:50051')
  server.start();
}

main();
