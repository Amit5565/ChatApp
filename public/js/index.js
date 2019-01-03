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

socket.on("newLocationMsg",function(message){

  var li=$("<li></li>");
  var a=$('<a target="_blank">My currrent location</a>');
  li.text(`${message.from}:`);
  a.attr("href",message.url);
  li.append(a);
    $("#messages").append(li);
})

//geocode
var locationbutton=$("#send-location");
locationbutton.on("click",function(){

  if(!navigator.geolocation){
    return alert("Geolocation Not supported by your browser")
  }
  navigator.geolocation.getCurrentPosition(function(position){

    socket.emit("createLocationMessage",{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
  },function(){
    alert("Unable to fetch location");
  })

})
