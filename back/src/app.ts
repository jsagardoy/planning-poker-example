import { createApp } from './express.server';
import { envConstants } from './env.constants';
import { api } from './api';
import cors from 'cors';

const app = createApp();

let http = require('http').Server(app);
// set up socket.io and bind it to our
// http server.
let io = require('socket.io')(http);

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  // IMPORTANT LIMIT HERE YOUR CLIENT APPS DOMAINS
  origin: '*',
  preflightContinue: false,
};

app.use(cors(options));
app.use('/api', api);

app.listen(envConstants.PORT, () => {
  console.log(`Server ready at http://localhost:${envConstants.PORT}/api`);
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', function (socket: any) {
  const { user, room } = socket.handshake.query;
  console.log(`user ${user} connected`);
  console.log(`room request: ${room}`);
  console.log('*** Session ID:', socket.conn.id);

  // TODO: if room does not previously exists do not allow creation
  // Extract as well this logic
  const isMaster = socket.handshake.query.isMaster;
  // Create room
  socket.join(room);

  if (isMaster === 'true') {
    // Send test message to that room
    socket.emit('message', 'Message broadcasted');
    io.in(room).emit('message', `Room ${room} created successfully`);

    // TODO: room master refactor this later on
    // plus add token for the master role
    const masterChannel = `${room}.master`;
    socket.join(masterChannel);
    // Whenver a given non master user connects to the room we will
    // emmit a message to the master using the room.master
    console.log('*** Session ID from master:', socket.conn.id);
  } else {
    // Player
    socket.emit('message', `io ${user}  joined`);
    console.log('*** Session ID from client:', socket.conn.id);
  }

  // whenever we receive a 'message' we log it out
  socket.on('message', function (message: any) {
    console.log(message);
  });
});

const server = http.listen(3000, function () {
  console.log('listening on *:3000');
});
