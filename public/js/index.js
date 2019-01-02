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
  var li=$("<li></li>");
  li.text(`${message.from}:${message.text}`);
  $("#messages").append(li);
})
// socket.emit("createMsg",{
//   from:"spamemails.5565@gmail.com",
//   text:"Whatsupp how are u"
// })


//jquery
$("#message-form").on("submit",function(e){

  e.preventDefault();
  socket.emit("createMsg",{
    from:"User",
    text:$('input[name=message]').val()

  },function(){

  })
})
