import http from "http";
import {Server} from "socket.io";

import app from './app.js';
import setupSocket from "./socket/socket.js";

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});

setupSocket(io);
const PORT=3001;

server.listen(PORT,()=>{
    console.log(`sever is running on port ${PORT}`);
});