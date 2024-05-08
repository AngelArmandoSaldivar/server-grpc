const PROTO_PATH = './proto/user.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const CustomerService  = grpc.loadPackageDefinition(packageDefinition).CustomerService;

const client = new CustomerService (
    'https://35.196.182.196:30043',
    grpc.credentials.createInsecure()
)

module.exports = client;
