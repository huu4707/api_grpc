var PROTO_PATH = '../protos/order.proto';
const uuidv1 = require('uuid/v1');
let { checkUserExsit } = require('../services/user')
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
var order = grpc.loadPackageDefinition(packageDefinition).order;

listOrders = [];

function insertOrder(call, callback) {
    let { userId , amount, qty } = call.request;
    let id = uuidv1();
    let data = { id, userId, amount, qty }
    checkUserExsit(userId, (error, response) => {
        if(error) {
            callback(null,  { status: false, message: error});
        } else{
            if(response.status) {
                listOrders.push(data);
                callback(null,  { status: true, message: "success"} );
            } else{
                callback(null,  { status: false, message: response.message} );
            }
        }
    })
}

function listOrder(call, callback) {
    callback(null, {order: listOrders})
}

function main() {
  var server = new grpc.Server();
  server.addService(order.OrderService.service, {insertOrder: insertOrder, listOrder: listOrder });
  server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
  console.log('Server running at http://0.0.0.0:50052')
  server.start();
}

main();



