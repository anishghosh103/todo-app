const socket = require('socket.io');

const eventEmitter = require('./event-emitter');

module.exports = (server) => {
  const io = socket(server);
  let connectionCount = 0;
  io.on('connection', (socket) => {
    console.log('SocketIO.Connection', `${++connectionCount} connections`);
    let connected = false;

    socket.on('set-user', (userId) => {
      socket.userId = userId;
      connected = true;
    });

    eventEmitter.on('notification', (notification) => {
      socket.emit('notification', notification);
    });

    eventEmitter.on('list-update', data => {
      socket.emit('list-update', data);
    });

    eventEmitter.on('private-list-update', data => {
      if (socket.userId && socket.userId === data.listCreatorId) {
        socket.emit('list-update', data);
      }
    });

    eventEmitter.on('logout', data => {
      socket.emit('logout', data);
    });

    socket.on('disconnect', () => {
      console.log('SocketIO.Disconnection', `${--connectionCount} connections.`);
    });
  });
};