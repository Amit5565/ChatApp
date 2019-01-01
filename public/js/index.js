var socket=io();//connection created
socket.on("connect",function(){
  console.log("Connection Established");
})
socket.on("disconnect",function(){
  console.log("Disconnected from the server");
})

socket.on("newEmail",function(email){
  console.log("New Email",email);
})


socket.on("newMsg",function(message){
  console.log("New Message",message);
})
// socket.emit("createMsg",{
//   from:"spamemails.5565@gmail.com",
//   text:"Whatsupp how are u"
// })
