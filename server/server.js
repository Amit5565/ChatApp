var express=require('express');
var http=require('http');
var app=express();
var path=require('path');
var socketIO=require('socket.io');
const publicPath=path.join(__dirname,"../public");
var port=process.env.PORT||9000;


var {generatemsg,generatelocationmsg}=require('./utils/message');
var {isRealString}=require('./utils/validation.js');
var {Users}=require("./utils/users");

var server=http.createServer(app);
var io=socketIO(server);
var users=new Users()

app.use(express.static(publicPath));

io.on("connection",(socket)=>{
  console.log("New User Connected");


  socket.on("join",(params,callback)=>{

   if(!isRealString(params.name) || !isRealString(params.room)){
      return callback("Name and room are required")
   }

   socket.join(params.room);
   users.removeUser(socket.id);
   users.addUser(socket.id,params.name,params.room)
   
   io.to(params.room).emit("updateUserList",users.getUserList(params.room))

   socket.emit("newMsg",generatemsg("Admin","Welcome to the chat app"))
   // socket.broadcast.emit("newMsg",generatemsg("Admin","New User Joined"))
   socket.broadcast.to(params.room).emit("newMsg",generatemsg("Admin",`${params.name} has joined`))
     callback();
  })
  // socket.emit("newMsg",{
  //   from:"amitkumarsingh2750@gmail.com",
  //   text:"Gd morning my friend",
  //   createAt:930
  // })



  socket.on("createMsg",(message,callback)=>{
    // console.log("created Message",message);

    var user=users.getUser(socket.id);

    if(user && isRealString(message.text)){

      io.to(user.room).emit("newMsg",generatemsg(user.name,message.text));
    }

   
   callback();
    // socket.broadcast.emit("newMsg",{
    //   from:message.from,
    //   text:message.text,
    //   createAt:new Date().getTime()
    // })
  })


  socket.on("createLocationMessage",(coords)=>{
    
    var user=users.getUser(socket.id);
     if(user){
      io.to(user.room).emit("newLocationMsg",generatelocationmsg(user.name,coords.latitude,coords.longitude))
     }
    
  })


  socket.on("disconnect",()=>{

    var user=users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit("updateUserList",users.getUserList(user.room))
      io.to(user.room).emit("newMsg",generatemsg("Admin",`${user.name} has left`));
    }
    console.log("User was disconnected");
  })
})

server.listen(port,()=>{
  console.log("App is Starting");
})
