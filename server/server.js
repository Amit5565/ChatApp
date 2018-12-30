var express=require('express');
var http=require('http');
var app=express();
var path=require('path');
var socketIO=require('socket.io');
const publicPath=path.join(__dirname,"../public");
var port=process.env.PORT||5000;

var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));

io.on("connection",(socket)=>{
  console.log("New User Connected");

  socket.on("disconnect",()=>{
    console.log("User was disconnected");
  })
})

server.listen(port,()=>{
  console.log("App is Starting");
})
