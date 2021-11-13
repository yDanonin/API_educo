import 'reflect-metadata';

import express from 'express';
import routes from './routes'
import cors from 'cors';
import http from 'http'

import { Server }from 'socket.io';

import './database'

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

app.use(cors())
app.use(express.json())
app.use(routes)

let clients = 0
io.on('connection', socket =>{
  clients++

  socket.broadcast.emit('broadcast', { description: clients + ' clients' })

  socket.on('joinGroup', group =>{
    socket.join(group)
    socket.on('sendPost', post =>{
      socket.broadcast.emit(post)
    })
  })

  socket.on('disconnect', () => {
    clients--
    socket.broadcast.emit('broadcast', { description: clients + ' clients' })
  })
})

declare global{
  var baseUrl: string
}

global.baseUrl = 'http://localhost:3333'
server.listen(3333, () =>{
  console.log('Server started on port 3333!');
});
