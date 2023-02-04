const express = require('express');
const http = require('http');


const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 4001;

httpServer.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}`)
})

app.use(express.static(__dirname+ '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

//Socket

const io = require('socket.io');

const socketServer = io(httpServer);

socketServer.on('connection',(socket)=>{
    console.log('connected')
    socket.on('message',(msg)=>{
        console.log(msg)
        socket.broadcast.emit('message',msg)
    })
})

