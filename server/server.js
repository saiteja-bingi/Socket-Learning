import http from "http";
import {Server} from "socket.io";

import app from './app.js';
// create a http server
// express app.listen() => this internally does same thing
// here for explicitly creating http to attach the io so that we can use socket

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    console.log("User Connected");

    socket.on("hello",(data)=>{
        console.log(`Hello event recieved : ${data.message}`);
        // socket.emit("welcome"); // only welcome to that specific client
        io.emit("welcome",data); // emit to all clients
    })
});


const PORT=3001;

server.listen(PORT,()=>{
    console.log(`sever is running on port ${PORT}`);
});