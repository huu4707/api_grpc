var PROTO_PATH = '../protos/order.proto';
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.get('/order', function (req, res) {
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
    var client = new order.OrderService('localhost:50052', grpc.credentials.createInsecure());
    client.listOrder({ }, function(error, response) {
      res.send(response)
    });
})

app.post('/order/create', function (req, res) {
    let { userId, amount, qty } = req.body
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
    var client = new order.OrderService('localhost:50052', grpc.credentials.createInsecure());
    client.insertOrder({userId, amount, qty }, function(error, response) {
      res.send(response)
    });
})
 
app.listen(3000)

