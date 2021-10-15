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


io.on('connection', socket =>{
  console.log('conectado', socket.id)

  socket.on('disconnect', () => {
    console.log('desconectado!')
  })
})

server.listen(3333, () =>{
  console.log('Server started on port 3333!');
});
