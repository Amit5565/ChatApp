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

  var formattedtime=moment(message.createAt).format("h:mm a");
  console.log("New Message",message);
  var li=$("<li></li>");
  li.text(`${message.from} ${formattedtime}: ${message.text}`);
  $("#messages").append(li);
})
// socket.emit("createMsg",{
//   from:"spamemails.5565@gmail.com",
//   text:"Whatsupp how are u"
// })

var messagetxtbox=$('input[name=message]');
//jquery
$("#message-form").on("submit",function(e){

  e.preventDefault();
  socket.emit("createMsg",{
    from:"User",
    text:messagetxtbox.val()

  },function(){

    messagetxtbox.val("");
  })
})

socket.on("newLocationMsg",function(message){

   var formattedtime=moment(message.createAt).format("h:mm a");
  var li=$("<li></li>");
  var a=$('<a target="_blank">My current location</a>');
  li.text(`${message.from}: ${formattedtime}:`);
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

  locationbutton.attr("disabled","disabled").text("Sending Location...");
  navigator.geolocation.getCurrentPosition(function(position){

    socket.emit("createLocationMessage",{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
    locationbutton.removeAttr("disabled").text("Send Location");
  },function(){
    locationbutton.removeAttr("disabled").text("Send Location");
    alert("Unable to fetch location");
  })

})
