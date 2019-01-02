var express=require('express');
var http=require('http');
var app=express();
var path=require('path');
var socketIO=require('socket.io');
const publicPath=path.join(__dirname,"../public");
var port=process.env.PORT||7000;
var {generatemsg}=require('./utils/message');
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));

io.on("connection",(socket)=>{
  console.log("New User Connected");

  socket.on("disconnect",()=>{
    console.log("User was disconnected");
  })

  socket.emit("newMsg",generatemsg("Admin","Welcome to the chat app"))
  socket.broadcast.emit("newMsg",generatemsg("Admin","New User Joined"))

  // socket.emit("newMsg",{
  //   from:"amitkumarsingh2750@gmail.com",
  //   text:"Gd morning my friend",
  //   createAt:930
  // })

  socket.on("createEmail",(newEmail)=>{
    console.log("createEmail",newEmail);
  })

  socket.on("createMsg",(message,callback)=>{
    console.log("created Message",message);

    io.emit("newMsg",generatemsg(message.from,message.text));
   callback();
    // socket.broadcast.emit("newMsg",{
    //   from:message.from,
    //   text:message.text,
    //   createAt:new Date().getTime()
    // })
  })
})

server.listen(port,()=>{
  console.log("App is Starting");
})
