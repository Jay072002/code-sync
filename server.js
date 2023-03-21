const express = require('express');
const {Server} = require("socket.io")
const http = require("http");
const ACTIONS = require('./src/Actions');

const app = express()
const server = http.createServer(app)


const io = new Server(server)

// use database to store the client that is connected to the room
const userSocketMap = {}

const getAllConnectedClients = (roomId) => {
    // it will return all the connected clients in the room but it return Map so first we have to convert it into array
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            userName: userSocketMap[socketId]
        }
    })
}


io.on("connection", (socket) => {
    // after connection we can now able to listen the events created by client or create a event that can listen the client 
    
    // console.log("socket connected ", socket.id)
    // console.log(socket.rooms);

    socket.on(ACTIONS.JOIN, (clientData) => {

        // we can create or emit an event after client has joined successfully and can listen this event on client side
        // socket.emit(ACTIONS.JOINED)

        userSocketMap[socket.id] = clientData.userName
        // it adds the socket (unique socket for each client) to the roomId if already exists otherwise it will create new room
        socket.join(clientData.roomId);

        // after joining the room if the first client is joined then no problem but if already clients are joind and then new client joins then we have to notify the other clients that new client has joined
        const clients = getAllConnectedClients(clientData.roomId);
        clients.forEach(({socketId}) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                userName:clientData.userName, //newClient username
                socketId: socket.id //newClient socketID
            })
        })

    })

    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];
        rooms.forEach(roomId => {
            io.in(roomId).emit(ACTIONS.LEAVE, {
                userName: userSocketMap[socket.id],
                socketId: socket.id
            })
        })
        delete userSocketMap[socket.id];
        console.log(userSocketMap)
    })

    
})


const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})

