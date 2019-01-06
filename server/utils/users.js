// [{
//   id:'',
//   name:'',
//   room:''
// }]
 
//New way of creating class
// class Person{

//   constructor(name,age){
//      this.name=name;
//      this.age=age;
     
//   }
//   //Methods
//   getUserDescription(){
//     return `${this.name} is ${this.age} years old`
//   }
// }


// var me=new Person("Amit",25);
 
// console.log(me.getUserDescription());

class Users{

  constructor(){
    this.users=[];
  }
  addUser(id,name,room){
    var user={id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    var user=this.getUser(id);
    if(user){
      this.users=this.users.filter((user)=>user.id!==id)
    }
    return user
    //return user that was removed
  }
  getUser(id){
     return this.users.filter((user)=>user.id===id)[0]//should have only 1 user and would return undefined if there is no user
  }

  getUserList(room){
      var users=this.users.filter((user)=>{
        return user.room===room
      })
      var namesArray=users.map((user)=>{
        return user.name
      })
      return namesArray;
  }
}


module.exports={Users}
