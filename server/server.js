var express=require('express');
var app=express();
var path=require('path');
const publicPath=path.join(__dirname,"../public");
var port=process.env.PORT||5000;
app.use(express.static(publicPath));

app.listen(port,()=>{
  console.log("App is Starting");
})
