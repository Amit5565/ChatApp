var moment=require('moment');

var generatemsg=(from,text)=>{
  return{
    from,
    text,
    createAt:moment().valueOf()
  }
}


var generatelocationmsg=(from,latitude,longitude)=>{
  return{
    from,
     url:`https://www.google.com/maps?q=${latitude},${longitude}`,
     createAt:moment().valueOf()
  }
}
module.exports={generatemsg,generatelocationmsg};
