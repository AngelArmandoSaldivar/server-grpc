const PROTO_PATH = './proto/user.proto';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const CustomerService  = grpc.loadPackageDefinition(packageDefinition).CustomerService;

const client = new CustomerService (
    'test-grpc-10f7aeb8bec5.herokuapp.com:30043',
    grpc.credentials.createInsecure()
)

export default client
