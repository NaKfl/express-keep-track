import http from 'http';
import createSocket from 'socket.io';
import { clientURI, port, env } from './configs/vars';
import logger from './configs/logger';
import app from './configs/express';
import connectDatabase from './configs/mongoose';

connectDatabase();

const server = http.createServer(app);

const io = createSocket(server, {
  cors: {
    origin: clientURI,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});
io.on('connection', function (socket) {
  console.log(`${socket.id}: connected`);

  socket.on('disconnect', function () {
    console.log(`${socket.id}: disconnected`);
  });

  socket.on('client-change-board-detail', (data) => {
    io.sockets.emit('server-send-board-detail', { id: data.id });
  });

  socket.on('client-edit-board-name', (data) => {
    io.sockets.emit('server-send-board-info', { id: data.id });
  });
});

server.listen(port, () =>
  logger.info(`server started on port ${port} (${env})`),
);

export default server;
