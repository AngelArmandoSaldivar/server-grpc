// const PROTO_PATH = './proto/user.proto';
// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');
// const { v4, uuidv4} = require('uuid');

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     arrays: true
// });

// const userProto = grpc.loadPackageDefinition(packageDefinition);
// const server = new grpc.Server();

// const customers = [
//     {
//         "name": "Angel Saldivar"
//     }
// ];

// server.addService(userProto.CustomerService.service, {
//     getAll: (_, callback) => {
//         callback(null, { customers });
//     },

//     get: (call, callback) => {
//         let customer = customers.find(n => n.id == call.request.id);

//         if (customer) {
//             callback(null, customer);
//         } else {
//             callback({
//                 code: grpc.status.NOT_FOUND,
//                 details: "Not found"
//             });
//         }
//     },

//     insert: (call, callback) => {
//         let customer = call.request;
        
//         customer.id = uuidv4();
//         customers.push(customer);
//         callback(null, customer);
//     },

//     update: (call, callback) => {
//         let existingCustomer = customers.find(n => n.id == call.request.id);

//         if (existingCustomer) {
//             existingCustomer.name = call.request.name;
//             existingCustomer.age = call.request.age;
//             existingCustomer.address = call.request.address;
//             callback(null, existingCustomer);
//         } else {
//             callback({
//                 code: grpc.status.NOT_FOUND,
//                 details: "Not found"
//             });
//         }
//     },

//     remove: (call, callback) => {
//         let existingCustomerIndex = customers.findIndex(
//             n => n.id == call.request.id
//         );

//         if (existingCustomerIndex != -1) {
//             customers.splice(existingCustomerIndex, 1);
//             callback(null, {});
//         } else {
//             callback({
//                 code: grpc.status.NOT_FOUND,
//                 details: "Not found"
//             });
//         }
//     }
// });


// server.bindAsync('localhost:30043', grpc.ServerCredentials.createInsecure(), (err) => {
//     if(err) {
//         console.log("ERROR: " + err);
//     } else {
//         //server.start();
//         console.log("Listen on port localhost:30043");
//     }
// });

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './example.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const exampleProto = grpc.loadPackageDefinition(packageDefinition).hello;

function SayHello(call, callback) {   
    console.log('Received message:', call.request.name);
    callback(null, { message: 'Message received successfully: ' + call.request.name });
}

function main() {
  const server = new grpc.Server();
  server.addService(exampleProto.HelloGrpc.service, { SayHello: SayHello });
  server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server running at http://0.0.0.0:50051');
    server.start();
  });
}

main();